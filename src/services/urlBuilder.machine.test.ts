import {
  DEFAULT_HOST,
  urlBuilderMachine,
  type ActionKey,
  type Context,
  type GuardKey,
  type QueryFilter,
} from './urlBuilder.machine';
import { useServiceTest } from './utils/machine/test/service';

beforeAll(() => {
  vi.useFakeTimers();
});

afterAll(() => {
  vi.useRealTimers();
});

const { useAssign, useGuard, start, sender, context, rebuild } =
  useServiceTest(urlBuilderMachine);
type KeyC = keyof Context;

const TEST_HOST = 'https://google.com';
describe('Acceptance', () => {
  describe('Actions', () => {
    // #region Preparation

    const useUrlAssignTest = <K extends KeyC>(
      name: ActionKey,
      key: K,
      value: Context[K]
    ) => {
      const [acceptance, expect] = useAssign(name);
      test('Acceptance', () => {
        acceptance();
      });

      test.fails('Will throw if no URL', () => {
        expect({ context: {}, expected: {} });
      });

      test('Will send empty request if arg is undefined', () => {
        expect({
          context: { url: new URL(TEST_HOST) },
          expected: {
            url: new URL(`${TEST_HOST}?${key}=undefined`),
          },
        });
      });

      test('Will add request to url', () => {
        expect({
          context: {
            url: new URL(TEST_HOST),
            [key]: value,
          },
          expected: {
            url: new URL(`${TEST_HOST}?${key}=${value}`),
            [key]: value,
          },
        });
      });
    };
    // #endregion

    describe('addAiringStatus', () => {
      useUrlAssignTest('addAiringStatus', 'airingStatus', 'FINISHED');
    });

    describe('addCountry', () => {
      useUrlAssignTest('addCountry', 'country', 'CN');
    });

    describe('addCountry', () => {
      useUrlAssignTest('addFormat', 'format', 'MANGA');
    });

    describe('addText', () => {
      useUrlAssignTest('addText', 'text', 'Naruto');
    });

    describe('addYear', () => {
      useUrlAssignTest('addYear', 'year', '2019');
    });

    describe('addParams', () => {
      const [acceptance, expect] = useAssign('addParams');

      test('acceptance', () => {
        acceptance();
      });

      test('test 1', () => {
        const query: QueryFilter = { country: 'JP', format: 'MUSIC' };
        expect({
          event: { type: 'QUERY', ...query },
          expected: query,
        });
      });

      test('test 2', () => {
        const query: QueryFilter = {
          country: 'CN',
          format: 'MUSIC',
          genres: ['Adventure', 'Comedy'],
        };
        expect({
          event: { type: 'QUERY', ...query },
          expected: query,
        });
      });
    });

    describe('createURL', () => {
      const [acceptance, expect] = useAssign('createURL');

      test('acceptance', () => {
        acceptance();
      });

      test('test 1', () => {
        expect({
          context: {
            host: TEST_HOST,
          },
          expected: { url: new URL(TEST_HOST), host: TEST_HOST },
        });
      });

      test('test 2', () => {
        expect({
          context: {},
          expected: { url: new URL(DEFAULT_HOST), host: DEFAULT_HOST },
        });
      });
    });
  });

  describe('Guards', () => {
    // #region Preparation
    const useGuardQueryTest = <K extends KeyC>(
      name: GuardKey,
      key: K,
      value?: Context[K]
    ) => {
      const [acceptance, expect] = useGuard(name);

      test('Acceptance', () => {
        acceptance();
      });

      test('Return false if not defined', () => {
        expect({
          context: {},
          expected: false,
        });
      });
      test('Return true if  defined', () => {
        expect({
          context: {
            [key]: value,
          },
          expected: true,
        });
      });
    };
    // #endregion

    describe('hasAiringStatus', () => {
      useGuardQueryTest('hasAiringStatus', 'airingStatus', 'CANCELLED');
    });

    describe('hasCountry', () => {
      useGuardQueryTest('hasCountry', 'country', 'KR');
    });

    describe('hasFormat', () => {
      useGuardQueryTest('hasFormat', 'format', 'ONA');
    });

    describe('hasText', () => {
      useGuardQueryTest('hasText', 'text', 'One Piece');
    });

    describe('hasYear', () => {
      useGuardQueryTest('hasYear', 'year', '2005');
    });
  });
});

describe('Workflow', () => {
  const send = sender('QUERY');

  describe('First => without host', () => {
    test('Start the machine', start);

    test('URL is not defined', () => {
      context(false, (context) => !!context.url);
    });

    test('Host is not defined', () => {
      context(false, (context) => !!context.host);
    });

    test('Sends Input 1', () => {
      const query: QueryFilter = {
        country: 'JP',
        year: '2017',
        text: 'One',
      };
      send(query);
    });

    test('Host is  defined', () => {
      context(true, (context) => !!context.host);
    });

    test('Host is strongly built', () => {
      context(DEFAULT_HOST, (context) => context.host);
    });

    test('URL is defined', () => {
      context(true, (context) => !!context.url);
    });

    test('URL is strongly built', () => {
      const expected = new URL(
        `${DEFAULT_HOST}?text=One&year=2017&country=JP`
      );
      context(expected, (context) => context.url);
    });
  });

  describe('First => with host', () => {
    const query: QueryFilter = {
      airingStatus: 'RELEASING',
      country: 'JP',
      year: '2010',
      genres: ['Comedy', 'Romance'],
    };

    test('Add Host', () => {
      rebuild({ host: TEST_HOST });
    });

    test('Start the machine', start);

    test('URL is not defined', () => {
      context(false, (context) => !!context.url);
    });

    test('Host is defined', () => {
      context(true, (context) => !!context.host);
    });

    test('Sends Input 1', () => {
      send(query);
    });

    test('Host is defined', () => {
      context(true, (context) => !!context.host);
    });

    test('Host is strongly built', () => {
      context(TEST_HOST, (context) => context.host);
    });

    test('URL is defined', () => {
      context(true, (context) => !!context.url);
    });

    describe('URL is strongly built', () => {
      test('Genres', () => {
        context(query.genres, (context) =>
          JSON.parse(context.url?.searchParams.get('genres')!)
        );
      });

      test('airingStatus', () => {
        context(
          query.airingStatus,
          (context) => context.url?.searchParams.get('airingStatus')!
        );
      });

      test('year', () => {
        context(
          query.year,
          (context) => context.url?.searchParams.get('year')!
        );
      });

      test('country', () => {
        context(
          query.country,
          (context) => context.url?.searchParams.get('country')!
        );
      });
    });
  });
});

import cloneDeep from 'lodash.clonedeep';
import { afterAll, beforeAll, describe, expect, test, vi } from 'vitest';
import { interpret } from 'xstate';
import { advanceByTime } from '~utils/test';
import {
  DEFAULT_EVENT_DELIMITER,
  EVENTS,
  THROTTLE_TIME,
} from './constants';
import { inputsMachine } from './inputs.machine';
import type { Context, Inputs } from './inputs.types';
import { useServiceTest } from './utils/machine/test/service';

beforeAll(() => {
  vi.useFakeTimers();
});

afterAll(() => {
  vi.useRealTimers();
});

// #region Hooks
const generateDefaultContext = (context?: Partial<Context>) => {
  return { name: 'INPUTS', ...context } as Context;
};

const useTest = (name = 'INPUTS') => {
  const machine = inputsMachine.withContext({ name });

  const { rebuild, ...service } = useServiceTest(machine);

  const _send = service.sender('INPUTS');

  const send = (inputs: Inputs) => {
    _send({ inputs });
  };

  const sendParentInput = vi.fn(() => {});
  const startQuery = vi.fn(() => {});

  const _rebuild = () => {
    const options = {
      actions: { sendParentInput, startQuery },
    };
    sendParentInput.mockClear();
    startQuery.mockClear();
    return rebuild(undefined, options);
  };

  return {
    ...service,
    send,
    rebuild: _rebuild,
    mocks: {
      sendParentInput,
      startQuery,
    },
  };
};

const {
  useAssign,
  useGuard,
  useSendParent,
  rebuild,
  send,
  context,
  start,
  mocks: { sendParentInput, startQuery },
} = useTest();
// #endregion

describe('Acceptance', () => {
  test.concurrent('The machine is defined', () => {
    const actual = inputsMachine;
    expect(actual).toBeDefined();
  });

  describe('Actions', () => {
    describe('Input', () => {
      const [acceptance, testExpect] = useAssign('input');

      test.concurrent('Action exists', () => {
        acceptance();
      });

      test.concurrent('Test 1', () => {
        const context = generateDefaultContext();
        const inputs: Inputs = {
          country: 'CN',
          airingStatus: 'FINISHED',
        };

        testExpect({
          context,
          event: { inputs, type: 'INPUTS' },
          expected: { ...context, current: inputs },
        });
      });

      test.concurrent('Test 2', () => {
        const context = generateDefaultContext();
        const inputs: Inputs = {
          country: 'CN',
          airingStatus: 'CANCELLED',
          genres: ['Action', 'Adventure'],
        };

        testExpect({
          context,
          event: { inputs, type: 'INPUTS' },
          expected: { ...context, current: inputs },
        });
      });
    });

    describe('ResetEditing', () => {
      const [acceptance, testExpect] = useAssign('resetEditing');

      test.concurrent('Action exists', () => {
        acceptance();
      });

      test.concurrent('Test 1', () => {
        const context = generateDefaultContext({
          current: {
            country: 'CN',
            airingStatus: 'FINISHED',
          },
        });

        testExpect({
          context,
          expected: { ...cloneDeep(context), editing: false },
        });
      });

      test.concurrent('Test 2', () => {
        const context = generateDefaultContext({
          current: {
            country: 'CN',
            airingStatus: 'CANCELLED',
            genres: ['Action', 'Adventure'],
          },
        });

        testExpect({
          context,
          expected: { ...cloneDeep(context), editing: false },
        });
      });
    });

    describe('Edit', () => {
      const [acceptance, testExpect] = useAssign('edit');

      test.concurrent('Action exists', () => {
        acceptance();
      });

      test.concurrent('Test 1', () => {
        const context = generateDefaultContext({
          current: {
            country: 'CN',
            airingStatus: 'FINISHED',
          },
        });

        testExpect({
          context,
          expected: { ...cloneDeep(context), editing: true },
        });
      });

      test.concurrent('Test 2', () => {
        const context = generateDefaultContext({
          current: {
            country: 'CN',
            airingStatus: 'CANCELLED',
            genres: ['Action', 'Adventure'],
          },
        });

        testExpect({
          context,
          expected: { ...cloneDeep(context), editing: true },
        });
      });
    });

    describe('AssignPrevious', () => {
      const [acceptance, testExpect] = useAssign('assignPrevious');

      test.concurrent('Action exists', () => {
        acceptance();
      });

      test.concurrent('Test 1', () => {
        const context = generateDefaultContext({
          current: {
            country: 'CN',
            airingStatus: 'FINISHED',
          },
        });

        testExpect({
          context,
          expected: { ...cloneDeep(context), previous: context.current },
        });
      });

      test.concurrent('Test 2', () => {
        const context = generateDefaultContext({
          current: {
            country: 'CN',
            airingStatus: 'CANCELLED',
            genres: ['Action', 'Adventure'],
          },
        });

        testExpect({
          context,
          expected: { ...cloneDeep(context), previous: context.current },
        });
      });
    });

    describe('sendParentInput', () => {
      const [acceptance, testExpect] = useSendParent('sendParentInput');

      test.concurrent('Sender exists', () => {
        acceptance();
      });

      const useTest = (arg?: Partial<Context>) => {
        const context = generateDefaultContext(arg);
        const type = `CHILD${DEFAULT_EVENT_DELIMITER}${context.name}${DEFAULT_EVENT_DELIMITER}${EVENTS.INPUT}`;

        testExpect({
          context,
          expected: { type, input: context.current },
        });
      };

      test.concurrent('Test 1', () => {
        useTest({
          current: {
            country: 'CN',
            airingStatus: 'FINISHED',
          },
        });
      });

      test.concurrent('Test 2', () => {
        useTest({
          current: {
            country: 'CN',
            airingStatus: 'FINISHED',
            genres: ['Action', 'Adventure'],
          },
        });
      });
    });

    describe('startQuery', () => {
      const [acceptance, testExpect] = useSendParent('startQuery');

      test.concurrent('Sender exists', () => {
        acceptance();
      });

      const useTest = (arg?: Partial<Context>) => {
        const context = generateDefaultContext(arg);
        const type = 'START_QUERY';

        testExpect({
          context,
          expected: { type },
        });
      };

      test.concurrent('Test 1', () => {
        useTest({
          current: {
            country: 'CN',
            airingStatus: 'FINISHED',
          },
        });
      });

      test.concurrent('Test 2', () => {
        useTest();
      });

      test.concurrent('Test 3', () => {
        useTest({
          current: {
            country: 'CN',
            airingStatus: 'FINISHED',
            genres: ['Action', 'Adventure'],
          },
        });
      });
    });
  });

  describe('Guards', () => {
    describe('isEditing', () => {
      const [acceptance, testExpect] = useGuard('isEditing');

      test.concurrent('Guard exists', () => {
        acceptance();
      });

      test.concurrent('Test no editing', () => {
        const context = generateDefaultContext();
        testExpect({ context, expected: false });
      });

      test.concurrent('Test editing', () => {
        const context = generateDefaultContext({ editing: true });
        testExpect({ context, expected: true });
      });
    });

    describe('currentEqualsPrevious', () => {
      const [acceptance, testExpect] = useGuard('currentEqualsPrevious');

      test.concurrent('Guard exists', () => {
        acceptance();
      });

      test.concurrent(
        'No definition for both current and previous => true',
        () => {
          const context = generateDefaultContext();
          testExpect({ context, expected: true });
        }
      );

      test.concurrent('Current is defined => false', () => {
        const context = generateDefaultContext({
          current: { country: 'JP' },
        });
        testExpect({ context, expected: false });
      });

      test.concurrent(
        'Current and Previous are defined, but differents => false',
        () => {
          const context = generateDefaultContext({
            current: { country: 'JP' },
            previous: { country: 'KR' },
          });
          testExpect({ context, expected: false });
        }
      );

      test.concurrent(
        'Current and Previous are defined adn equals => true',
        () => {
          const context = generateDefaultContext({
            current: { country: 'JP', format: 'MANGA' },
            previous: { country: 'JP', format: 'MANGA' },
          });
          testExpect({ context, expected: true });
        }
      );
    });
  });
});

describe('Testing service', () => {
  test.concurrent('Throws error if name is not defined', () => {
    const safe = () => {
      const service = interpret(
        inputsMachine.withContext({} as any)
      ).start();
      service.send('INPUTS');
    };
    expect(safe).toThrowError();
  });

  describe('Workflow', () => {
    describe('First', () => {
      beforeAll(rebuild);
      const inputs: Inputs = { country: 'CN', genres: ['Action'] };

      test('Start the machine', () => start());

      test('Send Inputs', () => send(inputs));
      test('Wait', () => advanceByTime(10));

      test('Editing is true', () => {
        context(true, (context) => {
          return context.editing;
        });
      });

      test('Sends input to parent', () => {
        sendParentInput.mock.calls.length; //?
        expect(sendParentInput).toBeCalledTimes(1);
      });

      test('Current is assigned', () => {
        context(inputs, (context) => context.current);
      });

      test('Previous is undefined', () => {
        context(undefined, (context) => context.previous);
      });

      test('Wait the throttle time 1', () => advanceByTime(THROTTLE_TIME));

      test('Editing is false', () => {
        context(false, (context) => context.editing);
      });

      test('Previous is assigned', () => {
        context(inputs, (context) => context.previous);
      });

      test('It starts query', () => {
        expect(startQuery).toBeCalledTimes(1);
      });

      test('Send Inputs again', () => send(inputs));

      test('Sends input to parent twice', () => {
        expect(sendParentInput).toBeCalledTimes(2);
      });

      test('Current Equals Previous', () => {
        context(true, (context) => context.current === context.previous);
      });

      test('Wait the throttle time 2', () => advanceByTime(THROTTLE_TIME));

      test('Query is not sended', () => {
        expect(startQuery).toBeCalledTimes(1);
      });
    });

    describe('Second', () => {
      beforeAll(rebuild);
      const inputs1: Inputs = { country: 'CN', genres: ['Action'] };
      const inputs2: Inputs = { country: 'KR', genres: ['Action'] };

      test('Start the machine', () => start());

      test('Send Inputs', () => send(inputs1));

      test('Editing is true', () => {
        context(true, (context) => {
          context; //?
          return context.editing;
        });
      });

      test('Sends input to parent', () => {
        expect(sendParentInput).toBeCalledTimes(1);
      });

      test('Current is assigned', () => {
        context(inputs1, (context) => context.current);
      });

      test('Previous is undefined', () => {
        context(undefined, (context) => context.previous);
      });

      test('Wait the throttle time 1', () => advanceByTime(THROTTLE_TIME));

      test('Editing is false', () => {
        context(false, (context) => context.editing);
      });

      test('Previous is assigned', () => {
        context(inputs1, (context) => context.previous);
      });

      test('It starts query', () => {
        expect(startQuery).toBeCalledTimes(1);
      });

      test('Send Inputs again, different from previous', () =>
        send(inputs2));

      test('Sends input to parent twice', () => {
        expect(sendParentInput).toBeCalledTimes(2);
      });

      test('Current not equals Previous', () => {
        context(false, (context) => context.current === context.previous);
      });

      test('Wait the throttle time 2', () => advanceByTime(THROTTLE_TIME));

      test('It starts query again', () => {
        expect(startQuery).toBeCalledTimes(2);
      });
    });
  });
});

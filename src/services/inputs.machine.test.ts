import cloneDeep from 'lodash.clonedeep';
import { afterAll, beforeAll, describe, expect, test, vi } from 'vitest';
import { EventObject, interpret } from 'xstate';
import { matches as matchesD } from '~utils/machine';
import { advanceByTime } from '~utils/test';
import {
  DEFAULT_EVENT_DELIMITER,
  EVENTS,
  THROTTLE_TIME,
} from './constants';
import { inputsMachine, MatchesProps } from './inputs.machine';
import type { Context, Events, Inputs } from './inputs.types';

beforeAll(() => {
  vi.useFakeTimers();
});

afterAll(() => {
  vi.useRealTimers();
});

type Action<T = any> = (context?: Context, event?: Events) => T;
type TestHelper<T = any> = {
  context?: Context;
  event?: Events;
  expected: T;
};

const generateDefaultContext = (context?: Partial<Context>) => {
  return { name: 'INPUTS', ...context } as Context;
};

const isTestHelperDefined = <T>(helper: TestHelper<T>) => {
  const { context, event } = helper;
  const checkAll = !context && !event;
  if (checkAll) return false;
  return true;
};

// #region Hooks
const useAssign = (name: string) => {
  const action = inputsMachine.options.actions?.[name] as any;
  const fn = action?.assignment;
  const mockFn = vi.fn(fn);
  if (!fn) throw 'Action not exists';

  const acceptance = () => {
    expect(action).toBeDefined();
    expect(action?.type).toBe('xstate.assign');
    expect(mockFn).toBeDefined();
  };

  const testExpect = (helper: TestHelper<Context>) => {
    const checkAll = isTestHelperDefined(helper);
    if (!checkAll) return;

    const { context, event, expected } = helper;
    expect(mockFn(context, event)).toEqual(expected);
  };

  return [acceptance, testExpect, mockFn] as const;
};

const useGuard = (name: string) => {
  const guard = inputsMachine.options.guards?.[name] as Action<boolean>;
  if (!guard) throw 'Guard not exists';
  const mockFn = vi.fn(guard);

  const acceptance = () => {
    expect(guard).toBeInstanceOf(Function);
  };

  const testExpect = (helper: TestHelper<boolean>) => {
    const checkAll = isTestHelperDefined(helper);
    if (!checkAll) return;

    const { context, event, expected } = helper;
    expect(mockFn(context, event)).toEqual(expected);
  };

  return [acceptance, testExpect, mockFn] as const;
};

const useSenderParent = (name: string) => {
  const action = inputsMachine.options.actions?.[name] as any;
  if (!action) throw 'Action not exists';

  type Event = EventObject & Record<string, any>;
  const send = action.event as Action<Event> | Event;

  const acceptance = () => {
    expect(action).toBeDefined();
    expect(action.type).toBe('xstate.send');
    expect(send).toBeDefined();
  };

  const testExpect = (helper: TestHelper<Event>) => {
    const checkAll = isTestHelperDefined(helper);
    if (!checkAll) return;

    const { context, event, expected: result } = helper;

    if (typeof send === 'function') {
      const actual = send(context, event);
      expect(actual).toEqual(result);
    } else {
      expect(send).toEqual(result);
    }
  };

  return [acceptance, testExpect] as const;
};

const useService = (name = 'INPUTS') => {
  const sendParentInput = vi.fn(() => {});
  const startQuery = vi.fn(() => {});
  const service = interpret(
    inputsMachine.withContext({ name }).withConfig({
      actions: {
        sendParentInput,
        startQuery,
      },
    })
  );
  const send = (inputs: Inputs) => {
    service.send({ type: 'INPUTS', inputs });
  };

  const reset = () => {
    service.send('__RESET__');
  };

  const stop = service.stop;

  const context = <T = Context>(
    expected: T,
    selector?: (context: Context) => T
  ) => {
    const innerContext = service.getSnapshot().context;
    const actual = selector ? selector(innerContext) : innerContext;
    expect(actual).toEqual(expected);
  };

  const matches = (...values: MatchesProps) => {
    const value = service.getSnapshot().value;
    const fn = matchesD(value);
    const actual = fn(...values);
    expect(actual).toBe(true);
  };

  const start = service.start.bind(service);

  return {
    send,
    context,
    matches,
    start,
    reset,
    stop,
    mocks: {
      sendParentInput,
      startQuery,
    },
  } as const;
};
// #endregion

describe('Acceptance', () => {
  describe('Test the tests', () => {
    describe('useAssign', () => {
      test.concurrent('Function not exists', () => {
        const safe = () => useAssign('notExists');
        expect(safe).toThrow('Action not exists');
      });

      test.concurrent('Context in function Helper is undefined', () => {
        const [_, expect] = useAssign('input');
        expect({ expected: { name: '' } });
      });
    });

    describe('useSendParent', () => {
      test.concurrent('Function not exists', () => {
        const safe = () => useSenderParent('notExists');
        expect(safe).toThrow('Action not exists');
      });

      test.concurrent('Context in function Helper is undefined', () => {
        const [_, expect] = useSenderParent('resetEditing');
        expect({ expected: { type: 'any' } });
      });
    });

    describe('useGuard', () => {
      test.concurrent('Function not exists', () => {
        const safe = () => useGuard('notExists');
        expect(safe).toThrow('Guard not exists');
      });

      test.concurrent('Context in function Helper is undefined', () => {
        const [_, expect] = useGuard('isEditing');
        expect({ expected: true });
      });
    });
  });

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
      const [acceptance, testExpect] = useSenderParent('sendParentInput');

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
      const [acceptance, testExpect] = useSenderParent('startQuery');

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
    describe('first', () => {
      const {
        send,
        context,
        start,
        mocks: { sendParentInput, startQuery },
      } = useService();
      const inputs: Inputs = { country: 'CN', genres: ['Action'] };

      test('Start the machine', () => start());

      test('Send Inputs', () => send(inputs));

      test('Editing is true', () => {
        context(true, (context) => context.editing);
      });

      test('Sends input to parent', () => {
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

    describe('second', () => {
      const {
        send,
        context,
        start,
        mocks: { sendParentInput, startQuery },
      } = useService();
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

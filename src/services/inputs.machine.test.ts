import cloneDeep from 'lodash.clonedeep';
import { afterAll, beforeAll, describe, expect, test, vi } from 'vitest';
import { EventObject } from 'xstate';
import { DEFAULT_EVENT_DELIMITER, EVENTS } from './constants';
import { inputsMachine } from './inputs.machine';
import { Context, Events, Inputs } from './inputs.types';

beforeAll(() => {
  vi.useFakeTimers();
});

afterAll(() => {
  vi.useRealTimers();
});

type Action<T = any> = (context?: Context, event?: Events) => T;
type Guard = (context: Context, event: Events) => boolean;
type TestHelper<T = any> = {
  context?: Context;
  event?: Events;
  expected: T;
};

const generateDefaultContext = (context?: Partial<Context>) => {
  return { name: 'Inputs', ...context } as Context;
};

const isTestHelperDefined = <T>(helper: TestHelper<T>) => {
  const { context, event } = helper;
  const checkAll = !context && !event;
  if (checkAll) return false;
  return true;
};

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
    if (!checkAll) return true;

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

  describe.todo('guards', () => {
    //TODO: test guards
  });
});

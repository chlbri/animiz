import { assign } from '@xstate/immer';
import {
  createMachine,
  InternalMachineOptions,
  sendParent,
  __ResolvedTypesMetaFrom,
} from 'xstate';

export type Context = {
  editing?: boolean;
  input?: string;
  name: string;
};

export type Events = { type: 'INPUT'; input?: string };

export const inputMachine = createMachine(
  {
    predictableActionArguments: true,
    preserveActionOrder: true,
    tsTypes: {} as import('./input.machine.typegen').Typegen0,
    schema: { context: {} as Context, events: {} as Events },
    initial: 'idle',
    on: {
      INPUT: {
        target: '.idle',
        actions: ['input', 'sendParentInput'],
        internal: false,
      },
    },

    states: {
      idle: {
        after: {
          THROTTLE_TIME: {
            target: 'done',
            cond: 'isEditing',
          },
        },
      },
      done: {
        entry: 'resetEdititng',
        always: {
          actions: ['startQuery'],
          target: 'idle',
        },
      },
    },
  },
  {
    actions: {
      input: assign((context, { input }) => {
        context.input = input;
        context.editing = true;
      }),

      resetEdititng: assign((context) => {
        context.editing = false;
      }),

      sendParentInput: sendParent(({ name }, { input }) => ({
        type: `CHILD/${name}$/INPUT`,
        input,
      })),

      startQuery: sendParent('START_QUERY'),
    },

    guards: {
      isEditing: (context) => !!context.editing,
    },

    delays: { THROTTLE_TIME: 200 },
  }
);

type Mach = typeof inputMachine;
type TResolvedTypesMeta = __ResolvedTypesMetaFrom<Mach>;
export type Options = Exclude<
  InternalMachineOptions<Context, Events, TResolvedTypesMeta, true>,
  undefined
>;
// const test2 :T = {}

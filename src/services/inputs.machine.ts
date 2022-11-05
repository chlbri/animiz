import { assign } from '@xstate/immer';
import { dequal } from 'dequal';
import { createMachine, sendParent } from 'xstate';
import { DEFAULT_EVENT_DELIMITER, EVENTS } from './constants';
import { THROTTLE_TIME } from './inputs.constants';
import type { Context, Events } from './inputs.types';

export const inputsMachine = createMachine(
  {
    predictableActionArguments: true,
    preserveActionOrder: true,
    tsTypes: {} as import('./inputs.machine.typegen').Typegen0,
    schema: { context: {} as Context, events: {} as Events },
    initial: 'idle',
    on: {
      INPUTS: {
        target: '.idle',
        actions: ['input', 'edit', 'sendParentInput'],
      },
    },

    states: {
      idle: {
        after: {
          THROTTLE_TIME: {
            target: 'checking',
            cond: 'isEditing',
          },
        },
        exit: ['assignPrevious'],
      },
      checking: {
        exit: ['resetEditing'],
        always: [
          {
            cond: 'currentEqualsPrevious',
            target: 'idle',
          },
          'done',
        ],
      },
      done: {
        always: {
          actions: ['startQuery'],
          target: 'idle',
        },
      },
    },
  },
  {
    actions: {
      input: assign((context, { inputs }) => (context.current = inputs)),

      edit: assign((context) => (context.editing = true)),

      assignPrevious: assign(
        (context) => (context.previous = context.current)
      ),

      resetEditing: assign((context) => (context.editing = false)),

      sendParentInput: sendParent(({ name, current: input }) => ({
        type: `CHILD${DEFAULT_EVENT_DELIMITER}${name}${DEFAULT_EVENT_DELIMITER}${EVENTS.INPUT}`,
        input,
      })),

      startQuery: sendParent('START_QUERY'),
    },

    guards: {
      isEditing: ({ editing }) => !!editing,
      currentEqualsPrevious: ({ current, previous }) => {
        return dequal(current, previous);
      },
    },

    delays: { THROTTLE_TIME },
  }
);

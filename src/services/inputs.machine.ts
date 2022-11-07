import type { StateMatching } from '@bemedev/decompose';
import { assign } from '@xstate/immer';
import { dequal } from 'dequal';
import {
  createMachine,
  Prop,
  sendParent,
  StateValue,
  __ResolvedTypesMetaFrom,
} from 'xstate';
import type { MatchOptions } from '~services/utils/machine/matches';
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
      },
      checking: {
        entry: ['resetEditing'],
        always: [
          {
            cond: 'currentEqualsPrevious',
            target: 'idle',
          },
          'done',
        ],
        exit: ['assignPrevious'],
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

      sendParentInput: sendParent(
        ({ name, current: input }) => ({
          type: `CHILD${DEFAULT_EVENT_DELIMITER}${name}${DEFAULT_EVENT_DELIMITER}${EVENTS.INPUT}`,
          input,
        }),
        {}
      ),

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

export type InputsMachine = typeof inputsMachine;
export type TypesMeta = __ResolvedTypesMetaFrom<InputsMachine>;

type TSV = Prop<Prop<TypesMeta, 'resolved'>, 'matchesStates'>;

export type MatchesProps = MatchOptions<
  StateMatching<TSV extends StateValue ? TSV : StateValue>
>[];

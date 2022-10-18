import { assign, createMachine } from 'xstate';
import type { Context, Events } from './tooltip.types';

const DEFAULT_TIME_TO_SHOW = 300;
const DEFAULT_TIME_TO_HIDE = 500;

export const tooltipMachine = createMachine(
  {
    predictableActionArguments: true,
    preserveActionOrder: true,
    tsTypes: {} as import('./tooltip.machine.typegen').Typegen0,
    schema: {
      context: {} as Context,
      events: {} as Events,
    },

    on: {
      SET_WINDOW_DIMENSIONS: {
        actions: ['setWindowDimensions'],
      },

      SET_COORDS: {
        actions: ['setCoords'],
      },
    },

    initial: 'hide',
    states: {
      show: {
        on: {
          HIDE: 'hide',
          MOUSE_MOVE: {
            actions: ['setMousePosition'],
            target: 'show',
            internal: false,
          },
        },
        after: {
          TIME_TO_HIDE: {
            target: 'hide',
          },
        },
      },
      middle: {
        after: {
          TIME_TO_SHOW: 'show',
        },
      },
      hide: {
        entry: ['stopMoving'],
        on: {
          MOUSE_MOVE: { target: 'middle', actions: ['setMousePosition'] },
        },
      },
    },
  },
  {
    actions: {
      setMousePosition: assign({
        mousePosition: (_, { position }) => position,
      }),

      setWindowDimensions: assign({
        window: (_, { size }) => size,
      }),

      setCoords: assign({
        coords: (_, { coords }) => coords,
      }),

      //TODO: Calculate position
      stopMoving: assign({
        position: (_) => undefined,
      }),
    },

    guards: {
      // isNotMoving: ({ moving }) => !moving,
    },

    delays: {
      TIME_TO_HIDE: ({ timeToHide }) => timeToHide ?? DEFAULT_TIME_TO_HIDE,
      TIME_TO_SHOW: ({ timeToShow }) => timeToShow ?? DEFAULT_TIME_TO_SHOW,
    },
  }
);

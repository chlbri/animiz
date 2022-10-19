import { assign, createMachine } from 'xstate';
import { send } from 'xstate/lib/actions';
import { positionTooltipMachine } from './positionTooltip.machine';
import type { Context, Events, Position, Services } from './tooltip.types';

const DEFAULT_TIME_TO_SHOW = 300;
const DEFAULT_TIME_TO_HIDE = 5000;

export const DEFAULT_POSITION: Position = { x: 0, y: 0 };

export const tooltipMachine = createMachine(
  {
    tsTypes: {} as import('./tooltip.machine.typegen').Typegen0,
    schema: {
      context: {} as Context,
      events: {} as Events,
      services: {} as Services,
    },
    preserveActionOrder: true,
    predictableActionArguments: true,

    context: {},

    id: 'tooltip',
    initial: 'leave',
    on: {
      GET_VIEWPORT: {
        actions: 'setWindowDimensions',
      },
      GET_COORDS: {
        actions: 'setCoords',
      },
      GET_TOOLTIP: {
        actions: 'getTooltipSize',
      },
    },
    states: {
      enter: {
        initial: 'hide',
        on: {
          MOUSE_LEAVE: 'leave.waiting',
        },
        states: {
          show: {
            entry: ['forwardProps'],
            id: 'show',
            after: {
              TIME_TO_HIDE: '#hide',
            },
            on: {
              MOUSE_MOVE: {
                // target: 'position',
                actions: ['setMousePosition'],
                target: 'show',
              },
            },
            invoke: {
              id: 'positionTooltipMachine',
              src: 'positionTooltipMachine',
              onDone: {
                actions: 'getPosition',
              },
            },
            // initial: 'idle',
          },
          hide: {
            id: 'hide',
            entry: ['hide'],
            on: {
              MOUSE_MOVE: {
                target: 'waiting',
                actions: 'setMousePosition',
              },
            },
          },
          waiting: {
            after: {
              TIME_TO_SHOW: 'show',
            },
          },
        },
      },
      leave: {
        on: {
          MOUSE_ENTER: {
            target: 'enter',
          },
        },
        initial: 'idle',
        states: {
          idle: {
            entry: ['hide'],
          },
          waiting: {
            after: {
              TIME_TO_SHOW: 'idle',
            },
          },
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
        viewPort: (_, { size }) => size,
      }),

      setCoords: assign({
        coords: (_, { coords }) => coords,
      }),

      hide: assign({
        position: (_) => undefined,
      }),

      getPosition: assign({
        position: (_, { data }) => data,
      }),

      getTooltipSize: assign({
        toolTipSize: (_, { size }) => size,
      }),

      forwardProps: send(
        ({ timeToHide, timeToShow, position, ...props }) => ({
          type: 'GET_PROPS',
          props,
        }),
        { to: 'positionTooltipMachine' }
      ),
    },

    // guards: {
    //   allValuesAreDefined: ({ coords, mousePosition, viewPort }) => {
    //     const out = !!coords && !!mousePosition && !!viewPort;
    //     return out;
    //   },
    // },

    delays: {
      TIME_TO_HIDE: ({ timeToHide }) => timeToHide ?? DEFAULT_TIME_TO_HIDE,
      TIME_TO_SHOW: ({ timeToShow }) => timeToShow ?? DEFAULT_TIME_TO_SHOW,
    },

    services: {
      positionTooltipMachine,
    },
  }
);

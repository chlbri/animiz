import type { NOmit } from '@bemedev/core';
import { assign } from '@xstate/immer';
import { assign as assignM, createMachine, interpret } from 'xstate';
import { waitFor } from 'xstate/lib/waitFor';
import type { Coords, Position, Size } from './tooltip.types';

type Context = {
  mousePosition?: Position;
  positionX?: number;
  positionY?: number;
  toolTipSize?: Size;
  coords?: Coords;
  viewPort?: Size;
};

type Events = {
  type: 'GET_PROPS';
  props: NOmit<Context, 'positionX' | 'positionY'>;
};

const RATIO_X = 3 / 4;
const RATIO_Y = 4 / 5;

/**
 * Space in pixels
 */
const SPACE_FOR_TOOLTIP = 10;

export const positionTooltipMachine = createMachine(
  {
    schema: {
      context: {} as Context,
      events: {} as Events,
    },
    predictableActionArguments: true,
    preserveActionOrder: true,
    tsTypes: {} as import('./positionTooltip.machine.typegen').Typegen0,
    context: {},

    // id: 'positionTooltip',
    initial: 'idle',
    states: {
      idle: {
        on: {
          GET_PROPS: {
            actions: ['assignProps'],
            target: 'checking',
          },
        },
      },
      checking: {
        always: {
          cond: 'allPropsAreDefined',
          target: 'positionX',
        },
      },
      positionX: {
        always: [
          {
            target: 'positionY',
            cond: 'isLeft',
            actions: 'positionLeft',
          },
          {
            target: 'positionY',
            actions: 'positionRight',
          },
        ],
      },
      positionY: {
        always: [
          {
            target: 'final',
            cond: 'isTop',
            actions: 'positionTop',
          },
          {
            target: 'final',
            actions: 'positionBottom',
          },
        ],
      },
      final: {
        type: 'final',
        data: ({ positionX, positionY }) => {
          return `translate(${positionX ?? 0}px, ${positionY ?? 0}px)`;
        },
      },
    },
  },
  {
    guards: {
      isLeft: ({ mousePosition, viewPort }) => {
        const width = viewPort!.width * RATIO_X;
        const positionX = mousePosition!.x;
        return positionX < width;
      },

      isTop: ({ mousePosition, viewPort }) => {
        const height = viewPort!.height * RATIO_Y;
        const positionY = mousePosition!.y;
        return positionY < height;
      },

      allPropsAreDefined: ({
        coords,
        mousePosition,
        toolTipSize,
        viewPort,
      }) => {
        const out =
          !!coords && !!mousePosition && !!toolTipSize && !!viewPort;

        return out;
      },
    },

    actions: {
      positionRight: assign((context) => {
        context.positionX =
          context.coords!.left -
          context.toolTipSize!.width -
          SPACE_FOR_TOOLTIP;
      }),

      positionLeft: assign((context) => {
        context.positionX =
          context.coords!.left + context.coords!.width + SPACE_FOR_TOOLTIP;
      }),

      positionBottom: assign((context) => {
        context.positionY =
          context.coords!.top - SPACE_FOR_TOOLTIP - context.coords!.height;
      }),

      positionTop: assign((context) => {
        context.positionY = context.coords!.top + SPACE_FOR_TOOLTIP;
      }),

      assignProps: assignM((_, { props }) => props),
    },
  }
);

export async function servicePosition(
  props: NOmit<Context, 'positionX' | 'positionY'>
) {
  const machine = positionTooltipMachine.withContext(props);
  const actor = interpret(machine).start();
  const context = await waitFor(actor, (state) => !!state.done).then(
    (state) => state.context
  );
  const out: Position = {
    x: context.positionX!,
    y: context.positionY!,
  };
  return out;
}

import type { NOmit } from '@bemedev/core';
import { assign } from '@xstate/immer';
import { createMachine, interpret } from 'xstate';
import { waitFor } from 'xstate/lib/waitFor';
import type { Coords, Position, Size } from './tooltip.types';

type Context = {
  mousePosition: Position;
  positionX?: number;
  positionY?: number;
  toolTipSize: Size;
  coords: Coords;
  viewPort: Size;
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
    },
    predictableActionArguments: true,
    preserveActionOrder: true,
    tsTypes: {} as import('./positionTooltip.machine.typegen').Typegen0,

    id: 'positionTooltip',
    initial: 'positionX',
    states: {
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
        data: ({ positionX: x, positionY: y }) => {
          const out = { x, y };
          return out;
        },
      },
    },
  },
  {
    guards: {
      isLeft: ({ mousePosition, viewPort }) => {
        const width = viewPort.width * RATIO_X;
        const positionX = mousePosition.x;
        return positionX < width;
      },

      isTop: ({ mousePosition, viewPort }) => {
        const height = viewPort.height * RATIO_Y;
        const positionY = mousePosition.y;
        return positionY < height;
      },
    },

    actions: {
      positionRight: assign((context) => {
        context.positionX =
          context.coords.left -
          context.toolTipSize.width -
          SPACE_FOR_TOOLTIP;
      }),

      positionLeft: assign((context) => {
        context.positionX =
          context.coords.left + context.coords.width + SPACE_FOR_TOOLTIP;
      }),

      positionBottom: assign((context) => {
        context.positionY =
          context.coords.top - SPACE_FOR_TOOLTIP - context.coords.height;
      }),

      positionTop: assign((context) => {
        context.positionY = context.coords.top + SPACE_FOR_TOOLTIP;
      }),
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

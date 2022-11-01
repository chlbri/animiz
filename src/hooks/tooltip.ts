import { Accessor, createEffect } from 'solid-js';
import { createInterpret } from 'src/services/createInterpret';
import { tooltipMachine } from 'src/services/tooltip.machine';
import type {
  Context,
  Coords,
  Position,
  Size,
} from 'src/services/tooltip.types';

export function useTooltip(
  ref: Accessor<HTMLElement | null>,
  context?: Pick<Context, 'timeToHide' | 'timeToShow'>
) {
  const machine = context
    ? tooltipMachine.withContext(context)
    : tooltipMachine;

  const { context: getContext, matches, send } = createInterpret(machine);

  createEffect(() => {
    const size: Size = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    send({ type: 'GET_VIEWPORT', size });

    const _ref = ref();
    if (_ref) {
      const coords: Coords = {
        left: _ref.clientLeft,
        top: _ref.clientTop,
        width: _ref.clientWidth,
        height: _ref.clientHeight,
      };
      send({ type: 'GET_COORDS', coords });
    }
  });

  const mouseEvents = {
    onMouseEnter: () => send('MOUSE_ENTER'),
    onMouseLeave: () => send('MOUSE_LEAVE'),

    onMouseMove: (event: MouseEvent) => {
      const position: Position = {
        x: event.clientX,
        y: event.clientY,
      };
      send({ type: 'MOUSE_MOVE', position });
    },
  };

  const tooltipProps = {
    show: matches('enter.show'),
    getSize: (size: Size) => send({ type: 'GET_TOOLTIP', size }),
    position: getContext((context) => context.position),
  };

  return { mouseEvents, tooltipProps } as const;
}

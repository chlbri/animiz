import { Accessor, createEffect } from 'solid-js';
import { createInterpret } from 'src/services/createInterpret';
import { tooltipMachine } from 'src/services/tooltip.machine';
import type {
  Context,
  Coords,
  Position,
  Size,
} from 'src/services/tooltip.types';

function prepare(options?: Pick<Context, 'timeToHide' | 'timeToShow'>) {
  const machine = options
    ? tooltipMachine.withContext(options)
    : tooltipMachine;

  const {
    context: getContext,
    matches,
    sender,
  } = createInterpret(machine);

  const mouseLeave = sender('MOUSE_LEAVE');
  const mouseEnter = sender('MOUSE_ENTER');
  const mouseMove = sender('MOUSE_MOVE');
  const getCoords = sender('GET_COORDS');
  const getTooltip = sender('GET_TOOLTIP');
  const getViewport = sender('GET_VIEWPORT');

  return {
    getContext,
    matches,
    mouseLeave,
    mouseEnter,
    mouseMove,
    getCoords,
    getTooltip,
    getViewport,
  } as const;
}

type _Prepare = ReturnType<typeof prepare>;
type Prepare<K extends keyof _Prepare = keyof _Prepare> = Pick<
  _Prepare,
  K
>;

function createSizeEffect<T extends HTMLElement>(
  ref: Accessor<T | null>,
  { getViewport, getCoords }: Prepare<'getViewport' | 'getCoords'>
) {
  return createEffect(() => {
    const size: Size = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    getViewport({ size });

    const _ref = ref();
    if (_ref) {
      const coords: Coords = {
        left: _ref.clientLeft,
        top: _ref.clientTop,
        width: _ref.clientWidth,
        height: _ref.clientHeight,
      };
      getCoords({ coords });
    }
  });
}

function createMouseEvents({
  mouseEnter,
  mouseLeave,
  mouseMove,
}: Prepare<'mouseEnter' | 'mouseLeave' | 'mouseMove'>) {
  return {
    onMouseEnter: () => mouseEnter(),
    onMouseLeave: () => mouseLeave(),

    onMouseMove: (event: MouseEvent) => {
      const position: Position = {
        x: event.clientX,
        y: event.clientY,
      };
      mouseMove({ position });
    },
  } as const;
}

function createTootltip({
  getTooltip,
  getContext,
  matches,
}: Prepare<'getContext' | 'getTooltip' | 'matches'>) {
  return {
    show: matches('enter.show'),
    getTooltip,
    position: getContext((context) => context.position),
  };
}

export default function useTooltip<T extends HTMLElement>(
  ref: Accessor<T | null>,
  options?: Pick<Context, 'timeToHide' | 'timeToShow'>
) {
  const {
    getContext,
    matches,
    mouseLeave,
    mouseEnter,
    mouseMove,
    getCoords,
    getTooltip,
    getViewport,
  } = prepare(options);

  createSizeEffect<T>(ref, { getViewport, getCoords });

  const mouseEvents = createMouseEvents({
    mouseEnter,
    mouseLeave,
    mouseMove,
  });

  const tooltipProps = createTootltip({ matches, getTooltip, getContext });

  return { mouseEvents, tooltipProps } as const;
}

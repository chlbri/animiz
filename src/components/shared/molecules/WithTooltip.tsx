/** @jsxImportSource solid-js */

import { Component, createEffect, JSX } from 'solid-js';
import { createInterpret } from 'src/services/createInterpret';
import { tooltipMachine } from 'src/services/tooltip.machine';
import type { Coords, Position, Size } from 'src/services/tooltip.types';
import { Tooltip } from '../atoms/Tooltip';

type Props = {
  children: JSX.Element;
  tooltipTitle?: string;
  tooltipSummary: string;
};

export const WithTooltip: Component<Props> = ({
  children,
  tooltipTitle,
  tooltipSummary,
}) => {
  // #region Preparation
  let ref: HTMLDivElement;

  const { context, matches, send } = createInterpret(
    tooltipMachine.withContext({ timeToShow: 600 })
  );

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
    title: tooltipTitle,
    summary: tooltipSummary,
    show: matches('enter.show'),
    getSize: (size: Size) => send({ type: 'GET_TOOLTIP', size }),
    position: context((context) => context.position),
  };
  // #endregion

  createEffect(() => {
    const size: Size = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    send({ type: 'GET_VIEWPORT', size });

    const coords: Coords = {
      left: ref.clientLeft,
      top: ref.clientTop,
      width: ref.clientWidth,
      height: ref.clientHeight,
    };
    send({ type: 'GET_COORDS', coords });
  });

  return (
    <div
      ref={ref!}
      class='relative w-max flex cursor-pointer hover:cursor-help transition duration-500'
      {...mouseEvents}
    >
      {children}
      <Tooltip {...tooltipProps} />
    </div>
  );
};

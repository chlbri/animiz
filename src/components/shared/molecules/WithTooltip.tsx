/** @jsxImportSource solid-js */

import { Component, createEffect, JSX } from 'solid-js';
import { createInterpret } from 'src/services/createInterpret';
import {
  DEFAULT_POSITION,
  tooltipMachine,
} from 'src/services/tooltip.machine';
import type { Coords, Position, Size } from 'src/services/tooltip.types';
import { Tooltip } from '../atoms/Tooltip';

type Props = {
  children: JSX.Element;
  tooltipTitle?: string;
  tooltipSummary: string;
};

const { context, matches, send, subscribe } =
  createInterpret(tooltipMachine);

export const WithTooltip: Component<Props> = ({
  children,
  tooltipTitle,
  tooltipSummary,
}) => {
  let ref: HTMLDivElement;

  const showTooltip = matches('enter.show');
  const getTooltipSize = (size: Size) =>
    send({ type: 'GET_TOOLTIP', size });
  const position = context(
    (context) => context.position ?? DEFAULT_POSITION
  );

  // subscribe((state) => {
  //   console.log(state.context.position);
  // });
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

  createEffect(() => {
    console.log(matches('enter.show')());
  });

  return (
    <div
      ref={ref!}
      class='relative w-max flex'
      onMouseEnter={() => {
        send('MOUSE_ENTER');
      }}
      onMouseLeave={() => {
        send('MOUSE_LEAVE');
      }}
      onMouseMove={(event) => {
        const position: Position = {
          x: event.clientX,
          y: event.clientY,
        };
        send({ type: 'MOUSE_MOVE', position });
      }}
    >
      {children}
      <Tooltip
        title={tooltipTitle}
        summary={tooltipSummary}
        show={showTooltip}
        getSize={getTooltipSize}
        position={position}
      />
    </div>
  );
};

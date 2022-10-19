/** @jsxImportSource solid-js */

import { Accessor, Component, createEffect, Show } from 'solid-js';
import type { Position, Size } from 'src/services/tooltip.types';

type Props = {
  title?: string;
  summary: string;
  getSize: (size: Size) => void;
  position: Accessor<Position>;
  show: Accessor<boolean>;
};

export const Tooltip: Component<Props> = ({
  title,
  summary,
  position,
  getSize,
  show,
}) => {
  let ref: HTMLDivElement;

  createEffect(() => {
    const size: Size = {
      width: ref.clientWidth,
      height: ref.clientHeight,
    };
    getSize(size);
  });
  return (
    <div
      ref={ref!}
      class='absolute h-14 w-32 flex flex-col space-y-2 opacity-0 pointer-events-none transition transform duration-500 ease-in-out text-white z-30 border rounded-xl border-white'
      classList={{
        'pointer-events-auto opacity-100': show(),
      }}
      style={{
        transform: `translate(${position().x}px, ${position().y}px)`,
        transition: 'opacity 3.5',
      }}
    >
      <Show when={!!title} fallback={<span class='h-8' />}>
        <h4 class='font-medium'>{title}</h4>
      </Show>
      <span class='w-full bg-gray-400 h-1' />
      <span class='text-xs'>{summary}</span>
    </div>
  );
};

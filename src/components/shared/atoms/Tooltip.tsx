/** @jsxImportSource solid-js */

import { Accessor, Component, createEffect, Show } from 'solid-js';
import type { Size } from 'src/services/tooltip.types';

export type TootltipProps = {
  title?: string;
  summary: string;
  getSize: (size: Size) => void;
  position: Accessor<string | undefined>;
  show: Accessor<boolean>;
};

export const Tooltip: Component<TootltipProps> = ({
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
      class='absolute flex flex-col w-max space-y-2 opacity-0 pointer-events-none transition transform duration-500 ease-in-out text-white z-30 border rounded-xl border-gray-500'
      classList={{
        'pointer-events-auto opacity-100': show(),
      }}
      style={{
        transform: position(),
      }}
    >
      <Show when={!!title} fallback={<span class='h-5' />}>
        <h4 class='font-medium p-1'>{title}</h4>
      </Show>
      <span class='w-full bg-gray-400 h-0.5' />
      <span class='text-xs py-1 px-3 text-gray-300'>{summary}</span>
    </div>
  );
};

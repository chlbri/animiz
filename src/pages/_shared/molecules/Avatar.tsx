/** @jsxImportSource solid-js */

import { Component, createSignal } from 'solid-js';
import { ArrowToggle } from './ArrowToggle';

type Props = {
  src?: string;
};

export const Avatar: Component<Props> = ({ src }) => {
  const [open, setOpen] = createSignal(false);
  return (
    <button
      class='flex items-center space-x-2 text-xs'
      onClick={() => {
        setOpen((open) => !open);
      }}
    >
      <img
        src={src}
        alt='Avatar'
        class='w-9 h-7 rounded border border-yellow-600 bg-white'
      />
      <ArrowToggle open={open} class='w-7 aspect-square' />
    </button>
  );
};

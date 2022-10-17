/** @jsxImportSource solid-js */

import type { Accessor, Component } from 'solid-js';
import { ArrowToggle } from '../molecules/ArrowToggle';

type Props = {
  src?: string;
  open: Accessor<boolean>;
};

export const Avatar: Component<Props> = ({ src, open }) => {
  return (
    <button class='flex items-center space-x-2 text-xs'>
      <img
        src={src}
        alt='Avatar'
        class='w-9 h-7 rounded border border-yellow-600 bg-white'
      />
      <ArrowToggle open={open} />
    </button>
  );
};

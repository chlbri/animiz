/** @jsxImportSource solid-js */

import type { Accessor, Component } from 'solid-js';
import { ArrowDownIcon } from '../atoms/icons/ArrowDown';
import { ArrowUpIcon } from '../atoms/icons/ArrowUp';

type Props = {
  open: Accessor<boolean>;
};

export const ArrowToggle: Component<Props> = ({ open }) => {
  return (
    <span class='relative w-7 h-7'>
      <div
        class='absolute inset-0 opacity-0 pointer-events-none transition-opacity ease-out duration-300'
        classList={{ 'pointer-events-auto opacity-100': open() }}
      >
        <ArrowDownIcon class='h-full w-full' />
      </div>
      <div
        class='absolute inset-0 opacity-0 pointer-events-none transition-opacity ease-out duration-300'
        classList={{ 'pointer-events-auto opacity-100': !open() }}
      >
        <ArrowUpIcon class='h-full w-full' />
      </div>
    </span>
  );
};

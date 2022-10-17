/** @jsxImportSource solid-js */

import type { Accessor, Component } from 'solid-js';
import { ArrowDownIcon } from '../atoms/icons/ArrowDown';
import { ArrowUpIcon } from '../atoms/icons/ArrowUp';

type Props = {
  open: Accessor<boolean>;
};

export const ArrowToggle: Component<Props> = ({ open }) => {
  return (
    <span>
      {open() ? (
        <ArrowDownIcon class='w-7 h-7' />
      ) : (
        <ArrowUpIcon class='w-7 h-7' />
      )}
    </span>
  );
};

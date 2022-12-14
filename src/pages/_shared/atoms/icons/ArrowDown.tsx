/** @jsxImportSource solid-js */

import type { Component } from 'solid-js';

type Props = {
  class: string;
};

export const ArrowDownIcon: Component<Props> = (props) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      {...props}
    >
      <path
        stroke-linecap='round'
        stroke-linejoin='round'
        d='M19.5 8.25l-7.5 7.5-7.5-7.5'
      />
    </svg>
  );
};

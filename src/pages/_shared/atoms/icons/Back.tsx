/** @jsxImportSource solid-js */

import type { Component } from 'solid-js';

type Props = {
  class: string;
};

export const BackIcon: Component<Props> = (props) => {
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
        d='M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18'
      />
    </svg>
  );
};

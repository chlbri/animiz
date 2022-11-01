/** @jsxImportSource solid-js */

import type { Component } from 'solid-js';
import CrossIcon from './icons/Cross';

type Props = {
  class?: string;
};

export const RinitSearch: Component<Props> = (props) => {
  return (
    <button class='shadow-xl rounded-full p-2 bg-white/80 backdrop-blur-md'>
      <CrossIcon {...props} />
    </button>
  );
};

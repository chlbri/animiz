/** @jsxImportSource solid-js */

import type { Component } from 'solid-js';

type Props = {
  alt: string;
  src: string;
};

const Image: Component<Props> = (props) => {
  return <img {...props} class='aspect-[7/10] w-full' />;
};

export default Image;

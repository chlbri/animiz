/** @jsxImportSource solid-js */

import { Image as ImageA } from '@astrojs/image/components';
import type { Component } from 'solid-js';

type Props = {
  alt: string;
  src: string;
};

const Image: Component<Props> = (props) => {
  return (
    <ImageA format='webp' aspectRatio='7:10' width='w-32' {...props} />
  );
};

export default Image;

/** @jsxImportSource solid-js */

import type { Component } from 'solid-js';
import Image from '../atoms/Image';

type Props = {
  title: string;
  alt: string;
  src?: string;
};

const Card: Component<Props> = ({
  title,
  src = '/image/defaultCardImage.jpeg',
  alt,
}) => {
  return (
    <div class='flex flex-col space-y-2'>
      <Image src={src} alt={alt} />
      <span>{title}</span>
    </div>
  );
};

export default Card;

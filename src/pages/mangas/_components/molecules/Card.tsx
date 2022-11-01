/** @jsxImportSource solid-js */

import type { Component } from 'solid-js';
import Image from '../atoms/Image';

export type CardProps = {
  title: string;
  alt: string;
  src?: string;
};

const Card: Component<CardProps> = ({
  title,
  src = '/image/defaultCardImage.jpeg',
  alt,
}) => {
  return (
    <li class='flex flex-col space-y-2'>
      <Image src={src} alt={alt} />
      <span>{title}</span>
    </li>
  );
};

export default Card;

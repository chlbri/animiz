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
  src = '/images/defaultCardImage.jpeg',
  alt,
}) => {
  return (
    <li class='inline-block w-full xs:w-1/2 md:w-1/4 lg:w-1/6 xl:w-[10%] 2xl:w-1/12'>
      <div class='flex flex-col space-y-1.5'>
        <Image src={src} alt={alt} />
        <span class='font-bold pl-3'>{title}</span>
      </div>
    </li>
  );
};

export default Card;

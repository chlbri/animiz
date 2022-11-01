/** @jsxImportSource solid-js */

import { Accessor, Component, For } from 'solid-js';
import type { CardProps } from '../molecules/Card';
import Card from '../molecules/Card';

type Props = {
  title?: string;
  list?: Accessor<CardProps[]>;
};

const DEFAULT_CARDS: CardProps[] = [
  { alt: 'image', title: 'One Piece' },
  { alt: 'image', title: 'One Piece' },
  { alt: 'image', title: 'One Piece' },
  { alt: 'image', title: 'One Piece' },
  { alt: 'image', title: 'One Piece' },
  { alt: 'image', title: 'One Piece' },
  { alt: 'image', title: 'One Piece' },
  { alt: 'image', title: 'One Piece' },
  { alt: 'image', title: 'One Piece' },
  { alt: 'image', title: 'One Piece' },
  { alt: 'image', title: 'One Piece' },
  { alt: 'image', title: 'One Piece' },
];

const Section: Component<Props> = ({
  title = 'Trending',
  list = () => DEFAULT_CARDS,
}) => {
  return (
    <div class='flex flex-col space-y-2'>
      <h3 class='pl-2 text-lg font-semibold'>{title}</h3>
      <ul class='overflow-x-scroll overflow-y-hidden scrollbar-hide whitespace-nowrap space-x-6 justify-between'>
        <For each={list()}>{(props) => <Card {...props} />}</For>
      </ul>
    </div>
  );
};

export default Section;

/** @jsxImportSource solid-js */

import { Accessor, Component, For } from 'solid-js';
import type { CardProps } from '../molecules/Card';
import Card from '../molecules/Card';

type Props = {
  title?: string;
  cards?: Accessor<CardProps[]>;
};

const DEFAULT_CARDS: CardProps[] = [
  { alt: 'image', title: 'One Piece' },
  { alt: 'image', title: 'One Piece' },
  { alt: 'image', title: 'One Piece' },
  { alt: 'image', title: 'One Piece' },
  { alt: 'image', title: 'One Piece' },
];

const Section: Component<Props> = ({
  title = 'Trending',
  cards = () => DEFAULT_CARDS,
}) => {
  return (
    <div class='flex flex-col space-y-2'>
      <h3 class='pl-2 text-lg font-semibold'>{title}</h3>
      <ul class='flex overflow-x-auto scrollbar-hide w-full'>
        <For each={cards()}>{(props) => <Card {...props} />}</For>
      </ul>
    </div>
  );
};

export default Section;

/** @jsxImportSource solid-js */

import { Component, Show } from 'solid-js';
import type { RelatedsProps } from '~components/shared/types';
import { Relateds } from '../molecules/Relateds';

export type ReviewProps = {
  user?: string;

  date: string;
  relateds?: RelatedsProps;
  title: string;
  tags?: string[];
  action?: string;
  image?: string;
  summary?: string;
};

export const Review: Component<ReviewProps> = ({
  user,
  date,
  title,
  relateds,
  image,
  summary,
}) => {
  return (
    <article class='w-full flex flex-col space-y-3  bg-blue_input rounded-md'>
      <img
        src={image}
        alt="Review's image"
        class='object-cover w-full aspect-[5/2] rounded-t-md'
      />
      <div class='py-2 px-3 space-y-1 flex flex-col'>
        <h3 class='font-medium text-base'>{title}</h3>
        <span class='self-end text-xs'>{date}</span>
        <span class='italic'>
          <Show when={!summary} fallback={'Summary...'}>
            {summary}
          </Show>
        </span>
        <div class='flex justify-between text-xs items-center pt-2'>
          <h4 class='font-semibold'>{user}</h4>
          <Relateds {...relateds} />
        </div>
      </div>
    </article>
  );
};

/** @jsxImportSource solid-js */

import { Component, Show } from 'solid-js';
import { Relateds } from '../molecules/Relateds';
import { Tags } from '../molecules/Tags';

export type StatusForumProps = {
  user: {
    avatar?: string;
    name: string;
    id?: string;
  };
  date: string;
  relateds?: {
    likes?: string;
    vues?: string;
    comments?: string;
  };
  title: string;
  tags?: string[];
  action?: string;
};

export const StatusForum: Component<StatusForumProps> = ({
  user,
  date,
  title,
  tags,
  relateds,
  action,
}) => {
  return (
    <article class='w-full flex pt-2 px-4 pb-4 space-x-3 bg-blue_input rounded-md justify-between'>
      <div class='flex flex-col spac-y-3'>
        <h3 class='font-medium'>{title}</h3>
        <span class='flex space-x-2 mt-3 items-center text-xs'>
          <img src={user.avatar} alt={user.id} class='' />
          <span class='flex space-x-1 items-center'>
            <Show when={!action}>
              <span>By</span>
            </Show>
            <h4>{user.name}</h4>
            <Show when={!!action}>
              <span class='text-xs'>{action}</span>
            </Show>
          </span>
          <span>{date}</span>
        </span>
      </div>
      <div class='flex flex-col justify-between items-end'>
        <Relateds {...relateds} />
        <Tags {...{ tags }} />
      </div>
    </article>
  );
};

/** @jsxImportSource solid-js */

import type { Component } from 'solid-js';
import { Relateds } from '../molecules/Relateds';

export type StatusActionProps = {
  user: {
    avatar?: string;
    name?: string;
    id?: string;
  };
  date?: string;
  art: {
    label?: string;
    image?: string;
  };
  relateds?: {
    likes?: string;
    comments?: string;
  };
  action?: string;
};

export const StatusAction: Component<StatusActionProps> = ({
  user,
  date,
  art,
  relateds,
  action,
}) => {
  return (
    <article class='w-full flex space-x-3 bg-blue_input rounded-md'>
      <img
        src={art.image}
        alt='Manga'
        class='h-full aspect-[7/10] my-auto rounded-l-md'
      />
      <div class='flex flex-1 flex-col xs:flex-row pr-3 justify-between py-3 md:flex-col md:space-y-2 lg:space-y-0 lg:flex-row'>
        <div class='flex flex-col items-start'>
          <h3>{user.name}</h3>
          <span class='flex flex-col xs:flex-row xs:space-x-2  mt-1 xs:items-center'>
            <span class='text-xs'>{action}</span>
            <span class='text-cyan-600'>{art.label}</span>
          </span>
          <img src={user.avatar} alt={user.id} class='mt-2' />
        </div>
        <div class='flex flex-col xxs:flex-row xs:flex-col md:flex-row lg:flex-col justify-between md:items-center xs:items-end lg:items-end'>
          <span class='text-xs'>{date}</span>
          <Relateds {...relateds} />
        </div>
      </div>
    </article>
  );
};

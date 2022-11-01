/** @jsxImportSource solid-js */

import { Component, For } from 'solid-js';
import {
  StatusAction,
  StatusActionProps,
} from '../organisms/StatusAction';

type Props = {};

const LIST: StatusActionProps[] = [
  {
    art: {
      label: 'Naruto',
    },
    user: {
      id: '50',
      name: 'chlbri',
    },
    date: '2 minutes ago',
    action: 'Read chapter 1 -20 of',
    relateds: {
      comments: '10',
      likes: '3',
    },
  },
  {
    art: {
      label: 'Naruto',
    },
    user: {
      id: '50',
      name: 'chlbri',
    },
    date: '2 minutes ago',
    action: 'Read chapter 1 -20 of',
    relateds: { comments: '10', likes: '3' },
  },
  {
    art: {
      label: 'Naruto',
    },
    user: {
      id: '50',
      name: 'chlbri',
    },
    date: '2 minutes ago',
    action: 'Read chapter 1 -20 of',
    relateds: { comments: '10', likes: '3' },
  },
  {
    art: {
      label: 'Naruto',
    },
    user: {
      id: '50',
      name: 'chlbri',
    },
    date: '2 minutes ago',
    action: 'Read chapter 1 -20 of',
    relateds: { comments: '10', likes: '3' },
  },
  {
    art: {
      label: 'Naruto',
    },
    user: {
      id: '50',
      name: 'chlbri',
    },
    date: '2 minutes ago',
    action: 'Read chapter 1 -20 of',
    relateds: { comments: '10', likes: '3' },
  },
  {
    art: {
      label: 'Naruto',
    },
    user: {
      id: '50',
      name: 'chlbri',
    },
    date: '2 minutes ago',
    action: 'Read chapter 1 -20 of',
    relateds: { comments: '10', likes: '3' },
  },
  {
    art: {
      label: 'Naruto',
    },
    user: {
      id: '50',
      name: 'chlbri',
    },
    date: '2 minutes ago',
    action: 'Read chapter 1 -20 of',
    relateds: { comments: '10', likes: '3' },
  },
];

export const ActivitySummary: Component<Props> = ({}) => {
  return (
    <section class='w-full flex flex-col space-y-5 px-5'>
      <div class='flex justify-between px-3'>
        <h2>Activity</h2>
        <div class='flex space-x-3'>
          <h3>Following</h3>
          <h3>Global</h3>
        </div>
      </div>
      <div class='w-full flex flex-col space-y-4'>
        <For each={LIST}>{(item) => <StatusAction {...item} />}</For>
      </div>
    </section>
  );
};

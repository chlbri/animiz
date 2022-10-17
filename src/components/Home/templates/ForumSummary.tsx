/** @jsxImportSource solid-js */

import { Component, For } from 'solid-js';
import { Review, ReviewProps } from '../organisms/Review';
import { StatusForum, StatusForumProps } from '../organisms/StatusForum';

type Props = {};

const NOTIFS_LIST: StatusForumProps[] = [
  {
    user: {
      id: '50',
      name: 'chlbri',
    },
    date: '2 minutes ago',
    action: 'Replied',
    relateds: {
      comments: '10',
      vues: '3',
    },
    title: 'Naruto is amazing',
  },
  {
    user: {
      id: '50',
      name: 'chlbri',
    },
    date: '2 minutes ago',
    action: 'Replied',
    relateds: { comments: '10', vues: '3' },
    title: 'Naruto is amazing',
  },
  {
    user: {
      id: '50',
      name: 'chlbri',
    },
    date: '2 minutes ago',
    action: 'Replied',
    relateds: { comments: '10', vues: '3' },
    title: 'Naruto is amazing',
  },
  {
    user: {
      id: '50',
      name: 'chlbri',
    },
    date: '2 minutes ago',
    action: 'Replied',
    relateds: { comments: '10', vues: '3' },
    title: 'Naruto is amazing',
  },
  {
    user: {
      id: '50',
      name: 'chlbri',
    },
    date: '2 minutes ago',
    action: 'Replied',
    relateds: { comments: '10', vues: '3' },
    title: 'Naruto is amazing',
  },
  {
    user: {
      id: '50',
      name: 'chlbri',
    },
    date: '2 minutes ago',
    action: 'Replied',
    relateds: { comments: '10', vues: '3' },
    title: 'Naruto is amazing',
  },
];

const REVIEWS_LIST: ReviewProps[] = [
  {
    user: 'chlbri',
    date: 'a month ago',
    title: 'Review of One Piece',
    summary:
      'Ex quaerat nihil nisi minima molestiae in. Delectus distinctio sed distinctio voluptatem. Laboriosam voluptatibus maxime distinctio et. Ea quo natus. Magni corrupti omnis ipsa eveniet voluptatem rerum. Nemo in occaecati veritatis nisi consequatur accusamus.',
    relateds: {
      likes: '3',
    },
  },
  {
    user: 'chlbri',
    date: 'a month ago',
    title: 'Review of One Piece',
    summary:
      'Ex quaerat nihil nisi minima molestiae in. Delectus distinctio sed distinctio voluptatem. Laboriosam voluptatibus maxime distinctio et. Ea quo natus. Magni corrupti omnis ipsa eveniet voluptatem rerum. Nemo in occaecati veritatis nisi consequatur accusamus.',
    relateds: {
      likes: '3',
    },
  },
  {
    user: 'chlbri',
    date: 'a month ago',
    title: 'Review of One Piece',
    summary:
      'Ex quaerat nihil nisi minima molestiae in. Delectus distinctio sed distinctio voluptatem. Laboriosam voluptatibus maxime distinctio et. Ea quo natus. Magni corrupti omnis ipsa eveniet voluptatem rerum. Nemo in occaecati veritatis nisi consequatur accusamus.',
    relateds: {
      likes: '3',
    },
  },
  {
    user: 'chlbri',
    date: 'a month ago',
    title: 'Review of One Piece',
    summary:
      'Ex quaerat nihil nisi minima molestiae in. Delectus distinctio sed distinctio voluptatem. Laboriosam voluptatibus maxime distinctio et. Ea quo natus. Magni corrupti omnis ipsa eveniet voluptatem rerum. Nemo in occaecati veritatis nisi consequatur accusamus.',
    relateds: {
      likes: '3',
    },
  },
];

export const ForumSummary: Component<Props> = ({}) => {
  return (
    <aside class='w-full flex flex-col space-y-10  px-5'>
      <section class='flex flex-col space-y-5'>
        <h2 class='ml-3'>Forum Activity</h2>
        <div class='w-full flex flex-col space-y-4'>
          <For each={NOTIFS_LIST}>
            {(item) => <StatusForum {...item} />}
          </For>
        </div>
      </section>

      <section class='flex flex-col space-y-5'>
        <h2 class='ml-3'>Recent Reviews</h2>
        <div class='grid grid-cols-1 xs:grid-cols-2 gap-4'>
          <For each={REVIEWS_LIST}>{(item) => <Review {...item} />}</For>
        </div>
      </section>
    </aside>
  );
};

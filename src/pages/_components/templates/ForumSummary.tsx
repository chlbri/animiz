/** @jsxImportSource solid-js */

import { Component, For } from 'solid-js';
import { Review } from '../organisms/Review';
import { StatusForum } from '../organisms/StatusForum';
import { NOTIFS_LIST, REVIEWS_LIST } from './ForumSummary.data';

type Props = {};

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

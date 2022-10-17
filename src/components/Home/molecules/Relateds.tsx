/** @jsxImportSource solid-js */

import { Component, Show } from 'solid-js';
import { CommentIcon } from '~components/shared/atoms/icons/Comment';
import { LikeIcon } from '~components/shared/atoms/icons/Like';
import { VueIcon } from '~components/shared/atoms/icons/Vue';

type Props = {
  vues?: string;
  likes?: string;
  comments?: string;
};

export const Relateds: Component<Props> = ({ vues, likes, comments }) => {
  return (
    <span class='flex space-x-3 items-center'>
      <Show when={!!vues}>
        <span class='flex space-x-1 items-center'>
          <VueIcon class='w-4 h-4' />
          <span>{vues}</span>
        </span>
      </Show>
      <Show when={!!comments}>
        <span class='flex space-x-1 items-center'>
          <CommentIcon class='w-4 h-4' />
          <span>{comments}</span>
        </span>
      </Show>
      <Show when={!!likes}>
        <span class='flex space-x-1 items-center'>
          <LikeIcon class='w-4 h-4' />
          <span>{likes}</span>
        </span>
      </Show>
    </span>
  );
};

/** @jsxImportSource solid-js */

import { Component, For } from 'solid-js';
import { Tag } from '../atoms/Tag';

type Props = {
  tags?: string[];
};

export const Tags: Component<Props> = ({ tags }) => {
  return (
    <div class='flex space-x-2'>
      {/* //TODO: if not enough width show just circle */}
      <For each={tags}>{(tag) => <Tag>{tag}</Tag>}</For>
    </div>
  );
};

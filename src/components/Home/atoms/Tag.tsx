/** @jsxImportSource solid-js */

import type { Component } from 'solid-js';

type Props = {
  children: string;
};

export const Tag: Component<Props> = (props) => {
  return <h6 {...props} />;
};

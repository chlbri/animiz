/** @jsxImportSource solid-js */

import type { Component } from 'solid-js';

type Props = {};

export const MainFooter: Component<Props> = ({}) => {
  return (
    <footer class='bg-black py-8 text-center text-white mt-20'>
      <div class='max-w-7xl mx-auto'>
        Copyright beme.dev &copy; 2022. All rights reserved.
      </div>
    </footer>
  );
};

/** @jsxImportSource solid-js */

import { Component, For, onMount } from 'solid-js';
import { NavLink } from '../atoms/NavLink';
import { LIST } from './NavItems.data';

type Props = {
};

export const NavItems: Component<Props> = ({  }) => {
  onMount(() => {
    console.log(window.location.pathname);
  });

  return (
    <nav class='flex space-x-12 font-family-overpass items-center text-sm'>
      <For each={LIST}>
        {(item) => (
          <NavLink {...item}  />
        )}
      </For>
    </nav>
  );
};

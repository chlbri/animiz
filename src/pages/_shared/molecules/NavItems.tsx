/** @jsxImportSource solid-js */

import { Component, For } from 'solid-js';
import { NavLink } from '../atoms/NavLink';

const LIST = ['Home', 'Profile', 'Animes', 'Mangas'];

type Props = {};

export const NavItems: Component<Props> = ({}) => {
  return (
    <nav class='flex space-x-12 font-family-overpass items-center text-sm'>
      <For each={LIST}>{(item) => <NavLink>{item}</NavLink>}</For>
    </nav>
  );
};

/** @jsxImportSource solid-js */

import type { Component } from 'solid-js';
import { Avatar } from '../atoms/Avatar';
import { SearchIcon } from '../atoms/icons/Search';
import { NavItems } from '../molecules/NavItems';

type Props = {};

export const NavHeader: Component<Props> = ({}) => {
  return (
    <header class='w-full h-14 bg-blue_black flex items-center px-10 text-gray-400 justify-center'>
      <div class='flex w-full justify-between max-w-7xl'>
        <span></span>
        <NavItems />
        <div class='space-x-5 flex items-center'>
          <button>
            <SearchIcon class='w-5 h-5' />
          </button>
          <Avatar open={() => true} />
        </div>
      </div>
    </header>
  );
};

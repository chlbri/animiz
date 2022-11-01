/** @jsxImportSource solid-js */

import type { Component } from 'solid-js';
import FilterAiringStatus from '../molecules/FilterAiring';
import FilterFormats from '../molecules/FilterFormats';
import FilterGenres from '../molecules/FilterGenres';
import FilterText from '../molecules/FilterText';
import FilterYears from '../molecules/FilterYears';

type Props = {};

const SearchBar: Component<Props> = ({}) => {
  return (
    <div class='flex w-full space-x-8 justify-center'>
      <FilterText />
      <FilterGenres />
      <FilterYears />
      <FilterFormats />
      <FilterAiringStatus />
    </div>
  );
};

export default SearchBar;

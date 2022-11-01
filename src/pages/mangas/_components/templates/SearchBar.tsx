/** @jsxImportSource solid-js */

import type { Component } from 'solid-js';
import FilterAiringStatus from '../organisms/FilterAiring';
import FilterCountries from '../organisms/FilterCountries';
import FilterFormats from '../organisms/FilterFormats';
import FilterGenres from '../organisms/FilterGenres';
import FilterText from '../organisms/FilterText';
import FilterYears from '../organisms/FilterYears';

type Props = {};

const SearchBar: Component<Props> = ({}) => {
  return (
    <div class='flex w-full space-x-8 justify-center'>
      <FilterText />
      <FilterGenres />
      <FilterYears />
      <FilterFormats />
      <FilterAiringStatus />
      <FilterCountries />
    </div>
  );
};

export default SearchBar;

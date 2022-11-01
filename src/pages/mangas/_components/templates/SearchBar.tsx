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
    <div class='grid xl:grid-cols-6 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 w-full gap-x-8 gap-y-6 justify-items-center'>
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

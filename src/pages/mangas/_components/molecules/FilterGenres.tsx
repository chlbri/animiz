/** @jsxImportSource solid-js */

import type { Component } from 'solid-js';
import useDefaultDropdownFilter from '~hooks/defaultFilter';
import GenreIcon from '~shared/atoms/icons/Genre';
import { DropdownFilter } from '~shared/organisms/DropdownFilter';

type Props = {};

const FilterGenres: Component<Props> = ({}) => {
  const props = useDefaultDropdownFilter(
    'Action',
    'Adventure',
    'Comedy',
    'Drama',
    'Ecchi',
    'Fantasy',
    'Hentai',
    'Horror',
    'Mahou Shoujo',
    'Mecha',
    'Music',
    'Mystery',
    'Psychological',
    'Romance',
    'Sci-Fi',
    'Slice of Life',
    'Sports',
    'Supernatural',
    'Thriller'
  );
  return (
    <DropdownFilter name='genres' label='Genres' {...props}>
      <GenreIcon class='w-5 aspect-square stroke-slate-100' />
    </DropdownFilter>
  );
};

export default FilterGenres;

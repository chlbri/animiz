/** @jsxImportSource solid-js */

import type { Component } from 'solid-js';
import useDefaultDropdownFilter from '~hooks/defaultFilter';
import FormatIcon from '~shared/atoms/icons/Format';
import { DropdownFilter } from '~shared/organisms/DropdownFilter';

type Props = {};

const FilterFormats: Component<Props> = ({}) => {
  const props = useDefaultDropdownFilter(
    'TV',
    'TV SHORT',
    'MOVIE',
    'SPECIAL',
    'OVA',
    'ONA',
    'MUSIC',
    'MANGA',
    'NOVEL',
    'ONE SHOT'
  );
  return (
    <DropdownFilter name='format' label='Formats' {...props}>
      <FormatIcon class='w-5 aspect-square stroke-slate-100' />
    </DropdownFilter>
  );
};

export default FilterFormats;

/** @jsxImportSource solid-js */

import type { Component } from 'solid-js';
import useDefaultDropdownFilter from '~hooks/defaultFilter';
import FormatIcon from '~shared/atoms/icons/Format';
import { DropdownFilter } from '~shared/organisms/DropdownFilter';

type Props = {};

const VALUES = [
  'TV',
  'TV SHORT',
  'MOVIE',
  'SPECIAL',
  'OVA',
  'ONA',
  'MUSIC',
  'MANGA',
  'NOVEL',
  'ONE SHOT',
] as const;

function queryMapper(value: typeof VALUES[number]) {
  if (value === 'TV SHORT') return 'TV_SHORT';
  if (value === 'ONE SHOT') return 'ONE_SHOT';
  return value;
}

const FilterFormats: Component<Props> = ({}) => {
  const props = useDefaultDropdownFilter(...VALUES);
  return (
    <DropdownFilter name='format' label='Formats' {...props}>
      <FormatIcon class='w-5 aspect-square stroke-slate-100' />
    </DropdownFilter>
  );
};

export default FilterFormats;

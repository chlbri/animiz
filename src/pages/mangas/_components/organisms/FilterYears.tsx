/** @jsxImportSource solid-js */

import type { Component } from 'solid-js';
import useDefaultDropdownFilter from '~hooks/defaultFilter';
import YearIcon from '~shared/atoms/icons/Year';
import { DropdownFilter } from '~shared/organisms/DropdownFilter';

type Props = {};

const FilterYears: Component<Props> = ({}) => {
  const props = useDefaultDropdownFilter(
    ...(Array.from({ length: 130 }, (_, i) => i + 1901 + '') as [
      string,
      ...string[]
    ])
  );
  return (
    <DropdownFilter name='years' label='Year' {...props}>
      <YearIcon class='w-5 aspect-square stroke-slate-100' />
    </DropdownFilter>
  );
};

export default FilterYears;

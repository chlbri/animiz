/** @jsxImportSource solid-js */

import type { Component } from 'solid-js';
import useDefaultDropdownFilter from '~hooks/defaultFilter';
import WorldIcon from '~shared/atoms/icons/World';
import { DropdownFilter } from '~shared/organisms/DropdownFilter';

type Props = {};

const FilterCountries: Component<Props> = ({}) => {
  const props = useDefaultDropdownFilter(
    'Japan',
    'South Korea',
    'China',
    'Taiwan'
  );

  return (
    <DropdownFilter name='country' label='Country' {...props}>
      <WorldIcon class='w-5 aspect-square stroke-slate-100' />
    </DropdownFilter>
  );
};

export default FilterCountries;

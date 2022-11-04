/** @jsxImportSource solid-js */

import type { Component } from 'solid-js';
import useDefaultDropdownFilter from '~hooks/defaultFilter';
import { COUNTRY_CODES } from '~services/constants';
import WorldIcon from '~shared/atoms/icons/World';
import { DropdownFilter } from '~shared/organisms/DropdownFilter';

type Props = {};

type Codes = typeof COUNTRY_CODES;
type Keys = keyof Codes;
type Values = Codes[Keys];

function queryMapper<T extends Values>(value: T) {
  const entries = Object.entries(COUNTRY_CODES) as [Keys, Values][];
  const out = entries.find(([_, val]) => val === value)?.[0];
  return out ?? 'Any';
}

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

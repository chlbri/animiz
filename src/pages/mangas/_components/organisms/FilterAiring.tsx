/** @jsxImportSource solid-js */

import type { TuplifyUnion } from '@bemedev/decompose';
import type { Component } from 'solid-js';
import useDefaultDropdownFilter from '~hooks/defaultFilter';
import BroadCastIcon from '~shared/atoms/icons/Broadcast';
import { DropdownFilter } from '~shared/organisms/DropdownFilter';

type Props = {};

const VALUES = {
  RELEASING: 'Releasing',
  FINISHED: 'Finished',
  NOT_YET_RELEASED: 'Not Yet Released',
  CANCELLED: 'Cancelled',
} as const;

type Codes = typeof VALUES;
type Keys = keyof Codes;
type Values = Codes[Keys];

function queryMapper(value: Values) {
  const entries = Object.entries(VALUES) as [Keys, Values][];
  const out = entries.find(([_, val]) => val === value)?.[0];
  return out ?? 'Any';
}

const FilterAiringStatus: Component<Props> = ({}) => {
  const values = Object.values(VALUES) as TuplifyUnion<Values>;
  const props = useDefaultDropdownFilter(...values);
  return (
    <DropdownFilter name='airing' label='Airing Status' {...props}>
      <BroadCastIcon class='w-5 aspect-square stroke-slate-100' />
    </DropdownFilter>
  );
};

export default FilterAiringStatus;

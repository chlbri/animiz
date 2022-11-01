/** @jsxImportSource solid-js */

import type { Component } from 'solid-js';
import useDefaultDropdownFilter from '~hooks/defaultFilter';
import BroadCastIcon from '~shared/atoms/icons/Broadcast';
import { DropdownFilter } from '~shared/organisms/DropdownFilter';

type Props = {};

const FilterAiringStatus: Component<Props> = ({}) => {
  const props = useDefaultDropdownFilter(
    'Airing',
    'Finished',
    'Not Yet Aired',
    'Cancelled'
  );
  return (
    <DropdownFilter name='airing' label='Airing Status' {...props}>
      <BroadCastIcon class='w-5 aspect-square stroke-slate-100' />
    </DropdownFilter>
  );
};

export default FilterAiringStatus;

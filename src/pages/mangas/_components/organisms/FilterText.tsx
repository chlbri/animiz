/** @jsxImportSource solid-js */

import { Component, createSignal } from 'solid-js';
import { SearchIcon } from '~shared/atoms/icons/Search';
import TextInput from '~shared/molecules/TextInput';

type Props = {};

const FilterTitle: Component<Props> = ({}) => {
  const [current, filter] = createSignal('');
  const settt = (value: string) => {
    const test = /[a-z]+$/i.test(value);
    if (test) filter(value);
  };
  return (
    <TextInput current={current} filter={settt} name='text' label='Search'>
      <SearchIcon class='aspect-square w-5' />
    </TextInput>
  );
};

export default FilterTitle;

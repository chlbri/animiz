/** @jsxImportSource solid-js */

import type { Accessor, Component } from 'solid-js';
import type { CardProps } from '../molecules/Card';
import Section from '../organisms/Section';

//TODO
type Filters = {};

type Props = {
  filters: Accessor<boolean>;
  list?: Accessor<CardProps[]>;
};

const Filtereds: Component<Props> = ({}) => {
  return (
    <section class='flex flex-col space-y-8 '>
      <Section />
      <Section title='Next Season' />
      <Section title='Upcoming' />
    </section>
  );
};

export default Filtereds;

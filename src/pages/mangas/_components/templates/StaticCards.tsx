/** @jsxImportSource solid-js */

import type { Component } from 'solid-js';
import Section from '../organisms/Section';

type Props = {};

const StaticCards: Component<Props> = ({}) => {
  return (
    <section class='flex flex-col space-y-8 '>
      <Section />
      <Section title='Next Season' />
      <Section title='Upcoming' />
    </section>
  );
};

export default StaticCards;

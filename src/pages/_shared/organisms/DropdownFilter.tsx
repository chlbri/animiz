/** @jsxImportSource solid-js */

import { Accessor, Component, For, JSX } from 'solid-js';
import clickOutsideHandler from '~hooks/directives/clickOutsideHandler';
import { ArrowToggle } from '../molecules/ArrowToggle';
clickOutsideHandler;

type Props = {
  current: Accessor<string>;
  toggle: (value?: boolean) => void;
  canBeOpened: Accessor<boolean>;
  list: Accessor<readonly string[]>;
  filter: (input: string) => void;
  label: string;
  name: string;
  children: JSX.Element;
};

declare module 'solid-js' {
  namespace JSX {
    interface Directives {
      clickOutsideHandler: (event?: MouseEvent) => void;
    }
  }
}

export const DropdownFilter: Component<Props> = ({
  current,
  toggle,
  canBeOpened,
  list,
  filter,
  label,
  name,
  children,
}) => {
  const isCurrent = (input: string) => current() === input;

  return (
    <div
      use:clickOutsideHandler={() => toggle(false)}
      class='relative max-w-max cursor-pointer flex flex-col space-y-2'
    >
      <label class='pl-2' for={name}>
        {label}
      </label>
      <button
        onClick={() => {
          toggle();
        }}
        class='w-40 text-left py-1 flex h-9 px-2 bg-blue_input shadow-xl rounded-lg items-center justify-between'
      >
        {children}
        <div class='text-sm'>{current()}</div>
        <ArrowToggle open={canBeOpened} class='w-5 aspect-square' />
      </button>
      <ul
        class='px-6 py-3 text-sm space-y-3 shadow-md bg-blue_input text-slate-200 z-10 list-none rounded-b-lg absolute top-[102%] rounded-xl flex-col opacity-0 transition-opacity duration-300 ease-out pointer-events-none backdrop:blur-sm max-h-60 scrollbar-hide overflow-y-auto w-full'
        classList={{
          'opacity-90 pointer-events-auto': canBeOpened(),
        }}
        id={name}
      >
        <For each={list()}>
          {(input) => (
            <li
              class='cursor-pointer transition hover:text-violet-400'
              onclick={() => {
                filter(input);
                toggle();
              }}
              classList={{
                'text-indigo-500': isCurrent(input),
              }}
            >
              {input}
            </li>
          )}
        </For>
      </ul>
    </div>
  );
};

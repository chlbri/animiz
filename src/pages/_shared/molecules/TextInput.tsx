/** @jsxImportSource solid-js */

import type { Accessor, ParentComponent } from 'solid-js';

type Props = {
  filter: (input: string) => any;
  current: Accessor<string>;
  label: string;
  name: string;
};

const TextInput: ParentComponent<Props> = ({
  filter,
  current,
  children,
  label,
  name,
}) => {
  let ref: HTMLInputElement;
  return (
    <div class='flex flex-col space-y-2'>
      <label class='pl-2' for={name}>
        {label}
      </label>
      <div class='pr-3 w-40 h-9 py-1 rounded-lg flex space-x-2 items-center bg-blue_input text-slate-300 border border-transparent focus-within:border-indigo-800 [&:has(input:invalid)]:border-red-400'>
        <input
          ref={ref!}
          onInput={(event) => {
            const input = event.currentTarget.value;
            filter(input);
            ref.value = current();
          }}
          class='pl-3 bg-transparent outline-none w-full'
          id={name}
          name={name}
        />
        {children}
      </div>
    </div>
  );
};

export default TextInput;

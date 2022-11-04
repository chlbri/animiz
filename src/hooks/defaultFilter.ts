import { createSignal } from 'solid-js';

export default function useDefaultDropdownFilter<
  T extends readonly [string, ...string[]]
>(...list: T) {
  const [canBeOpened, setCanBeOpened] = createSignal(false);
  const toggle = (defaultValue?: boolean) => {
    return setCanBeOpened((bool) =>
      defaultValue !== undefined ? defaultValue : !bool
    );
  };
  const [current, filter] = createSignal('Any');
  const _list = [...list];
  _list.unshift('Any');

  return {
    canBeOpened,
    toggle,
    current,
    filter,
    list: () => _list as ['Any', ...T],
  };
}

import { Accessor, onCleanup, onMount } from 'solid-js';

export default function clickOutsideHandler<T extends Element>(
  ref: T,
  handler: (event?: MouseEvent) => Accessor<void>
) {
  const func = (event: MouseEvent) => {
    const check = !ref.contains(event.target as Element);
    if (check) handler(event)();
  };

  onMount(() => document.addEventListener('click', func));
  onCleanup(() => document.removeEventListener('click', func));
}

import { createSignal, onMount } from 'solid-js';

export default function useWindowLocation() {
  const [pathName, setPathName] = createSignal('');

  onMount(() => {
    setPathName(window.location.pathname);
  });

  return pathName;
}

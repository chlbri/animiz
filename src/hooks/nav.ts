import { createMemo } from 'solid-js';
import useWindowLocation from './location';

export default function useNav(href?: string) {
  const pathName = useWindowLocation();
  const isCurrent = createMemo(() => pathName() === href);
  const _href = createMemo(() => (isCurrent() ? undefined : href));

  return { isCurrent, href: _href } as const;
}

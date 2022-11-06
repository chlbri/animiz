import type { NavLinkProps } from '~shared/atoms/NavLink';

export const LIST: NavLinkProps[] = [
  {
    children: 'Home',
    href: '/',
  },
  {
    children: 'Profile',
  },
  {
    children: 'Anime',
  },
  {
    children: 'Mangas',
    href: '/mangas',
  },
  {
    children: '__test__',
    href: '/test/drag',
  },
];

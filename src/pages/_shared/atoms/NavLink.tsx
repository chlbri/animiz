/** @jsxImportSource solid-js */

import type { Component } from 'solid-js';
import useNav from '~hooks/nav';

export type NavLinkProps = {
  children: string;
  href?: string;
};

export const NavLink: Component<NavLinkProps> = ({
  href: _href,
  ...props
}) => {
  const { href, isCurrent } = useNav(_href);
  return (
    <a
      {...props}
      href={href()}
      class='cursor-pointer select-none'
      classList={{
        'scale-105 underline text-blue-300': isCurrent(),
      }}
    />
  );
};

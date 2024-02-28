import Link from 'next/link';
import { navbarEnum } from '@/enums/navbar';
import { ReactElement } from 'react';

type NavbarLinkType = {
  href: string;
  selected: string;
  whoIs: navbarEnum;
  textContent: string;
};

export const NavbarLink = ({ href, selected, whoIs, textContent }: NavbarLinkType): ReactElement => {
  const isActiveClass = selected === whoIs ? 'border-b-2 border-cyan-50' : '';

  return (
    <Link href={href} className={`p-4 py-2 text-xl ${isActiveClass}`}>
      {textContent}
    </Link>
  );
};

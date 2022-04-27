import Link from 'next/link';
import { navbarEnum } from '@/enums/navbar';

type NavbarLinkType = {
  href: string;
  selected: string;
  whoIs: navbarEnum;
  textContent: string;
};

export const NavbarLink = ({ href, selected, whoIs, textContent }: NavbarLinkType) => {
  const isActiveClass = selected === whoIs ? 'border-b-2 border-cyan-50' : '';

  return (
    <Link href={href} passHref>
      <a href="#/" className={`p-4 py-2 text-xl ${isActiveClass}`}>
        {textContent}
      </a>
    </Link>
  );
};

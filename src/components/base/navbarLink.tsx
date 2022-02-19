import Link from 'next/link';
import navbarEnum from '@/interfaces/navbar';

type NavbarLinkType = {
  href: string;
  selected: string;
  whoIs: navbarEnum;
  textContent: string;
};

const NavbarLink = ({ href, selected, whoIs, textContent }: NavbarLinkType) => {
  const isActiveClass = selected === whoIs ? 'border-b-2 border-cyan-50' : '';

  return (
    <Link href={href} passHref>
      <a href="#/" className={`p-2 text-xl ${isActiveClass}`}>
        {textContent}
      </a>
    </Link>
  );
};

export default NavbarLink;

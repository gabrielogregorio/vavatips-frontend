import Link from 'next/link';
import { MdOutlineLightMode, MdOutlineNightlight } from 'react-icons/md';
import { Button } from '@/base/button';
import { NavbarLink } from '@/base/navbarLink';
import { useTheme } from '@/contexts/theme';
import { modelNavbarType } from '@/schemas/navbar';
import { navbarEnum } from '@/enums/navbar';
import { changeTheme } from '@/services/theme';

type NavbarPropsNavbarBasicType = {
  selected: navbarEnum;
  modelNavbar: modelNavbarType[];
};

export const Navbar = ({ selected, modelNavbar }: NavbarPropsNavbarBasicType) => {
  const { theme, setTheme } = useTheme();

  const handleNavbar = () => {
    if (theme === 'dark') {
      changeTheme('light');
      setTheme('light');
    } else if (theme === 'light') {
      changeTheme('dark');
      setTheme('dark');
    }
  };

  const renderMenuItems = () =>
    modelNavbar.map((model) => (
      <div key={model.text} className="mb-4">
        <NavbarLink href={model.url} selected={selected} whoIs={model.url} textContent={model.text} />
      </div>
    ));

  return (
    <nav className="flex flex-col items-center justify-center w-full p-5 pl-10 pr-10 dark:bg-skin-gray-900 bg-skin-secondary-light sm:flex-row text-skin-white">
      <Link href="/" passHref>
        <a href="#/" className="text-left text-4xl border-none font-bold mb-2 sm:flex-1">
          VAVATIPS
        </a>
      </Link>

      {renderMenuItems()}

      <div className="border-b-8 border-transparent">
        <Button onClick={() => handleNavbar()} className=" ml-5 text-xl h-full">
          {theme === 'dark' ? <MdOutlineLightMode /> : null}
          {theme === 'light' ? <MdOutlineNightlight /> : null}
        </Button>
      </div>
    </nav>
  );
};

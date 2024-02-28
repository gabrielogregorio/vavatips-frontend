import Link from 'next/link';
import { MdOutlineLightMode, MdOutlineNightlight } from 'react-icons/md';
import { Button } from '@/base/button';
import { NavbarLink } from '@/base/navbarLink';
import { useTheme } from '@/contexts/theme';
import { modelNavbarType } from '@/schemas/navbar';
import { navbarEnum } from '@/enums/navbar';
import { changeTheme } from '@/services/theme';
import { ReactElement } from 'react';

type NavbarPropsNavbarBasicType = {
  selected: navbarEnum;
  modelNavbar: modelNavbarType[];
};

export const Navbar = ({ selected, modelNavbar }: NavbarPropsNavbarBasicType): ReactElement => {
  const { theme, setTheme } = useTheme();

  const handleNavbar = (): void => {
    if (theme === 'dark') {
      changeTheme('light');
      setTheme('light');
    } else if (theme === 'light') {
      changeTheme('dark');
      setTheme('dark');
    }
  };

  const renderMenuItems = (): ReactElement[] =>
    modelNavbar.map((model) => (
      <div key={model.text} className="mb-4">
        <NavbarLink href={model.url} selected={selected} whoIs={model.url} textContent={model.text} />
      </div>
    ));

  return (
    <nav className="flex flex-col items-center justify-center w-full p-5 pl-10 pr-10 dark:bg-skin-gray-900 bg-skin-secondary-light sm:flex-row text-skin-white">
      <Link href="/" className="text-left text-3xl border-none font-bold mb-2 sm:flex-1">
        VALORANT TIPS
      </Link>

      {renderMenuItems()}

      <div className="border-b-8 border-transparent">
        <Button onClick={(): void => handleNavbar()} className=" ml-5 text-xl h-full" ariaLabel="Trocar tema">
          {theme === 'dark' ? <MdOutlineLightMode className="w-10 h-10 p-2" /> : null}
          {theme !== 'dark' ? <MdOutlineNightlight className="w-10 h-10 p-2" /> : null}
        </Button>
      </div>
    </nav>
  );
};

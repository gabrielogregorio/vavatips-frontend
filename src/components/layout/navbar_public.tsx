import Link from 'next/link';
import { navbarEnumPublic, NavbarPropsPublicComponent } from '@/interfaces/navbar';
import { MdOutlineLightMode, MdOutlineNightlight } from 'react-icons/md';
import styles from '../../styles/components/navbar.public.module.css';
import Button from '../base/button';
import { useTheme } from '../../core/contexts/theme';

export default function NavbarComponentPublic({ selected }: NavbarPropsPublicComponent) {
  const { theme, setTheme } = useTheme();

  const handleNavbar = () => {
    if (theme === 'dark') {
      setTheme('light');
    } else if (theme === 'light') {
      setTheme('dark');
    }
  };

  return (
    <nav className={styles.nav}>
      <ul>
        <Link href="/">
          <a className={styles.logo}>VAVATIPS</a>
        </Link>

        <Link href="/">
          <a className={selected === navbarEnumPublic.Inicio ? styles.navActive : ''}>inicio</a>
        </Link>

        <Link href="/posts">
          <a className={selected === navbarEnumPublic.Posts ? styles.navActive : ''}>posts</a>
        </Link>

        <Link href="/save">
          <a className={selected === navbarEnumPublic.Save ? styles.navActive : ''}>salvos</a>
        </Link>

        <Link href="/tested">
          <a className={selected === navbarEnumPublic.Tested ? styles.navActive : ''}>testados</a>
        </Link>

        <Button onClick={() => handleNavbar()} className={styles.theme}>
          {theme === 'dark' ? <MdOutlineLightMode /> : null}
          {theme === 'light' ? <MdOutlineNightlight /> : null}
        </Button>
      </ul>
    </nav>
  );
}

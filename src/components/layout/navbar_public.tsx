import Link from 'next/link';
import { navbarEnumPublic } from '../../interfaces/navbar';
import styles from '../../styles/components/navbar.public.module.css';

interface NavbarProps {
  selected: navbarEnumPublic;
}

export default function NavbarComponentPublic({ selected }: NavbarProps) {
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
      </ul>
    </nav>
  );
}

import Link from 'next/link';
import { navbarEnum } from '../../interfaces/navbar';
import styles from '../../styles/components/navbar.module.css';

interface NavbarProps {
  selected: navbarEnum;
}

export default function NavbarComponent({ selected }: NavbarProps) {
  return (
    <nav className={styles.nav}>
      <ul>
        <Link href="/">
          <a className={styles.logo}>VAVATIPS</a>
        </Link>

        <Link href="/admin/dashboard">
          <a className={selected === navbarEnum.Dashboard ? styles.navActive : ''}>dashboard</a>
        </Link>

        <Link href="/admin/post-create">
          <a className={selected === navbarEnum.PostCreate ? styles.navActive : ''}>criar posts</a>
        </Link>

        <Link href="/admin/view-posts">
          <a className={selected === navbarEnum.ViewPosts ? styles.navActive : ''}>posts</a>
        </Link>

        <Link href="/admin/suggestions">
          <a className={selected === navbarEnum.SuggestionScreen ? styles.navActive : ''}>sugestões</a>
        </Link>

        <Link href="/admin/profile">
          <a className={selected === navbarEnum.Profile ? styles.navActive : ''}>perfil</a>
        </Link>
      </ul>
    </nav>
  );
}

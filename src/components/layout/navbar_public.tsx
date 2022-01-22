import Link from 'next/link';
import styles from '../../styles/components/navbar.public.module.css';

export enum navbarEnumPublic {
  Inicio = '/Inicio',
  Posts = '/posts',
  Save = '/save',
  Tested = '/tested',
  Mistic = '#',
}

interface NavbarProps {
  selected: navbarEnumPublic;
  agent?: string;
  map?: string;
}

export const NavbarComponentPublic = (props: NavbarProps) => {
  return (
    <nav className={styles.nav}>
      <ul>
        <Link href="/">
          <a className={styles.logo}>VAVATIPS</a>
        </Link>

        <Link href="/">
          <a
            className={
              props.selected === navbarEnumPublic.Inicio ? styles.navActive : ''
            }>
            inicio
          </a>
        </Link>

        <Link href={`/posts`}>
          <a
            className={
              props.selected === navbarEnumPublic.Posts ? styles.navActive : ''
            }>
            posts
          </a>
        </Link>

        {
          <Link href={`/save`}>
            <a
              className={
                props.selected === navbarEnumPublic.Save ? styles.navActive : ''
              }>
              salvos
            </a>
          </Link>
        }

        {
          <Link href={`/tested`}>
            <a
              className={
                props.selected === navbarEnumPublic.Tested
                  ? styles.navActive
                  : ''
              }>
              testados
            </a>
          </Link>
        }
      </ul>
    </nav>
  );
};

import Link from 'next/link';
import styles from '../../styles/components/navbar.module.css';

export enum navbarEnum {
  Profile = '/Profile',
  PostCreate = '/PostCreate',
  ViewPosts = '/ViewPosts',
  Config = '/Config',
  EditScreen = '#',
  ReportScreen = '/Reports',
  SuggestionScreen = '/Suggestions',
  Dashboard = '/Dashboard',
}

interface NavbarProps {
  selected: navbarEnum;
}

export const NavbarComponent = (props: NavbarProps) => {
  return (
    <nav className={styles.nav}>
      <ul>
        <Link href="/">
          <a className={styles.logo}>VAVATIPS</a>
        </Link>

        <Link href="/admin/dashboard">
          <a
            className={
              props.selected === navbarEnum.Dashboard ? styles.navActive : ''
            }>
            dashboard
          </a>
        </Link>

        <Link href="/admin/post-create">
          <a
            className={
              props.selected === navbarEnum.PostCreate ? styles.navActive : ''
            }>
            criar posts
          </a>
        </Link>

        <Link href="/admin/view-posts">
          <a
            className={
              props.selected === navbarEnum.ViewPosts ? styles.navActive : ''
            }>
            posts
          </a>
        </Link>

        <Link href="/admin/suggestions">
          <a
            className={
              props.selected === navbarEnum.SuggestionScreen
                ? styles.navActive
                : ''
            }>
            sugestões
          </a>
        </Link>

        <Link href="/admin/profile">
          <a
            className={
              props.selected === navbarEnum.Profile ? styles.navActive : ''
            }>
            perfil
          </a>
        </Link>
      </ul>
    </nav>
  );
};

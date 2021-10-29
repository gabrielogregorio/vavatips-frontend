import React from "react";
import { Link } from 'react-router-dom'
import styles from './navbar.module.css'

export enum navbarEnumPublic {
  Inicio = '/Inicio',
  Posts = '/Posts',
  Save = '/Save',
  Tested = '/Tested',
  Mistic = '#'
}

interface NavbarProps {
  selected: navbarEnumPublic,
  agent?: string,
  map?: string
}

export const NavbarComponentPublic = (props:NavbarProps) => {

  return (
    <nav className={styles.nav}>
      <ul>
        <Link
          className={styles.logo}
          to="/">VAVATIPS</Link>

        <Link
          className={props.selected === navbarEnumPublic.Inicio ? styles.navActive : ""}
          to="/">inicio</Link>

        <Link
          className={props.selected === navbarEnumPublic.Posts ? styles.navActive : ""}
          to={`/Posts`}>posts</Link>

        {<Link
          className={props.selected === navbarEnumPublic.Save ? styles.navActive : ""}
          to={`/Save`}>salvos</Link>}

        {<Link
          className={props.selected === navbarEnumPublic.Tested ? styles.navActive : ""}
          to={`/Tested`}>testados</Link>}


        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://discord.gg/HXWASJXQ">Discord</a>

        {/* <Link
          className={props.selected === navbarEnumPublic.Tested ? styles.navActive : ""}
          to={`/Posts?type=Tested&agent=${props.agent ?? ''}&map=${props.map ?? ''}`}>testado</Link> */}
      </ul>
    </nav>
  )
}

import React from "react";
import { Link } from 'react-router-dom'
import styles from './navbar.module.css'

export enum navbarEnumPublic {
  Inicio = '/Inicio',
  Posts = '/Posts',
  Save = '/Save',
  Tested = '/Tested',
  Admin = '/'
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
          className={props.selected === navbarEnumPublic.Inicio ? styles.navActive : ""}
          to="/">inicio</Link>

        <Link
          className={props.selected === navbarEnumPublic.Posts ? styles.navActive : ""}
          to={`/Posts?agent=${props.agent ?? ''}&map=${props.map ?? ''}`}>posts</Link>

        <Link
          className={props.selected === navbarEnumPublic.Save ? styles.navActive : ""}
          to={`/Posts?type=Save&agent=${props.agent ?? ''}&map=${props.map ?? ''}`}>salvos</Link>

        <Link
          className={props.selected === navbarEnumPublic.Tested ? styles.navActive : ""}
          to={`/Posts?type=Tested&agent=${props.agent ?? ''}&map=${props.map ?? ''}`}>testado</Link>

        { props.selected === navbarEnumPublic.Admin ? (
          <Link
            className={props.selected === navbarEnumPublic.Admin ? styles.navActive : ""}
            to={`/`}>Tela do Ademir</Link>
        ) : null }

      </ul>
    </nav>
  )
}
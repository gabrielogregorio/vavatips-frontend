import React from "react";
import { Link } from 'react-router-dom'
import styles from './navbar.module.css'

export enum navbarEnum {
  Profile = '/Profile',
  PostCreate = '/PostCreate',
  ViewPosts = '/ViewPosts',
  Config = '/Config',
  EditScreen = '#'
}

interface NavbarProps {
  selected: navbarEnum
}

export const NavbarComponent = (props:NavbarProps) => {
  return (
    <nav className={styles.nav}>
      <ul>
        <Link
          className={props.selected === navbarEnum.Profile ? styles.navActive : ""}
          to="/Profile">Perfil</Link>

        <Link
          className={props.selected === navbarEnum.PostCreate ? styles.navActive : ""}
          to="/PostCreate">Criar posts</Link>

        <Link
          className={props.selected === navbarEnum.ViewPosts ? styles.navActive : ""}
          to="/ViewPosts">Visualizar posts</Link>

        { props.selected === navbarEnum.EditScreen ? (
          <Link
            className={props.selected === navbarEnum.EditScreen ? styles.navActive : ""}
            to="/#">Editar posts</Link>
        ) : null}

        <Link
          className={props.selected === navbarEnum.Config ? styles.navActive : ""}
          to="/Config">Configurações</Link>

      </ul>
    </nav>
  )
}
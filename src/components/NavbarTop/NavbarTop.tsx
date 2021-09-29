import React from "react";
import { Link } from "react-router-dom";
import styles from './App.module.css'

export const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <ul>
        <Link to="/">Inicio</Link>
        <Link to="/Posts">Posts</Link>
        <Link to="/Login">Login</Link>
      </ul>
      </nav>
  )
}

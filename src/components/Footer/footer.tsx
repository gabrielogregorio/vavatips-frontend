import React from "react";
import styles from './styles.module.css'

export const FooterComponent = () => {
  return (
    <>
      <div className="elastic"></div>
      <div className={styles.footer}>
        <p className={styles.boilerplate}> <span>Vavatips</span> foi criado seguindo a política do
        <a href="https://www.riotgames.com/pt-br/juridico"> “Lenga-Lenga Jurídico”</a>
        da Riot Games com recursos pertencentes à Riot Games. A Riot Games não endossa ou patrocina este projeto.
        </p>
      </div>
    </>
  )
}

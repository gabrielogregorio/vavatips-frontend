import React from "react";
import styles from './styles.module.css'

interface footerProps {
  color: 'primary' | 'secundary'
}

export const FooterComponent = (props: footerProps) => {
  const background = props.color === 'primary' ? 'var(--primary)' : 'var(--secundary)'
  return (
    <>
      <div className="elastic"></div>

      <div
        className={styles.containerFooter}
        style={{ background }}>

        <div className={styles.footer}>

          <div className={styles.footerLinks}>
            <h3>Contribua</h3>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://gabrielogregorio.com/">Entre em contato</a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/gabrielogregorio/vavatips-backend">Backend em Node.js github</a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/gabrielogregorio/vavatips-frontend">Frontend com React.Js github</a>
          </div>

          <div className={styles.about}>
            <h3>Projeto</h3>
            <p className={styles.boilerplate}>Esse é um projeto feito por fãs do Valorant, com intenção de aumentar a qualidade das gameplays do nosso cenário.</p>
          </div>

          <div className={styles.about}>
            <h3>Sobre</h3>
            <p className={styles.boilerplate}> <span>Vavatips</span> foi criado seguindo a política do
            <a target="_blank" rel="noopener noreferrer" href="https://www.riotgames.com/pt-br/juridico"> “Lenga-Lenga Jurídico”</a>
            da Riot Games com recursos pertencentes à Riot Games. A Riot Games não endossa ou patrocina este projeto.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

import React, { useState } from "react";
import styles from './post.module.css'
type typeType = 'next' | 'prev'

export const PostComponent = ( { props }: any) => {
  const [ idImage, setIdImage ] = useState<number>(0)

  function nextImage(type: typeType, length: number) {
    if (type === 'next' && idImage < length -1 ) {
      setIdImage(idImage + 1)
    } else if (type === 'prev' && idImage > 0 ) {
      setIdImage(idImage - 1)
    }
  }

  return (
    <div className={styles.posts}>
      <div className={styles.profile}>
        <img
          src={ props.user.image ?? '/images/users/profile.png'}
          alt="Foto de perfil do Autor da postagem" />
        <p>{props.user.username ?? 'Ademir Maluco'}</p>
        <button>Reportar Problema</button>
      </div>

      <h3>{props.title}</h3>

      <div className={styles.imgAndDescription}>
        <div className={styles.imgPost}>
          <img src={props.imgs?.[idImage]?.image} alt={props.imgs?.[idImage]?.description} />
          { idImage > 0 ? (
            <div className={styles.previus} onClick={() => nextImage('prev', props.imgs.length)}>
              <i className="fas fa-angle-left"></i>
            </div>
          ) : null }
          { idImage < props.imgs.length -1 ? (
            <div className={styles.next} onClick={() => nextImage('next', props.imgs.length)}>
              <i className="fas fa-angle-right"></i>
            </div>
          ) : null }
          <div className={styles.descriptionImage}>
            <p>{idImage + 1} - {props.imgs?.[idImage]?.description}</p>
          </div>
        </div>
      </div>

      <div className={styles.descriptionAndTags}>
        <p className={styles.description}>{props.description}</p>
        <p className={styles.tags}>
          <span> #{props.tags.map}</span> <span> #{props.tags.agent}</span> <span> #{props.tags.ability}</span> <span> #{props.tags.moment}</span> <span> #{props.tags.difficult}</span> <span> #{props.tags.side}</span> <span> #{props.tags.mapPosition}</span>
        </p>
      </div>

      <div className={styles.actions}>
        <button>Curtir</button>
        <button>Salvar</button>
        <button>Fazer Sugestão</button>
      </div>
    </div>
  )
}

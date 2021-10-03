import React, { useState } from "react";
import styles from './post.module.css'
type typeType = 'next' | 'prev'


export interface PropsPostInterface {
  _id: string,
  user: { _id: string, username: string, image: string }
  description: string
  title: string

  imgs: [{ _id: string, image: string, description: string } ]
  tags: {
    map: string,
    agent: string,
    ability: string,
    moment: string,
    difficult: string,
    side: string,
    mapPosition: string
  },
  postActions: {
    save: [{_id: string}],
    tested: [{_id: string}]
  },
  toggleSave: (_id: string) => void
  toggleTested: (_id: string) => void
  showModalReport: (_id: string, titlePost: string) => void
  showModalSuggestion: (_id: string, titlePost: string) => void

}

export const PostComponent = (props: PropsPostInterface) => {
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

        { props.user.image ?
          (
            <img src={`${props.user.image}`} alt="Foto de perfil do Autor da postagem" />
          )
          :(
            <img src={'/images/users/profile.webp'} alt="Foto de perfil do Autor da postagem" />
           )
        }

        <p>{props.user.username ?? 'Ademir Maluco'}</p>
        <button onClick={() => props.showModalReport(props._id, props.title)}>Reportar Problema</button>
      </div>

      <h3>{props.title}</h3>

      <div className={styles.imgAndDescription}>
        <div className={styles.imgPost}>
          <img src={`${props.imgs?.[idImage]?.image}`} alt={props.imgs?.[idImage]?.description} />
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
        {
          props.postActions.tested.filter(post => post._id === props._id).length === 0
          ? <button onClick={() => props.toggleTested(props._id)} > A testar</button>
          : <button className={styles.actionsActive} onClick={() => props.toggleTested(props._id)} > Testado</button>
        }

        {
          props.postActions.save.filter(post => post._id === props._id).length === 0
          ? <button onClick={() => props.toggleSave(props._id)} >Salvar</button>
          : <button className={styles.actionsActive} onClick={() => props.toggleSave(props._id)}> Salvo</button>
        }

        <button onClick={() => props.showModalSuggestion(props._id, props.title)}>Fazer Sugestão</button>
      </div>
    </div>
  )
}

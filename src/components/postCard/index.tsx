import React, { useState } from "react";
import { Link } from "react-router-dom";
import { formatImage } from "../../services/formatEnvironment";
import styles from './post.module.css'
type typeType = 'next' | 'prev'

// Componente post
interface PropsPostInterface {
  post: postsProps,
  toggleTag: (tag: string) => void
  showModalSuggestion: (post: postsProps) => void
  viewAdmin?: boolean
}


export const PostCard = (props: PropsPostInterface) => {
  const [ idImage, setIdImage ] = useState<number>(0)

  function nextImage(type: typeType, length: number) {
    if (type === 'next' ) {
      if (idImage < length -1) {
        setIdImage(idImage + 1)
      } else {
        setIdImage(0)
      }
    } else if (type === 'prev' ) {
      if(idImage > 0) {
        setIdImage(idImage - 1)
      } else {
        setIdImage(length - 1)
      }
    }
  }

  return (
    <div className="postItems">
    <div className={styles.posts}>
      <div className={styles.profile}>

        { props.post.user.image ?
          (
            <img src={formatImage(props.post.user.image)} alt="Foto de perfil do Autor da postagem" />
          )
          :(
            <img src={'/images/users/profile.webp'} alt="Foto de perfil do Autor da postagem" />
           )
        }

        <p>{props.post.user.username ?? 'Ademir Maluco'}</p>

        <button>reportar</button>

        { props.viewAdmin ? (
          <Link to={`PostEdit?id=${props.post._id}`}>Editar Post</Link>
        ): null }

      </div>

      <h3>{props.post.title}</h3>

      <div className={styles.imgAndDescription}>
        <div className={styles.imgPost}>
          <img src={formatImage(props.post.imgs?.[idImage]?.image)} alt={props.post.imgs?.[idImage]?.description} />

          <div className={styles.previus} onClick={() => nextImage('prev', props.post.imgs.length)}>
            <i className="fas fa-angle-left"></i>
          </div>

          <div className={styles.next} onClick={() => nextImage('next', props.post.imgs.length)}>
            <i className="fas fa-angle-right"></i>
          </div>

          <div className={styles.descriptionImage}>
            <p>{idImage + 1} - {props.post.imgs?.[idImage]?.description}</p>
          </div>
        </div>
      </div>

      <div className={styles.descriptionAndTags}>
        <p className={styles.description}>{props.post.description}</p>
        <p className={styles.tags}>
          <span onClick={() => props.toggleTag(props.post.tags.map)} > #{props.post.tags.map}</span>
          <span onClick={() => props.toggleTag(props.post.tags.agent)} > #{props.post.tags.agent}</span>
          <span onClick={() => props.toggleTag(props.post.tags.ability)} > #{props.post.tags.ability}</span>
          <span onClick={() => props.toggleTag(props.post.tags.moment)} > #{props.post.tags.moment}</span>
          <span onClick={() => props.toggleTag(props.post.tags.difficult)} > #{props.post.tags.difficult}</span>
          <span onClick={() => props.toggleTag(props.post.tags.side)} > #{props.post.tags.side}</span>
          <span onClick={() => props.toggleTag(props.post.tags.mapPosition)} > #{props.post.tags.mapPosition}</span>
        </p>
      </div>

      { !props.viewAdmin ? (
        <div className={styles.actions}>
        <button>A testar</button>
        <button> Salvo</button>
        <button onClick={() => props.showModalSuggestion(props.post)}>Sugerir</button>
      </div>
      ) : null }

    </div>
    </div>
  )
}

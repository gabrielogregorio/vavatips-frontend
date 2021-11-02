import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { formatImage } from "../../services/formatEnvironment";
import { Img } from "../img";
import styles from './post.module.css'
import { addNewPost, removePost, getPostsTested, getPostsSave } from '../../services/handlePosts'
import { isAuthenticated } from '../../services/auth'
import { useModalContext } from "../../contexts/modalSuggestion";
type typeType = 'next' | 'prev'

// Componente post
interface PropsPostInterface {
  post: postsProps,
  toggleTag: (tag: string) => void
  viewAdmin?: boolean
}


export const PostCard = (props: PropsPostInterface) => {
  const [ idImage, setIdImage ] = useState<number>(0)
  const [ postTested, setPostTested ] = useState<boolean>(false)
  const [ postSave, setPostSave ] = useState<boolean>(false)
  const { setModalSuggestion } = useModalContext()

  function handleAddTest() {
    if(postTested) { removePost(props.post._id, 'test')
    } else { addNewPost(props.post._id, 'test') }
    setPostTested(getPostsTested()?.includes(props.post._id) ?? false)
  }

  function handleAddSave() {
    if(postSave) { removePost(props.post._id, 'save')
    } else { addNewPost(props.post._id, 'save') }
    setPostSave(getPostsSave()?.includes(props.post._id) ?? false)
  }

  useEffect(() => {
    // Este post está incluso nos posts testados!
    setPostTested(getPostsTested()?.includes(props.post._id) ?? false)
    setPostSave(getPostsSave()?.includes(props.post._id) ?? false)
  }, [props.post._id])


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

  function handleModalAction() {
    setModalSuggestion({active: true, post: props.post })
  }

  return (
    <div className="postItems">
    <div className={styles.posts}>
      <div className={styles.profile}>

        { props.post.user.image ?
          (
            <Img
              src={formatImage(props.post.user.image)}
              alt="Foto de perfil do Autor da postagem"
              />
          )
          :(
            <Img
              src={'/images/users/profile.webp'}
              alt={"Foto de perfil do Autor da postagem"}
              />
           )
        }

        <p>{props.post.user.username ?? 'Ademir'}</p>

        {isAuthenticated() === true ? (
          <button>
            <Link to={`PostEdit?id=${props.post._id}`}>Editar</Link>
          </button>
        ) : null }
      </div>

      <h3>{props.post.title}</h3>

      <div className={styles.imgAndDescription}>
        <div className={styles.imgPost}>
          <img src={formatImage(props.post.imgs?.[idImage]?.image)} alt={props.post.imgs?.[idImage]?.description} />

          <button aria-label="Item anterior" className={styles.previus} onClick={() => nextImage('prev', props.post.imgs.length)}>
            <i aria-hidden className="fas fa-angle-left"></i>
          </button>

          <button aria-label="Proximo item"  className={styles.next} onClick={() => nextImage('next', props.post.imgs.length)}>
            <i aria-hidden className="fas fa-angle-right"></i>
          </button>

          <div className={styles.descriptionImage}>
            <p aria-live='polite' >{idImage + 1} de {props.post.imgs.length} : {props.post.imgs?.[idImage]?.description}</p>
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
        <button className={postTested ? styles.actionsActive : ''} onClick={handleAddTest}>A testar</button>

        <button className={postSave ? styles.actionsActive : ''} onClick={handleAddSave}> Salvo</button>
        <button onClick={handleModalAction}>Sugerir</button>
      </div>
      ) : null }

    </div>
    </div>
  )
}

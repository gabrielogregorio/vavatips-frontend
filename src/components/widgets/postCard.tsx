import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatImage } from '../../core/services/formatEnvironment';
import { Img } from '../base/img';
import styles from '../../styles/components/postCard.module.css';
import {
  addNewPost,
  removePost,
  getPostsTested,
  getPostsSave,
} from '../../core/services/handlePosts';
import { isAuthenticated } from '../../core/services/auth';
import { useModalContext } from '../../core/contexts/modalSuggestion';
import { Button } from '../base/button';
type typeType = 'next' | 'prev';

// Componente post
interface PropsPostInterface {
  post: postsProps;
  viewAdmin?: boolean;
}

export const PostCard = (props: PropsPostInterface) => {
  const [idImage, setIdImage] = useState<number>(0);
  const [postTested, setPostTested] = useState<boolean>(false);
  const [postSave, setPostSave] = useState<boolean>(false);
  const { setModalSuggestion } = useModalContext();

  function handleAddTest() {
    if (postTested) {
      removePost(props.post._id, 'test');
    } else {
      addNewPost(props.post._id, 'test');
    }
    setPostTested(getPostsTested()?.includes(props.post._id) ?? false);
  }

  function handleAddSave() {
    if (postSave) {
      removePost(props.post._id, 'save');
    } else {
      addNewPost(props.post._id, 'save');
    }
    setPostSave(getPostsSave()?.includes(props.post._id) ?? false);
  }

  useEffect(() => {
    // Este post está incluso nos posts testados!
    setPostTested(getPostsTested()?.includes(props.post._id) ?? false);
    setPostSave(getPostsSave()?.includes(props.post._id) ?? false);
  }, [props.post._id]);

  function nextImage(type: typeType, length: number) {
    if (type === 'next') {
      if (idImage < length - 1) {
        setIdImage(idImage + 1);
      } else {
        setIdImage(0);
      }
    } else if (type === 'prev') {
      if (idImage > 0) {
        setIdImage(idImage - 1);
      } else {
        setIdImage(length - 1);
      }
    }
  }

  function handleModalAction() {
    setModalSuggestion({ active: true, post: props.post });
  }

  return (
    <div className="postItems">
      <div className={styles.posts}>
        <div className={styles.profile}>
          {props.post.user.image ? (
            <Img
              src={formatImage(props.post.user.image)}
              alt="Foto de perfil do Autor da postagem"
            />
          ) : (
            <Img
              src={'/images/users/profile.webp'}
              alt={'Foto de perfil do Autor da postagem'}
            />
          )}

          <p>{props.post.user.username ?? 'Ademir'}</p>

          {isAuthenticated() === true ? (
            <Button>
              <Link to={`PostEdit?id=${props.post._id}`}>Editar</Link>
            </Button>
          ) : null}
        </div>

        <h3>{props.post.title}</h3>

        <div className={styles.imgAndDescription}>
          <div className={styles.imgPost}>
            <img
              src={formatImage(props.post.imgs?.[idImage]?.image)}
              alt={props.post.imgs?.[idImage]?.description}
            />

            <Button
              aria-label="Item anterior"
              className={styles.previus}
              onClick={() => nextImage('prev', props.post.imgs.length)}>
              <i aria-hidden className="fas fa-angle-left"></i>
            </Button>

            <Button
              aria-label="Proximo item"
              className={styles.next}
              onClick={() => nextImage('next', props.post.imgs.length)}>
              <i aria-hidden className="fas fa-angle-right"></i>
            </Button>

            <div className={styles.descriptionImage}>
              <p aria-live="polite">
                {idImage + 1} de {props.post.imgs.length} :{' '}
                {props.post.imgs?.[idImage]?.description}
              </p>
            </div>
          </div>
        </div>

        <div className={styles.descriptionAndTags}>
          <p className={styles.description}>{props.post.description}</p>
          <p className={styles.tags}>
            <span> #{props.post.tags.map}</span>
            <span> #{props.post.tags.agent}</span>
            <span> #{props.post.tags.ability}</span>
            <span> #{props.post.tags.moment}</span>
            <span> #{props.post.tags.difficult}</span>
            <span> #{props.post.tags.side}</span>
            <span> #{props.post.tags.mapPosition}</span>
          </p>
        </div>

        {!props.viewAdmin ? (
          <div className={styles.actions}>
            <Button
              className={postTested ? styles.actionsActive : ''}
              onClick={handleAddTest}>
              A testar
            </Button>

            <Button
              className={postSave ? styles.actionsActive : ''}
              onClick={handleAddSave}>
              {' '}
              Salvo
            </Button>
            <Button onClick={handleModalAction}>Sugerir</Button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

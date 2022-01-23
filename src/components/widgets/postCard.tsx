import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { isAuthenticated } from '@/services/auth';
import { useModalContext } from '@/contexts/modalSuggestion';
import formatImage from '@/services/formatEnvironment';
import { addNewPost, removePost, getPostsTested, getPostsSave } from '@/services/handlePosts';
import Button from '@/base/button';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import { postsProps } from '@/interfaces/posts';
import styles from '../../styles/components/postCard.module.css';

type typeType = 'next' | 'prev';

interface PropsPostInterface {
  post: postsProps;
  viewAdmin?: boolean;
}

export default function PostCard({ post, viewAdmin }: PropsPostInterface) {
  const [idImage, setIdImage] = useState<number>(0);
  const [postTested, setPostTested] = useState<boolean>(false);
  const [postSave, setPostSave] = useState<boolean>(false);
  const { setModalSuggestion } = useModalContext();

  function handleAddTest() {
    if (postTested) {
      removePost(post.id, 'test');
    } else {
      addNewPost(post.id, 'test');
    }
    setPostTested(getPostsTested()?.includes(post.id) ?? false);
  }

  function handleAddSave() {
    if (postSave) {
      removePost(post.id, 'save');
    } else {
      addNewPost(post.id, 'save');
    }
    setPostSave(getPostsSave()?.includes(post.id) ?? false);
  }

  useEffect(() => {
    // Este post está incluso nos posts testados!
    setPostTested(getPostsTested()?.includes(post.id) ?? false);
    setPostSave(getPostsSave()?.includes(post.id) ?? false);
  }, [post.id]);

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
    setModalSuggestion({ active: true, post });
  }

  return (
    <div className="postItems">
      <div className={styles.posts}>
        <div className={styles.profile}>
          {post.user.image ? (
            <img src={formatImage(post.user.image)} alt="Foto de perfil do Autor da postagem" />
          ) : (
            <img src="/images/users/profile.webp" alt="Foto de perfil do Autor da postagem" />
          )}

          <p>{post.user.username ?? 'Ademir'}</p>

          {isAuthenticated() === true ? (
            <Button>
              <Link href={`/admin/post-edit?id=${post.id}`}>Editar</Link>
            </Button>
          ) : null}
        </div>

        <h3>{post.title}</h3>

        <div className={styles.imgAndDescription}>
          <div className={styles.imgPost}>
            <img src={formatImage(post.imgs?.[idImage]?.image)} alt={post.imgs?.[idImage]?.description} />

            <Button
              ariaLabel="Item anterior"
              className={styles.previus}
              onClick={() => nextImage('prev', post.imgs.length)}>
              <MdArrowBackIosNew />
            </Button>

            <Button
              ariaLabel="Proximo item"
              className={styles.next}
              onClick={() => nextImage('next', post.imgs.length)}>
              <MdArrowForwardIos />
            </Button>

            <div className={styles.descriptionImage}>
              <p aria-live="polite">
                {idImage + 1} de {post.imgs.length} : {post.imgs?.[idImage]?.description}
              </p>
            </div>
          </div>
        </div>

        <div className={styles.descriptionAndTags}>
          <p className={styles.description}>{post.description}</p>
          <p className={styles.tags}>
            <span> #{post.tags.map}</span>
            <span> #{post.tags.agent}</span>
            <span> #{post.tags.ability}</span>
            <span> #{post.tags.moment}</span>
            <span> #{post.tags.difficult}</span>
            <span> #{post.tags.side}</span>
            <span> #{post.tags.mapPosition}</span>
          </p>
        </div>

        {!viewAdmin ? (
          <div className={styles.actions}>
            <Button className={postTested ? styles.actionsActive : ''} onClick={() => handleAddTest()}>
              A testar
            </Button>

            <Button className={postSave ? styles.actionsActive : ''} onClick={() => handleAddSave()}>
              Salvo
            </Button>
            <Button onClick={() => handleModalAction()}>Sugerir</Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

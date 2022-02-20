import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useModalContext } from '@/contexts/modalSuggestion';
import formatImage from '@/services/formatEnvironment';
import { addNewPost, removePost, getPostsTested, getPostsSave } from '@/services/handlePosts';
import Button from '@/base/button';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import { postsProps } from '@/interfaces/posts';
import Image from 'next/image';
import { isAuthenticated } from '../../core/services/auth';
import PostButton from '../base/likeButton';

type typeType = 'next' | 'prev';

interface PropsPostInterface {
  post: postsProps;
  viewAdmin: boolean;
}

const PostCard = ({ post, viewAdmin = false }: PropsPostInterface) => {
  const [idImage, setIdImage] = useState<number>(0);
  const [postTested, setPostTested] = useState<boolean>(false);
  const [postSave, setPostSave] = useState<boolean>(false);
  const { setModalSuggestion } = useModalContext();
  const [errorImage, setErrorImage] = useState('');

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
    function thisPostIsIncludeInSaveOrTestedPosts() {
      setPostTested(getPostsTested()?.includes(post.id) ?? false);
      setPostSave(getPostsSave()?.includes(post.id) ?? false);
    }

    thisPostIsIncludeInSaveOrTestedPosts();
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
    <div className="p-2 pl-0 pr-0 w-full h-full border-t border-white">
      <div className="flex justify-center items-center mb-2 mt-2 w-full">
        <div className="h-11 w-11 relative">
          {post.user.image ? (
            <Image
              layout="fill"
              className="rounded-full object-cover"
              src={formatImage(post.user.image)}
              alt="Foto de perfil do Autor da postagem"
            />
          ) : (
            <Image
              layout="fill"
              className="rounded-full object-cover"
              src="/images/users/profile.webp"
              alt="Foto de perfil do Autor da postagem"
            />
          )}
        </div>

        <p className="flex-1 dark:text-skin-white text-skin-gray-800 ml-5 text-base">
          {post.user.username ?? 'Ademir'}
        </p>

        {isAuthenticated() === true ? (
          <Button className="block text-skin-secondary-regular" onClick={() => null}>
            <Link href={`/admin/post-edit?id=${post.id}`}>Editar</Link>
          </Button>
        ) : null}
      </div>

      <h3 className="text-base dark:text-skin-white text-skin-gray-800 w-full mb-2.5">
        {post.title}
      </h3>

      <div className="w-full">
        <div className="relative w-full">
          <div className="relative h-[500px] w-full">
            <Image
              layout="fill"
              className="object-cover rounded-lg"
              placeholder="blur"
              blurDataURL="/images/assets/loader.png"
              onError={() => setErrorImage('/images/assets/error.webp')}
              src={errorImage || formatImage(post.imgs?.[idImage]?.image)}
              alt={post.imgs?.[idImage]?.description}
            />
          </div>

          <div className="absolute left-0 top-2/4">
            <Button
              ariaLabel="Item anterior"
              dataTestid="prev-btn"
              className="text-skin-white border-none bg-transparent"
              onClick={() => nextImage('prev', post.imgs.length)}>
              <MdArrowBackIosNew className="text-4xl font-bold" />
            </Button>
          </div>

          <div className="absolute right-0 top-2/4">
            <Button
              ariaLabel="Proximo item"
              dataTestid="next-btn"
              className="text-skin-white border-none bg-transparent"
              onClick={() => nextImage('next', post.imgs.length)}>
              <MdArrowForwardIos className="text-4xl font-bold" />
            </Button>
          </div>

          <div className="absolute block bottom-0 left-0 w-full p-2.5 rounded-lg rounded-t-none  bg-skin-black">
            <p className="text-skin-white text-base" aria-live="polite">
              {idImage + 1} de {post.imgs.length} : {post.imgs?.[idImage]?.description}
            </p>
          </div>
        </div>
      </div>

      <div>
        <p className="text-base dark:text-skin-white text-skin-gray-800">{post.description}</p>

        <p className="text-skin-secondary-regular text-lg bg-transparent">
          <span className="text-base"> #{post.tags.map}</span>
          <span className="text-base"> #{post.tags.agent}</span>
          <span className="text-base"> #{post.tags.ability}</span>
          <span className="text-base"> #{post.tags.moment}</span>
          <span className="text-base"> #{post.tags.difficult}</span>
          <span className="text-base"> #{post.tags.side}</span>
          <span className="text-base"> #{post.tags.mapPosition}</span>
        </p>
      </div>

      {!viewAdmin ? (
        <div className="w-full flex justify-around m-1">
          <PostButton selected={postTested} onClick={() => handleAddTest()} variant="like" />
          <PostButton selected={postSave} onClick={() => handleAddSave()} variant="save" />
          <PostButton selected={false} onClick={() => handleModalAction()} variant="report" />
        </div>
      ) : null}
    </div>
  );
};
export default PostCard;

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { isAuthenticated } from '@/services/auth';
import { useModalContext } from '@/contexts/modalSuggestion';
import formatImage from '@/services/formatEnvironment';
import { addNewPost, removePost, getPostsTested, getPostsSave } from '@/services/handlePosts';
import Button from '@/base/button';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import { postsProps } from '@/interfaces/posts';
import ButtonForm from '@/base/buttonForm';
import Image from 'next/image';

type typeType = 'next' | 'prev';

interface PropsPostInterface {
  post: postsProps;
  viewAdmin: boolean;
}

export default function PostCard({ post, viewAdmin = false }: PropsPostInterface) {
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
    <div className="p-2 pl-0 pr-0 w-full h-full border-t border-gray-500">
      <div className="flex justify-center items-center mb-2 w-full">
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

        <p className="flex-1 text-skin-textColor ml-5 text-base">
          {post.user.username ?? 'Ademir'}
        </p>

        {isAuthenticated() === true ? (
          <Button className="block text-skin-primaryExtra" onClick={() => null}>
            <Link href={`/admin/post-edit?id=${post.id}`}>Editar</Link>
          </Button>
        ) : null}
      </div>

      <h3 className="text-base text-skin-textColor w-full mb-2.5">{post.title}</h3>

      <div className="w-full">
        <div className="relative w-full">
          <div className="relative h-[500px] w-full ">
            <Image
              layout="fill"
              className="object-cover rounded-lg"
              src={formatImage(post.imgs?.[idImage]?.image)}
              alt={post.imgs?.[idImage]?.description}
            />
          </div>

          <div className="absolute left-0 top-2/4">
            <Button
              ariaLabel="Item anterior"
              dataTestid="prev-btn"
              className="text-skin-textColorInDarkness border-none bg-transparent"
              onClick={() => nextImage('prev', post.imgs.length)}>
              <MdArrowBackIosNew className="text-4xl font-bold" />
            </Button>
          </div>

          <div className="absolute right-0 top-2/4">
            <Button
              ariaLabel="Proximo item"
              dataTestid="next-btn"
              className="text-skin-textColorInDarkness border-none bg-transparent"
              onClick={() => nextImage('next', post.imgs.length)}>
              <MdArrowForwardIos className="text-4xl font-bold" />
            </Button>
          </div>

          <div className="absolute block bottom-0 left-0 w-full p-2.5 rounded-lg rounded-t-none  bg-skin-backgroundDescription">
            <p className="text-skin-textColorInDarkness text-base" aria-live="polite">
              {idImage + 1} de {post.imgs.length} : {post.imgs?.[idImage]?.description}
            </p>
          </div>
        </div>
      </div>

      <div>
        <p className="text-base text-skin-textColor">{post.description}</p>

        <p className="text-skin-primaryExtra text-lg bg-transparent">
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
        <div className="w-full flex justify-around mt-5">
          <ButtonForm
            className={`m-1 border-skin-secondary ${
              postTested
                ? 'text-skin-textColorInDarkness bg-skin-secondary '
                : 'text-skin-secondary '
            }`}
            onClick={() => handleAddTest()}>
            Testar
          </ButtonForm>

          <ButtonForm
            className={`m-1 border-skin-primaryExtra  ${
              postSave
                ? 'text-skin-textColorInDarkness bg-skin-primaryExtra'
                : 'text-skin-primaryExtra'
            }`}
            onClick={() => handleAddSave()}>
            Salvar
          </ButtonForm>

          <ButtonForm
            className="m-1 text-skin-primarySmall border-skin-primarySmall"
            onClick={() => handleModalAction()}>
            Sugerir
          </ButtonForm>
        </div>
      ) : null}
    </div>
  );
}

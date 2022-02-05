import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { isAuthenticated } from '@/services/auth';
import { useModalContext } from '@/contexts/modalSuggestion';
import formatImage from '@/services/formatEnvironment';
import { addNewPost, removePost, getPostsTested, getPostsSave } from '@/services/handlePosts';
import Button from '@/base/button';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import { postsProps } from '@/interfaces/posts';

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
    console.log('opa');
    if (postTested) {
      removePost(post.id, 'test');
    } else {
      addNewPost(post.id, 'test');
      console.log('al');
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
    <div className="p-2 pl-0 pr-0 w-full h-full border-t border-gray-500">
      <div className="flex justify-center items-center mb-2 w-full">
        {post.user.image ? (
          <img
            className="h-11 rounded-full object-cover w-11"
            src={formatImage(post.user.image)}
            alt="Foto de perfil do Autor da postagem"
          />
        ) : (
          <img
            className="h-11 rounded-full object-cover w-11"
            src="/images/users/profile.webp"
            alt="Foto de perfil do Autor da postagem"
          />
        )}

        <p className="flex-1 text-skin-textColorNormal ml-5 text-base">
          {post.user.username ?? 'Ademir'}
        </p>

        {isAuthenticated() === true ? (
          <Button className="block text-skin-primary ">
            <Link href={`/admin/post-edit?id=${post.id}`}>Editar</Link>
          </Button>
        ) : null}
      </div>

      <h3 className="text-base text-skin-textColorBold w-full mb-2.5">{post.title}</h3>

      <div className="w-full">
        <div className="relative w-full">
          <img
            className="h-[500px] object-cover rounded-lg w-full"
            src={formatImage(post.imgs?.[idImage]?.image)}
            alt={post.imgs?.[idImage]?.description}
          />

          <Button
            ariaLabel="Item anterior"
            dataTestid="prev-btn"
            className="absolute text-skin-textColor border-none bg-transparent p-10 top-2/4 left-0"
            onClick={() => nextImage('prev', post.imgs.length)}>
            <MdArrowBackIosNew className="text-4xl font-bold" />
          </Button>

          <Button
            ariaLabel="Proximo item"
            dataTestid="next-btn"
            className="absolute text-skin-textColor border-none bg-transparent p-10 top-2/4 right-0"
            onClick={() => nextImage('next', post.imgs.length)}>
            <MdArrowForwardIos className="text-4xl font-bold" />
          </Button>

          <div className="absolute block bottom-0 left-0 w-full p-2.5 rounded-lg rounded-t-none  bg-skin-backgroundDescription">
            <p className="text-skin-textColor text-base" aria-live="polite">
              {idImage + 1} de {post.imgs.length} : {post.imgs?.[idImage]?.description}
            </p>
          </div>
        </div>
      </div>

      <div>
        <p className="text-base text-skin-textColorBold">{post.description}</p>

        <p className="text-skin-btnActionsSave text-lg bg-transparent">
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
          <Button
            className={`w-full m-1 rounded-xl border-2 block border-skin-btnActionsTested ${
              postTested
                ? 'text-skin-textColor bg-skin-btnActionsTested '
                : 'text-skin-btnActionsTested '
            }`}
            onClick={() => handleAddTest()}>
            Testar
          </Button>

          <Button
            className={`w-full m-1 rounded-xl border-2  border-skin-btnActionsSave  ${
              postSave ? 'text-skin-textColor bg-skin-btnActionsSave' : 'text-skin-btnActionsSave'
            }`}
            onClick={() => handleAddSave()}>
            Salvar
          </Button>

          <Button
            className="w-full m-1 rounded-xl border-2 text-skin-btnActionsSuggestion border-skin-btnActionsSuggestion "
            onClick={() => handleModalAction()}>
            Sugerir
          </Button>
        </div>
      ) : null}
    </div>
  );
}

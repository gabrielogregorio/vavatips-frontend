import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useModalContext } from '@/contexts/modalSuggestion';
import { formatImage } from '@/services/formatEnvironment';
import { addNewPost, removePost, getPostsTested, getPostsSave } from '@/services/handlePosts';
import { Button } from '@/base/button';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import { TPostsProps } from '@/types/posts';
import Image from 'next/image';
import { isAuthenticated } from '@/services/auth';
import { PostButton } from '@/base/likeButton';

type typeType = 'next' | 'prev';

type TProps = {
  post: TPostsProps;
};

export const PostCard = ({ post }: TProps) => {
  const [idImage, setIdImage] = useState<number>(0);
  const [postTested, setPostTested] = useState<boolean>(false);
  const [postSave, setPostSave] = useState<boolean>(false);
  const [startedANavigation, setStartedANavigation] = useState<boolean>(false);

  const { setModalSuggestion } = useModalContext();

  const handleAddTest = () => {
    if (postTested) {
      removePost(post.id, 'test');
    } else {
      addNewPost(post.id, 'test');
    }
    setPostTested(getPostsTested()?.includes(post.id));
  };

  const handleAddSave = () => {
    if (postSave) {
      removePost(post.id, 'save');
    } else {
      addNewPost(post.id, 'save');
    }
    setPostSave(getPostsSave()?.includes(post.id));
  };

  useEffect(() => {
    const thisPostIsIncludeInSaveOrTestedPosts = () => {
      setPostTested(getPostsTested()?.includes(post.id));
      setPostSave(getPostsSave()?.includes(post.id));
    };

    thisPostIsIncludeInSaveOrTestedPosts();
  }, [post.id]);

  const nextImage = (type: typeType, length: number) => {
    setStartedANavigation(true);
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
  };

  const handleModalAction = () => {
    setModalSuggestion({ active: true, post });
  };

  return (
    <div className="p-2 pl-0 pr-0 w-full h-full border-t border-gray-200 dark:border-gray-600">
      <div className="flex justify-center items-center mb-2 mt-2 w-full">
        <div className="h-11 w-11 relative">
          {post.user.image ? (
            <Image
              layout="fill"
              className="rounded-full object-cover"
              data-src={formatImage(post.user.image)}
              src={formatImage(post.user.image)}
              alt="Foto de perfil do Autor da postagem"
              priority
            />
          ) : (
            <Image
              layout="fill"
              className="rounded-full object-cover"
              data-src="/images/users/profile.webp"
              src="/images/users/profile.webp"
              alt="Foto de perfil do Autor da postagem"
              priority
            />
          )}
        </div>

        <p className="flex-1 dark:text-skin-white text-skin-gray-800 ml-5 text-base">
          {post.user.username ?? 'Ademir'}
        </p>

        {isAuthenticated() === true ? (
          <button type="button" className="block text-skin-secondary-regular">
            <Link href={`/admin/post-edit?id=${post.id}`}>Editar</Link>
          </button>
        ) : null}
      </div>

      <h2 className="text-base dark:text-skin-white text-skin-gray-800 w-full mb-2.5">{post.title}</h2>

      <div className="w-full">
        <div className="relative w-full">
          <div className="relative h-[500px] w-full">
            <div className="w-full h-full overflow-x-auto flex">
              {post.imgs?.map((image, index) => {
                const navigationHasNotStarted = !startedANavigation;
                const isSelectedImage = idImage === index;

                if (navigationHasNotStarted && index > 0) {
                  return null;
                }

                return (
                  <div className={`h-full min-w-full relative ${isSelectedImage ? 'block' : 'hidden'}`} key={image.id}>
                    <Image
                      layout="fill"
                      className="object-cover rounded-md"
                      placeholder="blur"
                      priority
                      blurDataURL="/images/assets/loader.webp"
                      data-src={formatImage(image.image)}
                      src={formatImage(image.image)}
                      data-is-selected={isSelectedImage}
                      alt={image.description}
                    />
                  </div>
                );
              })}
            </div>
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

          <div className="absolute block bottom-0 left-0 w-full p-2.5 rounded-md rounded-t-none  bg-skin-black">
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

      <div className="w-full flex justify-around m-1">
        <PostButton ariaLabel="Salvar" selected={postSave} onClick={() => handleAddSave()} variant="like" />
        <PostButton ariaLabel="Testado" selected={postTested} onClick={() => handleAddTest()} variant="save" />
        <PostButton ariaLabel="Sugerir" selected={false} onClick={() => handleModalAction()} variant="report" />
      </div>
    </div>
  );
};

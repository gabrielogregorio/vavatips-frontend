import { Api } from '@/services/api';
import { useState } from 'react';
import * as uuid from 'uuid';

type imgType = {
  description: string;
  image: string;
  id: string;
};

export const useManagementPosts = () => {
  const [initialPost, setInitialPost] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imgAdded, setImgAdded] = useState<imgType[]>([]);
  const [redirect, setRedirect] = useState<boolean>(false);

  const getOnePost = (id: string) => {
    setIsLoading(true);
    Api.get(`/post/${id}`)
      .then(({ data }) => {
        const { title, description, tags, imgs } = data;

        const newImages = imgs.map((item) => ({
          ...item,
          id: uuid.v4().toString(),
        }));

        const formToReset = {
          title,
          description,
          moment: tags.moment,
          difficult: tags.difficult,
          ability: tags.ability,
          side: tags.side,
          map: tags.map,
          position: tags.mapPosition,
          agent: tags.agent,
        };

        setInitialPost(formToReset);

        setImgAdded(newImages);
      })
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
      });
  };

  const deleteThisPost = (idPost) => {
    setIsLoading(true);
    Api.delete(`/post/${idPost}`)
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
        setRedirect(true);
      });
  };

  const createNewPost = (request) => {
    Api.post(`/post`, { ...request })
      .then(() => {
        setRedirect(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const editOnePost = (id, request) => {
    Api.put(`/post/${id}`, { ...request })
      .then(() => {
        setRedirect(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return {
    initialPost,
    getOnePost,
    isLoading,
    redirect,
    editOnePost,
    imgAdded,
    setImgAdded,
    createNewPost,
    deleteThisPost,
  };
};

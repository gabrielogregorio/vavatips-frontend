import { Api } from '@/services/api';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';

type imgType = {
  description: string;
  image: string;
  id: string;
};

export const useManagementPosts = () => {
  const [initialPost, setInitialPost] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imgAdded, setImgAdded] = useState<imgType[]>([]);
  const [redirect, setRedirect] = useState<boolean>(false);

  const getOnePost = async (postId: string) => {
    setIsLoading(true);
    try {
      const { data } = await Api.get(`/post/${postId}`);
      const { title, description, tags, imgs } = data;

      const newImages = imgs.map((item) => ({
        ...item,
        id: uuid().toString(),
      }));

      const formToReset = {
        ability: tags.ability,
        agent: tags.agent,
        description,
        difficult: tags.difficult,
        map: tags.map,
        moment: tags.moment,
        position: tags.mapPosition,
        side: tags.side,
        title,
      };

      setInitialPost(formToReset);
      setImgAdded(newImages);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const deleteThisPost = async (idPost) => {
    setIsLoading(true);

    try {
      await Api.delete(`/post/${idPost}`);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
      setRedirect(true);
    }
  };

  const createNewPost = async (request) => {
    try {
      await Api.post(`/post`, { ...request });
      setRedirect(true);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const editOnePost = async (postId, request) => {
    try {
      await Api.put(`/post/${postId}`, { ...request });
      setRedirect(true);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createNewPost,
    deleteThisPost,
    editOnePost,
    getOnePost,
    imgAdded,
    initialPost,
    isLoading,
    redirect,
    setImgAdded,
  };
};

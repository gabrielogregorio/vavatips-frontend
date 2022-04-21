import { handleErrorViewAdminPosts } from '@/handlers/errors';
import { Api } from '@/services/api';
import { useEffect, useState } from 'react';

export const useViewAdminPosts = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const resp = await Api.get('/posts');
        const postsData = await resp.data;
        setPosts(postsData.posts);
      } catch (error) {
        setErrorMsg(handleErrorViewAdminPosts(error));
      } finally {
        setIsLoading(true);
      }
    };
    getData();
  }, []);

  return {
    posts,
    errorMsg,
    isLoading,
  };
};

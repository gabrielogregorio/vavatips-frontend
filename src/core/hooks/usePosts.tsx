import { useEffect, useState } from 'react';
import api from '@/services/api';
import { useFilters } from '@/contexts/filters';
import resolveQuery from '@/helpers/resolveQuery';
import { getPostsSave, getPostsTested } from '@/services/handlePosts';
import { PropsPostInterface } from '../../interfaces/posts';

interface filterUrlInterface {
  agent: string;
  map: string;
  type: string;
  page: string;
}

function getUrl(location: any): filterUrlInterface {
  const { agent, map, type, page = '1' }: any = location;
  return { agent, map, type, page };
}

type typeRequestType = '' | 'save' | 'tested';

export default function usePosts(location: any, typeRequest: typeRequestType = '') {
  const { filters, setTags, setFilters } = useFilters();
  const [posts, setPosts] = useState<PropsPostInterface[]>([]);
  const [activeLoader, setActiveLoader] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [finishPage, setFinishPage] = useState<number>(1);
  const [queryUrl, setQueryUrl] = useState<filterUrlInterface>(getUrl(location?.query));

  useEffect(
    () => () => {
      setTags([]);
      setFilters([]);
    },
    [setFilters, setTags],
  );

  useEffect(() => {
    setActiveLoader(true);
    setErrorMsg('');

    const { agent, map, type, page } = getUrl(location?.query);
    setQueryUrl({ agent, map, type, page });

    let idPosts = '[]';
    if (typeRequest === 'save') {
      idPosts = getPostsSave();
    } else if (typeRequest === 'tested') {
      idPosts = getPostsTested();
    }

    const data1: any = {
      map,
      page,
      agent,
      filters: filters.toString(),
    };

    if (typeRequest !== '') {
      data1.idPosts = idPosts;
    }

    api
      .get(resolveQuery('/posts', data1))
      .then((res) => {
        const postsFiltered = res.data.posts;
        setFinishPage(res.data.count);
        setTags(res.data.tags);
        setPosts(postsFiltered);
        setActiveLoader(false);
      })
      .catch((error) => {
        setErrorMsg(error.message);
        setActiveLoader(false);
      });
  }, [location?.query?.map, location?.query?.page, location?.query?.agent, filters, setTags, setFilters]);

  return { posts, activeLoader, errorMsg, finishPage, queryUrl };
}

import { useEffect, useState } from 'react';
import api from '@/services/api';
import { useFilters } from '@/contexts/filters';
import resolveQuery from '@/helpers/resolveQuery';
import { getPostsSave, getPostsTested } from '@/services/handlePosts';
import { useQuery } from 'react-query';
import { PropsPostInterface } from '@/interfaces/posts';

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
  const { filters, setTags } = useFilters();
  const [posts, setPosts] = useState<PropsPostInterface[]>([]);
  const [finishPage, setFinishPage] = useState<number>(1);
  const [queryUrl, setQueryUrl] = useState<filterUrlInterface>(getUrl(location?.query));
  const [dataRequest, setDataRequest] = useState<any>({});

  const { isLoading, error, data, refetch } = useQuery(
    ['/posts', resolveQuery(dataRequest)],
    () => api.get(resolveQuery('/posts', dataRequest)).then((res) => res.data),
    { enabled: false }, // send with manual update
  );

  useEffect(() => {
    if (JSON.stringify(dataRequest) !== '{}') {
      refetch();
    }
  }, [dataRequest]);

  useEffect(() => {
    if (data?.posts) {
      const postsFiltered = data.posts;
      setFinishPage(data.count);
      setTags(data.tags);
      setPosts(postsFiltered);
    }
  }, [JSON.stringify(data)]);

  useEffect(() => {
    if (location.isReady) {
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

      setDataRequest(data1);
    }
  }, [JSON.stringify(location?.query), typeRequest, JSON.stringify(filters)]);

  return { posts, isLoading, errorMsg: error || '', finishPage, queryUrl };
}

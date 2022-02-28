import { useEffect, useState } from 'react';
import api from '@/services/api';
import { useFilters } from '@/contexts/filters';
import resolveQuery from '@/helpers/resolveQuery';
import { getPostsSave, getPostsTested } from '@/services/handlePosts';
import { useQuery } from 'react-query';
import { PropsPostInterface } from '@/interfaces/posts';
import { NextRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';

export interface FilterUrlInterface {
  agent: string;
  map: string;
  type: string;
  page: string;
  isReady: boolean;
}

export type typeRequestType = '' | 'save' | 'tested';

function getParamsFromLocation(location): FilterUrlInterface {
  const { agent, map, type, page }: ParsedUrlQuery = location.query;
  const { isReady } = location;

  return {
    agent: agent?.toString() ?? '',
    map: map?.toString() ?? '',
    type: type?.toString() ?? '',
    page: page?.toString() ?? '1',
    isReady,
  };
}

export default function usePosts(location: NextRouter, typeRequest: typeRequestType = '') {
  const { filters, setTags } = useFilters();
  const [posts, setPosts] = useState<PropsPostInterface[]>([]);
  const [finishPage, setFinishPage] = useState<number>(1);
  const [queryUrl, setQueryUrl] = useState<FilterUrlInterface>(getParamsFromLocation(location));
  const [dataRequest, setDataRequest] = useState<{ [key: string]: string }>({});

  const { isLoading, error, data, refetch } = useQuery(
    ['/posts', resolveQuery('/posts', dataRequest)],
    () => api.get(resolveQuery('/posts', dataRequest)).then((res) => res.data),
    { enabled: false },
  );

  const { agent, map, type, page, isReady } = getParamsFromLocation(location);

  useEffect(() => {
    const localData = {
      map: dataRequest.map,
      page: dataRequest.page,
      agent: dataRequest.agent,
      filters: dataRequest.filters,
      idPosts: dataRequest.idPosts,
    };

    if (JSON.stringify(localData) !== '{}') {
      refetch();
    }
  }, [
    dataRequest.map,
    dataRequest.page,
    dataRequest.agent,
    dataRequest.filters,
    dataRequest.idPosts,
    refetch,
  ]);

  useEffect(() => {
    if (data?.posts) {
      const postsFiltered = data.posts;
      setFinishPage(data.count);
      setTags(data.tags);
      setPosts(postsFiltered);
    }
  }, [data?.posts, data?.count, data?.tags, setTags]);

  useEffect(() => {
    if (isReady) {
      setQueryUrl({ agent, map, type, page, isReady });

      let idPosts = '[]';
      if (typeRequest === 'save') {
        idPosts = getPostsSave();
      } else if (typeRequest === 'tested') {
        idPosts = getPostsTested();
      }

      const data1: { [key: string]: string } = {
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
  }, [agent, map, type, page, isReady, typeRequest, filters]);

  return { posts, isLoading, errorMsg: error || '', finishPage, queryUrl };
}

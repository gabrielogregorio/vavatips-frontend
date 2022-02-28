import { useEffect, useState } from 'react';
import { api } from '@/services/api';
import { useQuery } from 'react-query';
import { NextRouter } from 'next/router';

export function useAgents(item: NextRouter) {
  const mapSelected = item?.query;
  const [agentsApi, setAgentsApi] = useState<string[]>([]);

  const { isLoading, error, data } = useQuery(['/agents/', mapSelected?.map], () =>
    api.get(`/agents/${mapSelected?.map}`).then((agents) => agents.data),
  );

  useEffect(() => {
    setAgentsApi(data?.agents || []);
  }, [mapSelected?.map, data?.agents]);

  return {
    mapSelected,
    agentsApi,
    isLoading,
    error: error ? 'Erro desconhecido no servidor' : '',
  };
}

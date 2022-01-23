import { useEffect, useState } from 'react';
import api from '@/services/api';

export default function useAgents(item: any) {
  const mapSelected = item?.query;

  const [agentsApi, setAgentsApi] = useState<string[]>([]);
  const [activeLoader, setActiveLoader] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(() => {
    api
      .get(`/agents/${mapSelected?.map}`)
      .then((agents) => {
        const agentsJson = agents.data.agents;
        setAgentsApi(agentsJson);
        setActiveLoader(false);
      })
      .catch(() => {
        setErrorMsg('Erro desconhecido no servidor');
        setActiveLoader(false);
      });
  }, [mapSelected?.map]);

  return {
    mapSelected,
    agentsApi,
    activeLoader,
    errorMsg,
  };
}

import { useEffect, useState } from 'react';
import api from '@/services/api';
import { useQuery } from 'react-query';

export default function useMaps() {
  const [mapsApi, setMapsApi] = useState<string[]>([]);
  const { isLoading, error, data } = useQuery('/maps', () => api.get('/maps').then((maps) => maps.data));

  useEffect(() => {
    setMapsApi(data?.maps || []);
  }, [`${data}`]);

  return { mapsApi, isLoading, error: error ? 'Erro desconhecido no servidor' : '' };
}

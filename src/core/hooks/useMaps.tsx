import { useEffect, useState } from 'react';
import { api } from '@/services/api';
import { useQuery } from 'react-query';

export function useMaps() {
  const [mapsApi, setMapsApi] = useState<string[]>([]);
  const { isLoading, error, data } = useQuery(['/maps'], () =>
    api.get('/maps').then((maps) => maps.data),
  );

  useEffect(() => {
    if (data?.maps) {
      setMapsApi(data?.maps || []);
    }
  }, [data?.maps]);

  return { mapsApi, isLoading, error: error ? 'Erro desconhecido no servidor' : '' };
}

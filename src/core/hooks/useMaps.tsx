import { useEffect, useState } from 'react';
import api from '../services/api';

export const useMaps = () => {
  const [mapsApi, setMapsApi] = useState<string[]>([]);
  const [activeLoader, setActiveLoader] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(() => {
    api
      .get('/maps')
      .then((maps) => {
        setMapsApi(maps.data.maps);
        setActiveLoader(false);
      })
      .catch(() => {
        setErrorMsg('Erro desconhecido no servidor');
        setActiveLoader(false);
      });
  }, []);

  return { mapsApi, activeLoader, errorMsg };
};

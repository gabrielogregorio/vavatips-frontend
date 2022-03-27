import { handleDashboard } from '@/handlers/errors';
import { Api } from '@/services/api';
import { useEffect, useState } from 'react';

export const useDashboard = () => {
  const [username, setUsername] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [info, setInfo] = useState<object>(null);

  useEffect(() => {
    async function getInfoUserLogged() {
      setIsLoading(true);
      try {
        const [dashboard, user] = await Promise.all([Api.get(`/dashboard`), Api.get(`/user`)]);
        setInfo(dashboard.data);
        setUsername(user.data.username);
      } catch (error) {
        setErrorMsg(handleDashboard(error));
      } finally {
        setIsLoading(false);
      }
    }

    getInfoUserLogged();
  }, []);

  return {
    info,
    username,
    errorMsg,
    isLoading,
  };
};

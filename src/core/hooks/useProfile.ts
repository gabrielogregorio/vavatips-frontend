import { handleErrorProfile } from '@/handlers/errors';
import { Api } from '@/services/api';
import { useEffect, useState } from 'react';

export const useProfile = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [infoUser, setInfoUser] = useState<any>(null);

  useEffect(() => {
    setIsLoading(true);
    Api.get(`/user`)
      .then(({ data }) => {
        const { username: usernameLocal } = data;

        setInfoUser({
          username: usernameLocal,
        });
      })
      .catch((error) => {
        setErrorMessage(handleErrorProfile(error));
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return {
    isLoading,
    errorMessage,
    infoUser,
  };
};

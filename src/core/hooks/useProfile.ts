import { handleErrorProfile } from '@/handlers/errors';
import { Api } from '@/services/api';
import { useCallback, useEffect, useState } from 'react';

export const useProfile = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [infoUser, setInfoUser] = useState<{ username: string }>(null);

  const setProfileData = useCallback(async () => {
    try {
      const { data } = await Api.get(`/user`);
      const { username: usernameLocal } = data;

      setInfoUser({
        username: usernameLocal,
      });
    } catch (error) {
      setErrorMessage(handleErrorProfile(error));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);

    setProfileData();
  }, [setProfileData]);

  return {
    errorMessage,
    infoUser,
    isLoading,
  };
};

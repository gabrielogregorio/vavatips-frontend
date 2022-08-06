import { handleErrorLogin } from '@/handlers/errors';
import { Api } from '@/services/api';
import { login } from '@/services/auth';
import { useState } from 'react';

export const useLoginAndSetToken = () => {
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [redirect, setRedirect] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const tryLogin = async ({ username, password }) => {
    setIsLoading(true);
    try {
      const { data } = await Api.post('/auth', { password, username });
      login(data.token);
      setRedirect(true);
    } catch (error) {
      setErrorMsg(handleErrorLogin(error));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    errorMsg,
    isLoading,
    redirect,
    tryLogin,
  };
};

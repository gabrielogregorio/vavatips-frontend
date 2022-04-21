import { handleErrorRegister } from '@/handlers/errors';
import { Api } from '@/services/api';
import { useState } from 'react';

export const useRegister = () => {
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [redirect, setRedirect] = useState<boolean>(false);
  const [activeLoader, setActiveLoader] = useState<boolean>(false);

  const tryRegister = async ({ keyCode, username: usernameLocal, password: passwordLocal }): Promise<void> => {
    setActiveLoader(true);

    try {
      await Api.post('/user', { username: usernameLocal, password: passwordLocal, code: keyCode });
      setRedirect(true);
    } catch (error) {
      setErrorMsg(handleErrorRegister(error));
    } finally {
      setActiveLoader(false);
    }
  };

  return {
    tryRegister,
    errorMsg,
    redirect,
    activeLoader,
  };
};

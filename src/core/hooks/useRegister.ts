import { handleErrorRegister } from '@/handlers/errors';
import { Api } from '@/services/api';
import { AxiosError } from 'axios';
import { useState } from 'react';

type typeTyRegister = {
  keyCode: string;
  username: string;
  password: string;
};

export const useRegister = (): {
  activeLoader: boolean;
  errorMsg: string;
  redirect: boolean;
  tryRegister: (param: typeTyRegister) => Promise<void>;
} => {
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [redirect, setRedirect] = useState<boolean>(false);
  const [activeLoader, setActiveLoader] = useState<boolean>(false);

  const tryRegister = async ({ keyCode, username: usernameLocal, password: passwordLocal }): Promise<void> => {
    setActiveLoader(true);

    try {
      await Api.post('/user', { code: keyCode, password: passwordLocal, username: usernameLocal });
      setRedirect(true);
    } catch (error: unknown) {
      setErrorMsg(handleErrorRegister(error as AxiosError));
    } finally {
      setActiveLoader(false);
    }
  };

  return {
    activeLoader,
    errorMsg,
    redirect,
    tryRegister,
  };
};

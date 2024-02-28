/* eslint-disable sonarjs/no-identical-functions */
import { ERROR_CONFLICT_HTTP_CODE, ERROR_NOT_ACCESS_HTTP_CODE, ERROR_NOT_FOUND_HTTP_CODE } from '@/utils/statusCode';
import { AxiosError } from 'axios';
import Router from 'next/router';

const defaultStatusCode = {
  [ERROR_NOT_ACCESS_HTTP_CODE]: { action: (): Promise<boolean> => Router.push('/login'), label: 'UNAUTHORIZED' },
};

type handleInputErrorsType = {
  statusCode: number;
};

const ERROR_ON_GET_STATUS = 0;
const handleInputErrors = (error: AxiosError): handleInputErrorsType => {
  
  const statusCode = error?.response?.status ?? ERROR_ON_GET_STATUS;

  return {
    statusCode,
  };
};

export const handleDashboard = (error: AxiosError): string => {
  const { statusCode } = handleInputErrors(error);

  const resultByStatusCode = defaultStatusCode[statusCode];

  if (resultByStatusCode) {
    resultByStatusCode.action();
  }

  return 'Erro ao obter dados do dashboard';
};

export const handleErrorLogin = (error: AxiosError): string => {
  const { statusCode } = handleInputErrors(error);

  const literalHandler = {
    [ERROR_NOT_ACCESS_HTTP_CODE]: 'Senha inválida!',
    [ERROR_NOT_FOUND_HTTP_CODE]: 'Usuário não cadastrado!',
    default: 'Erro Desconhecido',
  };

  return literalHandler[statusCode] ?? literalHandler.default;
};

export const handleErrorRegister = (error: AxiosError): string => {
  const { statusCode } = handleInputErrors(error);

  const literalHandler = {
    [ERROR_CONFLICT_HTTP_CODE]: 'Esse e-mail já está cadastrado',
    default: 'Erro ao cadastrar usuário',
  };

  return literalHandler[statusCode] ?? literalHandler.default;
};

export const handleErrorViewAdminPosts = (error: AxiosError): string => {
  const { statusCode } = handleInputErrors(error);

  const literalHandler = {
    default: 'Erro ao carregar dados',
  };

  return literalHandler[statusCode] ?? literalHandler.default;
};

export const handleErrorSuggestion = (error: AxiosError): string => {
  const { statusCode } = handleInputErrors(error);

  const literalHandler = {
    default: 'Erro no servidor',
  };

  return error.message || literalHandler[statusCode] || literalHandler.default;
};

export const handleErrorProfile = (error: AxiosError): string => {
  const { statusCode } = handleInputErrors(error);

  const literalHandler = {
    default: 'Erro ao carregar dados',
  };

  return literalHandler[statusCode] ?? literalHandler.default;
};

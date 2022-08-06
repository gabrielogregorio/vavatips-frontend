import { ERROR_CONFLICT_HTTP_CODE, ERROR_NOT_ACCESS_HTTP_CODE, ERROR_NOT_FOUND_HTTP_CODE } from '@/utils/statusCode';
import Router from 'next/router';

const defaultStatusCode = {
  [ERROR_NOT_ACCESS_HTTP_CODE]: { label: 'UNAUTHORIZED', action: () => Router.push('/login') },
};

type handleInputErrorsType = {
  statusCode: number;
};

const handleInputErrors = (error: any): handleInputErrorsType => {
  const statusCode = error?.response?.status ?? 0;

  return {
    statusCode,
  };
};

export const handleDashboard = (error: any): string => {
  const { statusCode } = handleInputErrors(error);

  const resultByStatusCode = defaultStatusCode[statusCode];

  if (resultByStatusCode) {
    resultByStatusCode.action();
  }

  return 'Erro ao obter dados do dashboard';
};

export const handleErrorLogin = (error: any): string => {
  const { statusCode } = handleInputErrors(error);

  const literalHandler = {
    [ERROR_NOT_FOUND_HTTP_CODE]: 'Usuário não cadastrado!',
    [ERROR_NOT_ACCESS_HTTP_CODE]: 'Senha inválida!',
    default: 'Erro Desconhecido',
  };

  return literalHandler[statusCode] ?? literalHandler.default;
};

export const handleErrorRegister = (error: any): string => {
  const { statusCode } = handleInputErrors(error);

  const literalHandler = {
    [ERROR_CONFLICT_HTTP_CODE]: 'Esse e-mail já está cadastrado',
    default: 'Erro ao cadastrar usuário',
  };

  return literalHandler[statusCode] ?? literalHandler.default;
};

export const handleErrorViewAdminPosts = (error: any): string => {
  const { statusCode } = handleInputErrors(error);

  const literalHandler = {
    default: 'Erro ao carregar dados',
  };

  return literalHandler[statusCode] ?? literalHandler.default;
};

export const handleErrorSuggestion = (error: any): string => {
  const { statusCode } = handleInputErrors(error);

  const literalHandler = {
    default: 'Erro no servidor',
  };

  return error.message || literalHandler[statusCode] || literalHandler.default;
};

export const handleErrorProfile = (error: any): string => {
  const { statusCode } = handleInputErrors(error);

  const literalHandler = {
    default: 'Erro ao carregar dados',
  };

  return literalHandler[statusCode] ?? literalHandler.default;
};

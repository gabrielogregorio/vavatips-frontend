/* eslint-disable sonarjs/no-identical-functions */
import { ERROR_CONFLICT_HTTP_CODE, ERROR_NOT_ACCESS_HTTP_CODE, ERROR_NOT_FOUND_HTTP_CODE } from '@/utils/statusCode';
import { AxiosError } from 'axios';
import Router from 'next/router';

const defaultStatusCode = {
  [ERROR_NOT_ACCESS_HTTP_CODE]: { action: (): Promise<boolean> => Router.push('/login'), label: 'UNAUTHORIZED' },
};

type handleInputErrorsType = {
  statusCode: number;
  error: string;
  message: string;
};

const ERROR_ON_GET_STATUS = 0;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleInputErrors = (error: AxiosError<any>): handleInputErrorsType => {
  const statusCode = error?.response?.status ?? ERROR_ON_GET_STATUS;

  return {
    statusCode,
    error: error.response.data.error || '',
    message: error.response.data.message || '',
  };
};

export const handleDashboard = (error: AxiosError): string => {
  const { message } = handleInputErrors(error);

  return message;
};

export const handleErrorLogin = (error: AxiosError): string => {
  const { message } = handleInputErrors(error);

  return message;
};

export const handleErrorRegister = (error: AxiosError): string => {
  const { message } = handleInputErrors(error);

  return message;
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

import { HttpClient } from '../../libs/HttpClient';
import { NEXT_PUBLIC_API_HOST } from '../envs';
import { ApiError } from './ApiError';

export const ApiService = new HttpClient(NEXT_PUBLIC_API_HOST);

ApiService.middlewareResponse(undefined, (err) => {
  const message = err?.response?.data?.message;
  const error = err?.response?.data?.error;

  if (message && typeof message === 'string' && error && typeof error === 'string') {
    throw new ApiError(message, error);
  }

  throw new ApiError('Unknown api Error', 'UNKNOWN_ERROR');
});

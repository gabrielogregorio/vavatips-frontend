import axios, { AxiosError, AxiosResponse } from 'axios';
import * as Sentry from '@sentry/nextjs';
import { anyToString } from '@/helpers/converyAnyToString';
import { getToken } from './auth';

const axiosConfig = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_HOST,
});

axiosConfig.interceptors.request.use(async (config) => {
  const token = getToken();

  if (token) {
    return { ...config, headers: { ...config.headers, Authorization: `Bearer ${token}` } };
  }
  return config;
});

axiosConfig.interceptors.response.use(
  async (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    if (process.env.NEXT_PUBLIC_SENTRY_IS_ENABLED === 'true') {
      Sentry.captureException(error, {
        extra: {
          request: anyToString(error?.request || ''),
          response: anyToString(error?.response || ''),
        },
      });
    }
    return Promise.reject(error);
  },
);

export class Api {
  public static get(relativeUrl: string): Promise<Omit<AxiosResponse, 'config'>> {
    return axiosConfig.get(relativeUrl);
  }

  public static post(relativeUrl: string, data?: object): Promise<Omit<AxiosResponse, 'config'>> {
    return axiosConfig.post(relativeUrl, data ?? {});
  }

  public static put(relativeUrl: string, data?: object): Promise<Omit<AxiosResponse, 'config'>> {
    return axiosConfig.put(relativeUrl, data ?? {});
  }

  public static delete(relativeUrl: string): Promise<Omit<AxiosResponse, 'config'>> {
    return axiosConfig.delete(relativeUrl);
  }
}

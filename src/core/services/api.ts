import axios, { AxiosResponse } from 'axios';
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

export class Api {
  static get(relativeUrl: string): Promise<AxiosResponse> {
    return axiosConfig.get(relativeUrl);
  }

  static post(relativeUrl: string, data?: any): Promise<AxiosResponse> {
    return axiosConfig.post(relativeUrl, data ?? {});
  }

  static put(relativeUrl: string, data?: any): Promise<AxiosResponse> {
    return axiosConfig.put(relativeUrl, data ?? {});
  }

  static delete(relativeUrl: string): Promise<AxiosResponse> {
    return axiosConfig.delete(relativeUrl);
  }
}

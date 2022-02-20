import axios from 'axios';
import { getToken } from './auth';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_HOST,
});
api.interceptors.request.use(async (config) => {
  const token = getToken();

  if (token) {
    return { ...config, headers: { ...config.headers, Authorization: `Bearer ${token}` } };
  }
  return config;
});

export default api;

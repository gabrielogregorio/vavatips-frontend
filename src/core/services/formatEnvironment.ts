import { NEXT_PUBLIC_API_HOST, NEXT_PUBLIC_MODE_RUN } from '@/constants/envs';

export const formatImage = (file: string) => {
  if (NEXT_PUBLIC_MODE_RUN === 'DEVELOP') {
    return `${NEXT_PUBLIC_API_HOST}/images/${file}`;
  }
  return file;
};

import { createContext } from 'react';
import { TContextTags } from '@/types/posts';

export const ContextFilters = createContext<TContextTags>({
  filters: [],
  setFilters: null,
  setTags: null,
  tags: [],
});

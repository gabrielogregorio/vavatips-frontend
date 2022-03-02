import { createContext, useContext } from 'react';
import { TContextTags } from '@/types/posts';

export const ContextFilters = createContext<TContextTags>({
  tags: [],
  filters: [],
  setFilters: null,
  setTags: null,
});

export const useFilters = () => useContext(ContextFilters);

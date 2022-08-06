import { createContext, useContext } from 'react';
import { TContextTags } from '@/types/posts';

export const ContextFilters = createContext<TContextTags>({
  filters: [],
  setFilters: null,
  setTags: null,
  tags: [],
});

export const useFilters = () => useContext(ContextFilters);

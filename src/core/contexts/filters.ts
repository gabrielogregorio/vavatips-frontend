import { createContext, useContext } from 'react';
import { TContextTags } from '@/types/posts';

export const ContextFilters = createContext<TContextTags>({
  tags: [],
  filters: [],
  setFilters: (filters) => new Error(`do you need use context Filters ${filters}`),
  setTags: (tags) => new Error(`do you need use context Filters ${tags}`),
});

export const useFilters = () => useContext(ContextFilters);

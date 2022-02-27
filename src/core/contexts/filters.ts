import { createContext, useContext } from 'react';
import { ContextTagsInterface } from '@/interfaces/posts';

export const ContextFilters = createContext<ContextTagsInterface>({
  tags: [],
  filters: [],
  setFilters: (filters) => new Error(`do you need use context Filters ${filters}`),
  setTags: (tags) => new Error(`do you need use context Filters ${tags}`),
});

export const useFilters = () => useContext(ContextFilters);

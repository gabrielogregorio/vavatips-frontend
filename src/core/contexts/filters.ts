import { createContext, useContext } from 'react';
import { contextTagsInterface } from '@/interfaces/posts';

export const ContextFilters = createContext<contextTagsInterface>({
  tags: [],
  filters: [],
  setFilters: (filters) => new Error(`do you need use context Filters ${filters}`),
  setTags: (tags) => new Error(`do you need use context Filters ${tags}`),
});

export const useFilters = () => useContext(ContextFilters);

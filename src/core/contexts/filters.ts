import { createContext, useContext } from 'react';

interface contextTagsInterface {
  tags: string[];
  filters: string[];
  setFilters: (filter: string[]) => void;
  setTags: (tags: string[]) => void;
}

export const ContextFilters = createContext<contextTagsInterface>({
  tags: [],
  filters: [],
  setFilters: (filters) => console.log('do you need use context Filters', filters),
  setTags: (tags) => console.log('do you need use context Filters', tags),
});

export const useFilters = () => useContext(ContextFilters);

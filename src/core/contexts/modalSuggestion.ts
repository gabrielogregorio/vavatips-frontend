import { createContext, useContext } from 'react';
import { IModalContextSuggestion, IModalSuggestion } from '@/types/modal';

export const initializeModalSuggestion: IModalContextSuggestion = { active: false };

export const ContextModalSuggestion = createContext<IModalSuggestion>({
  modalSuggestion: initializeModalSuggestion,
  setModalSuggestion: null,
});

export const useModalContext = () => useContext(ContextModalSuggestion);

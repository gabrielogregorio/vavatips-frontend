import { createContext, useContext } from 'react';
import { modalContextTypeSuggestion, modalSuggestionInterface } from '@/interfaces/modal';

export const initializeModalSuggestion: modalContextTypeSuggestion = { active: false };

export const ContextModalSuggestion = createContext<modalSuggestionInterface>({
  modalSuggestion: initializeModalSuggestion,
  setModalSuggestion: null,
});

export const useModalContext = () => useContext(ContextModalSuggestion);

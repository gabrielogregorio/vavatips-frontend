import { createContext, useContext } from "react";

export type modalContextType = {
  post?: postsProps,
  active: boolean
}

export const initializeModalSuggestion:modalContextType =  {active: false}

interface modalSuggestionInterface {
  modalSuggestion: modalContextType,
  setModalSuggestion: (data: modalContextType) => void
}

export const ContextModalSuggestion = createContext<modalSuggestionInterface>({
  modalSuggestion: initializeModalSuggestion,
  setModalSuggestion: (state) => console.log('do you need use context', state)
})

export const useModalContext = () => useContext(ContextModalSuggestion)

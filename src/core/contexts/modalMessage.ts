import { createContext, useContext } from 'react';
import { modalMessageTypeContext } from '@/types/modal';

type TContextModalMessage = {
  modalMessage: modalMessageTypeContext;
  setModalMessage: (data: modalMessageTypeContext) => void;
};

export const initializeModalMessage: modalMessageTypeContext = {
  active: false,
  message: {
    msg: '',
    type: 'success',
  },
};

export const ContextModalMessage = createContext<TContextModalMessage>({
  modalMessage: initializeModalMessage,
  setModalMessage: null,
});

export const useModalMessage = () => useContext(ContextModalMessage);

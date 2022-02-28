import { createContext, useContext } from 'react';
import { modalMessageTypeContext } from '@/types/modal';

type TContextModalMessage = {
  modalMessage: modalMessageTypeContext;
  setModalMessage: (data: modalMessageTypeContext) => void;
};

export const initializeModalMessage: modalMessageTypeContext = {
  message: {
    msg: '',
    type: 'success',
  },
  active: false,
};

export const ContextModalMessage = createContext<TContextModalMessage>({
  modalMessage: initializeModalMessage,
  setModalMessage: null,
});

export const useModalMessage = () => useContext(ContextModalMessage);

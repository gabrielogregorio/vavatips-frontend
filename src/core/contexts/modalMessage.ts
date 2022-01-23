import { createContext, useContext } from 'react';
import { contextModalMessageInterface, modalMessageTypeContext } from '@/interfaces/modal';

export const initializeModalMessage: modalMessageTypeContext = {
  message: {
    msg: '',
    type: 'success',
  },
  active: false,
};

export const ContextModalMessage = createContext<contextModalMessageInterface>({
  modalMessage: initializeModalMessage,
  setModalMessage: (data) => new Error(`do you need use context Modal Message ${data}`),
});

export const useModalMessage = () => useContext(ContextModalMessage);

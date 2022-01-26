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
  setModalMessage: null,
});

export const useModalMessage = () => useContext(ContextModalMessage);

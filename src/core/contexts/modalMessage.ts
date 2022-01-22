import { createContext, useContext } from 'react';

export type modalMessageType = {
  message: modalMessageInterface;
  active: boolean;
};

interface contextModalMessageInterface {
  modalMessage: modalMessageType;
  setModalMessage: (data: modalMessageType) => void;
}

export const initializeModalMessage: modalMessageType = {
  message: {
    msg: '',
    type: 'success',
  },
  active: false,
};

export const ContextModalMessage = createContext<contextModalMessageInterface>({
  modalMessage: initializeModalMessage,
  setModalMessage: (data) => console.log('do you need use context Modal Message', data),
});

export const useModalMessage = () => useContext(ContextModalMessage);

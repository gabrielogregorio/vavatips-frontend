import { postsProps } from './posts';

export type modalType = 'success' | 'error' | '';
interface modalMessageInterface {
  msg: string;
  type: modalType;
}

export type modalMessageTypeContext = {
  message: modalMessageInterface;
  active: boolean;
};

export interface contextModalMessageInterface {
  modalMessage: modalMessageTypeContext;
  setModalMessage: (data: modalMessageTypeContext) => void;
}

export type modalContextTypeSuggestion = {
  post?: postsProps;
  active: boolean;
};

export interface modalSuggestionInterface {
  modalSuggestion: modalContextTypeSuggestion;
  setModalSuggestion: (data: modalContextTypeSuggestion) => void;
}

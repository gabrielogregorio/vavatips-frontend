import { TPostsProps } from './posts';

export type modalType = 'success' | 'error' | '';

type TModalMessage = {
  msg: string;
  type: modalType;
};

export type modalMessageTypeContext = {
  message: TModalMessage;
  active: boolean;
};

export type IModalContextSuggestion = {
  post?: TPostsProps;
  active: boolean;
};

export type IModalSuggestion = {
  modalSuggestion: IModalContextSuggestion;
  setModalSuggestion: (data: IModalContextSuggestion) => void;
};

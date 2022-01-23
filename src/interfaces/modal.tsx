/* eslint-disable no-unused-vars */
import React from 'react';
import { postsProps } from './posts';

export type modalType = 'success' | 'error' | '';

export interface modalMessageInterface {
  msg: string;
  type: modalType;
}

export interface ModalPropsBase {
  title: string;
  id: string;
  description: string;
  image: string;
  closeModal: React.MouseEventHandler<HTMLButtonElement>;
  saveModal: (id: string, title: string, image: string) => {};
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

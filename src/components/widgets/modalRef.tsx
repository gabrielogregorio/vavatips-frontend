import { ButtonCloseModal } from '@/base/modalCloseButton';
import { ReactNode } from 'react';
import { Hr } from '../base/hr';

type modalRefType = {
  children: ReactNode;
  title: string;
  closeModal: () => void;
};
export const ModalRef = ({ children, title, closeModal }: modalRefType) => (
  <div className="fixed top-0 left-0 h-screen w-full flex justify-center items-center bg-black z-modal bg-opacity-40">
    <div className="dark:bg-skin-gray-900 bg-skin-gray-300 p-5 rounded-2xl max-w-maxWidthModal w-full">
      <div className="flex items-center justify-center pb-3">
        <h1 className="flex-1 dark:text-skin-white text-skin-gray-500">{title}</h1>
        <ButtonCloseModal onClick={() => closeModal()} />
      </div>
      <Hr />
      {children}
    </div>
  </div>
);

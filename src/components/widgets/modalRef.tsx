import ButtonCloseModal from '@/base/modalCloseButton';
import { ReactNode } from 'react';

type modalRefType = {
  children: ReactNode;
  title: string;
  closeModal: () => void;
};

const ModalRef = ({ children, title, closeModal }: modalRefType) => (
  <div className="fixed top-0 left-0 h-screen w-full flex justify-center items-center bg-black z-modal bg-opacity-40">
    <div className="dark:bg-skin-bgContainer bg-skin-bgPageWhite p-5 rounded-2xl max-w-maxWidthModal w-full">
      <div className="flex items-center justify-center pb-3">
        <h1 className="flex-1 dark:text-skin-textColor text-skin-textColorGray">{title}</h1>
        <ButtonCloseModal onClick={() => closeModal()} />
      </div>
      <hr className="p-3 pl-0 pr-0" />
      {children}
    </div>
  </div>
);
export default ModalRef;

import { Button } from '@/base/button';
import { useModalMessage, initializeModalMessage } from '@/contexts/modalMessage';
import { FaTimes } from 'react-icons/fa';
import { AiOutlineCheckCircle, AiOutlineExclamationCircle } from 'react-icons/ai';
import { ReactElement } from 'react';

export const ModalMessage = (): ReactElement => {
  const { modalMessage, setModalMessage } = useModalMessage();

  const modalIcon = {
    '': null,
    error: <AiOutlineExclamationCircle className="text-skin-white text-lg" />,
    success: <AiOutlineCheckCircle className="text-skin-white text-lg" />,
  };

  return modalMessage.active ? (
    <div className="fixed flex items-center justify-center z-modalMessage bottom-0 mb-2">
      <div className="bg-skin-primary-light flex p-5 rounded-md items-center">
        <div className="pr-2 border-2 border-y-0 border-l-0 mr-2 text-skin-white">
          {modalIcon[modalMessage.message.type]}
        </div>
        <p className="w-full text-left text-base break-all text-skin-white">{modalMessage.message.msg}</p>

        <Button
          className="bg-transparent outline-none border-none text-skin-white ml-4"
          ariaLabel="close"
          onClick={(): void => setModalMessage(initializeModalMessage)}>
          <FaTimes className="text-skin-white text-sm" />
        </Button>
      </div>
    </div>
  ) : null;
};

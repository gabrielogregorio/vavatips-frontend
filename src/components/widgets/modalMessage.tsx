import Button from '@/base/button';
import { useModalMessage, initializeModalMessage } from '@/contexts/modalMessage';
import { FaTimes } from 'react-icons/fa';
import { AiOutlineCheckCircle, AiOutlineExclamationCircle } from 'react-icons/ai';

export default function ModalMessage() {
  const { modalMessage, setModalMessage } = useModalMessage();

  return modalMessage.active ? (
    <div className="fixed flex items-center justify-center z-modalMessage bottom-0 mb-2">
      <div className="bg-skin-secondary flex p-5 rounded-lg items-center">
        <div className="pr-2 border-2 border-y-0 border-l-0 mr-2 text-skin-textColorINVERSE">
          {modalMessage.message.type === 'success' ? (
            <AiOutlineCheckCircle className="text-skin-textColorINVERSE text-lg" />
          ) : null}
          {modalMessage.message.type === 'error' ? (
            <AiOutlineExclamationCircle className="text-skin-textColorINVERSE text-lg" />
          ) : null}
        </div>
        <p className="w-full text-left text-base break-all text-skin-textColorINVERSE">
          {modalMessage.message.msg}
        </p>

        <Button
          className="bg-transparent outline-none border-none text-skin-textColorINVERSE ml-4"
          ariaLabel="close"
          onClick={() => setModalMessage(initializeModalMessage)}>
          <FaTimes className="text-skin-textColorINVERSE text-sm" />
        </Button>
      </div>
    </div>
  ) : null;
}

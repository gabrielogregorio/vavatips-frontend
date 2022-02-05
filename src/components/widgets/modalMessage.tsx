import Button from '@/base/button';
import { useModalMessage, initializeModalMessage } from '@/contexts/modalMessage';
import { FaTimes } from 'react-icons/fa';
import { AiOutlineCheckCircle, AiOutlineExclamationCircle } from 'react-icons/ai';

export default function ModalMessage() {
  const { modalMessage, setModalMessage } = useModalMessage();

  return modalMessage.active ? (
    <div className="fixed flex items-center justify-center bottom-5 z-40 left-5 w-10">
      <div className="pr-10 border-2 text-skin-textColor">
        {modalMessage.message.type === 'success' ? (
          <AiOutlineCheckCircle className="text-skin-textColor text-lg" />
        ) : null}
        {modalMessage.message.type === 'error' ? (
          <AiOutlineExclamationCircle className="text-skin-textColor text-lg" />
        ) : null}
      </div>
      <p className="w-full text-left text-xl pl-10 break-all text-skin-textColor">
        {modalMessage.message.msg}
      </p>

      <Button
        className="bg-transparent outline-none border-none text-skin-textColor"
        ariaLabel="close"
        onClick={() => setModalMessage(initializeModalMessage)}>
        <FaTimes className="text-skin-textColor text-sm" />
      </Button>
    </div>
  ) : null;
}

import Button from '@/base/button';
import { useModalMessage, initializeModalMessage } from '@/contexts/modalMessage';
import { FaTimes } from 'react-icons/fa';
import { AiOutlineCheckCircle, AiOutlineExclamationCircle } from 'react-icons/ai';
import styles from '../../styles/components/modal.module.css';

export default function ModalMessage() {
  const { modalMessage, setModalMessage } = useModalMessage();

  const classNameError = modalMessage.message.type === 'error' ? styles.primary : styles.secondary;

  return modalMessage.active ? (
    <div className={`${styles.modalItem} ${classNameError}`}>
      <div className={styles.notfyIcon}>
        {modalMessage.message.type === 'success' ? <AiOutlineCheckCircle /> : null}
        {modalMessage.message.type === 'error' ? <AiOutlineExclamationCircle /> : null}
      </div>

      <p>{modalMessage.message.msg}</p>
      <Button ariaLabel="close" onClick={() => setModalMessage(initializeModalMessage)}>
        <FaTimes />
      </Button>
    </div>
  ) : null;
}

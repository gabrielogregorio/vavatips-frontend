import Button from '@/base/button';
import { useModalMessage, initializeModalMessage } from '@/contexts/modalMessage';
import styles from '../../styles/components/modal.module.css';

export default function ModalMessage() {
  const { modalMessage, setModalMessage } = useModalMessage();

  return modalMessage.active ? (
    <div
      className={styles.modalItem}
      style={{
        background: modalMessage.message.type === 'error' ? 'var(--primary)' : 'var(--secundary)',
      }}>
      <div className={styles.notfyIcon}>
        {modalMessage.message.type === 'success' ? <i className="far fa-check-circle" /> : null}
        {modalMessage.message.type === 'error' ? <i className="fas fa-exclamation-circle" /> : null}
      </div>

      <p>{modalMessage.message.msg}</p>
      <Button onClick={() => setModalMessage(initializeModalMessage)}>
        <i className="fas fa-times" />
      </Button>
    </div>
  ) : null;
}

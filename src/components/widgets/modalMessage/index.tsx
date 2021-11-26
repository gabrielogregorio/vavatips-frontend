import { useModalMessage, initializeModalMessage } from '../../../core/contexts/modalMessage'
import styles from './modal.module.css'

export const ModalMessage = () => {
  const { modalMessage, setModalMessage } = useModalMessage()

  return modalMessage.active ? (
    <div className={styles.modalItem} style={{background: modalMessage.message.type === 'error' ? 'var(--primary)' : 'var(--secundary)'}}>
      <div className={styles.notfyIcon}>
        {modalMessage.message.type === 'success' ? ( <i className="far fa-check-circle"></i> ) : null }
        {modalMessage.message.type === 'error' ? ( <i className="fas fa-exclamation-circle"></i> ) : null }
      </div>

      <p>{modalMessage.message.msg}</p>
      <button onClick={() => setModalMessage(initializeModalMessage)}>
        <i className="fas fa-times"></i>
      </button>
    </div>
  ) : null
}

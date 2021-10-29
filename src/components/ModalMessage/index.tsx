import styles from './modal.module.css'


interface ModalProps {
  data: modalMessageInterface,
  show: boolean,
  closeModal: (setCloseModal: boolean) => void,
}

export const ModalMessage = (props: ModalProps) => {

  return props.show ? (
    <div className={styles.modalItem} style={{background: props.data.type === 'error' ? 'var(--primary)' : 'var(--secundary)'}}>
      <div className={styles.notfyIcon}>
        {props.data.type === 'success' ? ( <i className="far fa-check-circle"></i> ) : null }
        {props.data.type === 'error' ? ( <i className="fas fa-exclamation-circle"></i> ) : null }
      </div>

      <p>{props.data.msg}</p>
      <button onClick={() => props.closeModal(false)}>
        <i className="fas fa-times"></i>
      </button>
    </div>
  ) : null
}

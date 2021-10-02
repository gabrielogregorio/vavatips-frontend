import React, { useEffect, useState } from 'react'
import styles from './modal.module.css'

interface ModalProps {
  text: string,
  type: modalType,
  closeModal: () => void,
}

export const ModalMessage = (props: ModalProps) => {

  return (
    <div className={styles.modalItem} style={{background: props.type === 'error' ? 'var(--primary)' : 'var(--secundary)'}}>
      <div className={styles.notfyIcon}>
        {props.type === 'success' ? ( <i className="far fa-check-circle"></i> ) : null }
        {props.type === 'error' ? ( <i className="fas fa-exclamation-circle"></i> ) : null }
      </div>

      <p>{props.text}</p>
      <button onClick={() => props.closeModal()}>
        <i className="fas fa-times"></i>
      </button>
    </div>
  )
}

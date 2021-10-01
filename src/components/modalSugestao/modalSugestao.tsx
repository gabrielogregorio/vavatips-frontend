import React, { useEffect, useState } from 'react'
import styles from './modal.module.css'


interface ModalProps {
  title: string,

  idPost: string,
  postTitle: string,
  email?: string,
  description?: string,

  closeModal: () => void,
  saveModal: (idPost: string, postTitle: string, email: string, description: string) => void
}

export const ModalSugestaoComponent = (props: ModalProps) => {
  const [ email, setEmail ] = useState<string>('')
  const [ description, setDescription ] = useState<string>('')
  const [ idPost, setIdPost ] = useState<string>('')
  const [ postTitle, setPostTitle ] = useState<string>('')

  useEffect(() => {
    if(props.description) { setDescription(props.description) }
    if(props.email) { setEmail(props.email) }
    if(props.postTitle) { setPostTitle(props.postTitle) }
    if(props.idPost) { setIdPost(props.idPost) }
  }, [])

  return (
    <div className={styles.modal}>
      <div className={styles.modalItem}>

        <div className={styles.modalTitle}>
          <h1>{props.title}</h1>
          <button onClick={() => props.closeModal()}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <hr />

        <div className="form">

        <div className="groupInput">
            <div className="groupInputSelet">
              <label htmlFor="">Dica</label>
              <input type="text" disabled value={postTitle} onChange={(e) => setPostTitle(e.target.value)}></input>
            </div>
          </div>

          <div className="groupInput">
            <div className="groupInputSelet">
              <label htmlFor="">Email para contato (Opcional)</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
            </div>
          </div>

          <div className="groupInput">
            <div className="groupInputSelet">
              <label htmlFor="">Descrição</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>
          </div>

          <div className={styles.modalActions}>
            <button onClick={() => props.closeModal()}>Cancelar</button>
            <button onClick={() => props.saveModal(idPost, postTitle, email, description)}>Adicionar</button>
          </div>
        </div>
      </div>
    </div>
  )
}

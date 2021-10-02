import React, { useEffect, useState } from 'react'
import styles from './modal.module.css'


interface ModalProps {
  title: string,

  postTitle: string,
  idPost: string,
  email?: string,
  description?: string,
  larguraTela?: number,
  alturaTela?: number

  closeModal: () => void,
  saveModal: (idPost: string, postTitle: string, email: string, description: string,  larguraTela: number, alturaTela: number) => void
}

export const ModalOfReport = (props: ModalProps) => {
  const [ postTitle, setPostTitle ] = useState<string>('')
  const [ email, setEmail ] = useState<string>('')
  const [ description, setDescription ] = useState<string>('')
  const [ larguraTela, setLarguraTela ] = useState<number>(window.screen.availWidth)
  const [ alturaTela, setAlturaTela ] = useState<number>(window.screen.availHeight)
  const [ idPost, setIdPost ] = useState<string>('')
  const [ errorMsg, setErrorMsg ] = useState<string>('')

  useEffect(() => {
    if(props.postTitle) { setPostTitle(props.postTitle) }
    if(props.email) { setEmail(props.email) }
    if(props.description) { setDescription(props.description) }
    if(props.idPost) { setIdPost(props.idPost) }
  }, [props])

  function saveModal(idPost: string, postTitle: string, email: string, description: string, larguraTela: number, alturaTela: number) {
    if(description === '' || description.trim() === '') {
      setErrorMsg('Você precisa preencher o campo Descrição com as informações')
    } else if(description.trim().length < 10) {
      setErrorMsg('Você precisa de uma descrição mais detalhada')
    } else {
      props.saveModal(idPost, postTitle, email, description, larguraTela, alturaTela)
    }
  }

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
        <p style={{color: 'var(--primary)', textAlign: 'center'}}>{errorMsg}</p>

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

          <p>Resolução de tela</p>

          <div className="groupInput">
            <div className="groupInputSelet">
              <label htmlFor="">Largura</label>
              <input type="number" value={larguraTela} onChange={(e) => setLarguraTela(parseInt(e.target.value))}></input>
            </div>

            <div className="groupInputSelet">
              <label htmlFor="">Altura</label>
              <input type="number" value={alturaTela} onChange={(e) => setAlturaTela(parseInt(e.target.value))}></input>
            </div>
          </div>

          <div className={styles.modalActions}>
            <button onClick={() => props.closeModal()}>Cancelar</button>
            <button onClick={() => saveModal(idPost, postTitle, email, description, larguraTela, alturaTela)}>Adicionar</button>
          </div>

        </div>

      </div>
    </div>

  )
}

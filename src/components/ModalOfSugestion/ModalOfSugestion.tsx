import React, { useEffect, useState } from 'react'

interface ModalProps {
  title: string,

  idPost: string,
  postTitle: string,
  email?: string,
  description?: string,

  closeModal: () => void,
  saveModal: (idPost: string, postTitle: string, email: string, description: string) => void
}

export const ModalOfSugestion = (props: ModalProps) => {
  const [ email, setEmail ] = useState<string>('')
  const [ description, setDescription ] = useState<string>('')
  const [ idPost, setIdPost ] = useState<string>('')
  const [ postTitle, setPostTitle ] = useState<string>('')
  const [ errorMsg, setErrorMsg ] = useState<string>('')

  useEffect(() => {
    if(props.description) { setDescription(props.description) }
    if(props.email) { setEmail(props.email) }
    if(props.postTitle) { setPostTitle(props.postTitle) }
    if(props.idPost) { setIdPost(props.idPost) }
  }, [props])

  function saveModal(idPost: string, postTitle: string, email: string, description: string) {
    if(description === '' || description.trim() === '') {
      setErrorMsg('Você precisa preencher o campo Descrição com as informações')
    } else if(description.trim().length < 10) {
      setErrorMsg('Você precisa de uma descrição mais detalhada')
    } else {
      props.saveModal(idPost, postTitle, email, description)
    }
  }

  return (
    <div className="modal">
      <div className="modalItem">

        <div className="modalTitle">
          <h1>{props.title}</h1>
          <button onClick={() => props.closeModal()}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <hr />

        <div className="form">
        <p className="errorMsg">{errorMsg}</p>

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

          <div className="modalActions">
            <button onClick={() => props.closeModal()}>Cancelar</button>
            <button onClick={() => saveModal(idPost, postTitle, email, description)}>Adicionar</button>
          </div>
        </div>
      </div>
    </div>
  )
}

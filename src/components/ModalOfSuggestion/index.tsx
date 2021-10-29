import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import { InputValue } from '../InputValue'
import { TextArea } from '../TextArea'

interface ModalProps {
  title: string,
  post: postsProps,
  email?: string,
  description?: string,
  show: boolean,
  closeModal: (setShowModal: boolean) => void,
  saveModal: (type: modalType, msg: string) => void
}

export const ModalOfSuggestion = (props: ModalProps) => {
  const [ email, setEmail ] = useState<string>('')
  const [ description, setDescription ] = useState<string>('')
  const [ idPost, setIdPost ] = useState<string>('')
  const [ postTitle, setPostTitle ] = useState<string>('')
  const [ errorMsg, setErrorMsg ] = useState<string>('')

  useEffect(() => {
    if(props.description) { setDescription(props.description) }
    if(props.email) { setEmail(props.email) }
    if(props.post.title) { setPostTitle(props.post.title) }
    if(props.post._id) { setIdPost(props.post._id) }
  }, [props])

  async function saveModal(idPost: string, postTitle: string, email: string, description: string) {
    if(description === '' || description.trim() === '') {
      setErrorMsg('Você precisa preencher o campo Descrição com as informações')
    } else if(description.trim().length < 10) {
      setErrorMsg('Você precisa de uma descrição mais detalhada')
    } else {
      let type: modalType = 'error'
      let msg: string = ''

      try {
        await api.post('/suggestion', { idPost, email, description })

      msg = 'Sugestão enviado com sucesso, muito obrigado!'
      type = 'success'
      } catch(error) {
        console.log(error)
        msg = 'Erro ao enviar a Sugestão. Você poderia reportar o problema aos desenvolvedores'
        type = 'error'
      }

      props.saveModal(type, msg)
    }
  }

  return props.show ? (
      <div className="modal">
      <div className="modalItem">

        <div className="modalTitle">
          <h1>{props.title}</h1>
          <button onClick={() => props.closeModal(false)}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <hr />

        <div className="form">
        <p className="errorMsg">{errorMsg}</p>

          <InputValue disabled type="text" text="Dica" value={postTitle} setValue={setPostTitle} />

          <InputValue type="email" text="Email para contato (Opcional)" value={email} setValue={setEmail} />

          <TextArea title="Descrição" value={description} setValue={setDescription} />

          <div className="modalActions">
            <button onClick={() => props.closeModal(false)}>Cancelar</button>
            <button onClick={() => saveModal(idPost, postTitle, email, description)}>Adicionar</button>
          </div>
        </div>
      </div>
    </div>
    ): null
}

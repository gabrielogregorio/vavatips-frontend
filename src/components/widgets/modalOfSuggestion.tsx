import React, { useEffect, useState } from 'react'
import { useModalMessage } from '../../core/contexts/modalMessage'
import { useModalContext, initializeModalSuggestion } from '../../core/contexts/modalSuggestion'
import api from '../../core/services/api'
import { Input } from '../base/input'
import { TextArea } from '../base/textArea'

interface ModalProps {
  title: string
}

export const ModalOfSuggestion = (props: ModalProps) => {
  const [ email, setEmail ] = useState<string>('')

  const [ description, setDescription ] = useState<string>('')
  const [ postTitle, setPostTitle ] = useState<string>('')
  const [ errorMsg, setErrorMsg ] = useState<string>('')
  const [ loading, setLoading ] = useState<boolean>(false)
  const { modalSuggestion, setModalSuggestion } = useModalContext()
  const { setModalMessage } = useModalMessage()

  useEffect(() => {
    setPostTitle(modalSuggestion.post?.title ?? '')
  }, [modalSuggestion])

  async function saveModal() {
    setLoading(true)
    const idPost = modalSuggestion.post?._id ?? ''

    if(description === '' || description.trim() === '') {
      setErrorMsg('Você precisa preencher o campo Descrição com as informações')
    } else if(description.trim().length < 10) {
      setErrorMsg('Você precisa de uma descrição mais detalhada')
    } else {
      let type: modalType = 'error'
      let msg = ''

      try {
        await api.post('/suggestion', { idPost, email, description })
        msg = 'Sugestão enviado com sucesso, muito obrigado!'
        type = 'success'
      } catch(error) {
          console.log(error)
          msg = 'Erro ao enviar a Sugestão. Você poderia reportar o problema aos desenvolvedores'
          type = 'error'
      }
      setModalSuggestion(initializeModalSuggestion)
      setModalMessage({active: true, message: {type, msg}})
    }
    setLoading(false)
  }

  return modalSuggestion.active ? (
      <div className="modal">
      <div className="modalItem">

        <div className="modalTitle">
          <h1>{props.title}</h1>
          <button onClick={() => setModalSuggestion(initializeModalSuggestion)}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <hr />

        <div className="form">
          <p className="errorMsg">{errorMsg}</p>
          {loading ? <p>Carregando</p> : null}
          <Input disabled type="text" text="Dica" value={postTitle} setValue={setPostTitle} />

          <Input type="email" text="Email para contato (Opcional)" value={email} setValue={setEmail} />

          <TextArea title="Descrição" value={description} setValue={setDescription} />

          <div className="modalActions">
            <button onClick={() =>  setModalSuggestion(initializeModalSuggestion)}>Cancelar</button>
            <button onClick={() => saveModal()}>Adicionar</button>
          </div>
        </div>
      </div>
    </div>
    ): null
}

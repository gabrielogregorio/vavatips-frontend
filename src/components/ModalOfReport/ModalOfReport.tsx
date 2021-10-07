import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import { InputValue } from '../inputValue'
import { Textarea } from '../Textarea'

interface ModalProps {
  title: string,
  post: postsProps,
  email?: string,
  description?: string,
  larguraTela?: number,
  alturaTela?: number

  closeModal: (setShowVisibility: boolean) => void,
  saveModal: (type: modalType, msg: string) => void
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
    if(props.post.title) { setPostTitle(props.post.title) }
    if(props.email) { setEmail(props.email) }
    if(props.description) { setDescription(props.description) }
    if(props.post._id) { setIdPost(props.post._id) }
  }, [props])

  async function saveModal(idPost: string, postTitle: string, email: string, description: string, larguraTela: number, alturaTela: number) {
    if(description === '' || description.trim() === '') {
      setErrorMsg('Você precisa preencher o campo Descrição com as informações')
    } else if(description.trim().length < 10) {
      setErrorMsg('Você precisa de uma descrição mais detalhada')
    } else {

      let msg: string = ''
      let type: modalType = 'error'

      try {
        await api.post('/report', { idPost, email, description, screenWidth: larguraTela, screenHeight:alturaTela })
        msg = 'Report enviado com sucesso, muito obrigado!'
        type = 'success'

      } catch(error) {
        console.log(error)
        msg = 'Erro ao enviar o Report. Você poderia reportar o problema aos desenvolvedores'
        type = 'error'
      }

      props.saveModal(type, msg)
    }
  }

  return (
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

         <div className="groupInput">
            <div className="groupInputSelet">
              <label htmlFor="">Dica</label>
              <input type="text" disabled value={postTitle} onChange={(e) => setPostTitle(e.target.value)}></input>
            </div>
          </div>


          <InputValue type="email" text="Email para contato (Opcional)" value={email} setValue={setEmail} />

          <Textarea text="Descrição" value={description} setValue={setDescription} />


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

          <div className="modalActions">
            <button onClick={() => props.closeModal(false)}>Cancelar</button>
            <button onClick={() => saveModal(idPost, postTitle, email, description, larguraTela, alturaTela)}>Adicionar</button>
          </div>

        </div>

      </div>
    </div>

  )
}

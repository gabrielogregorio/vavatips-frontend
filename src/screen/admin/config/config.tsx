import React from "react";
import { useState } from 'react'
import api from "../../../services/api";
import { NavbarComponent, navbarEnum } from "../../../components/navbar/navbar";
import { InputValue } from "../../../components/inputValue";

export const ConfigScreen = () => {
  const [ keyAccess, setKeyAccess ] = useState<string>('')
  const [ errorMsg, setErrorMsg ] = useState<string>('')
  const [ codeMsg, setCodeMsg ] = useState<string>('')

  async function handleSubmit() {
    try {
      let code = await api.post('/generate_code', {GENERATOR_CODE:keyAccess})
      setCodeMsg(code.data.code)
    } catch(error: any) {
      if(error.response.status === 404) {
        setErrorMsg('Essa não é uma chave válida!')
      } else if (error.response.status === 405) {
        setErrorMsg('Por segurança o servidor bloqueou a geração de novos convites permanentemente!')
      } else {
        setErrorMsg('Erro desconhecido no servidor!')
      }
    }
  }

  return (
    <div className="container">
      <div style={{ display: 'flex', 'flexDirection': 'column'}}>
        <NavbarComponent selected={navbarEnum.Config} />

        <div className="form">

          <h1>Gerar Convite</h1>
          <p>** !!! Somente para Devs !!! *</p>
          <p className="errorMsg">{errorMsg}</p>

          <InputValue text="Chave Secreta" value={keyAccess} setValue={setKeyAccess}/>

          <div className="groupInput">
            <div className="groupInputSelet">
              <button className="btn-primary" onClick={handleSubmit}>Gerar</button>
            </div>
          </div>
          <p>{codeMsg}</p>
        </div>
      </div>
   </div>
  )
}
import React, { useEffect, useState } from 'react'
import api from '../../../services/api'
import { NavbarComponent, navbarEnum } from '../../../components/navbar/navbar'
import { InputValue } from '../../../components/inputValue'

export const MyProfileScreen = () => {
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [password2, setPassword2] = useState<string>("")
  const [errorMsg, setErrorMsg] = useState<string>("")

  async function handleSubmit(event: any) {
    event.preventDefault()

    if(!username) {
      setErrorMsg('Você precisa preencher todos os campos')
    } else {
      if(password !== password2) {
        setErrorMsg("As senhas não combinam!")
      } else {
        try {
          await api.put('/user', {username, password})
          console.log('ok, dados alterados')
        }  catch(error: any) {
          if(error.response?.status === 409) {
            setErrorMsg("Esse e-mail já está cadastrado")
          } else {
            console.log(error)
          }
        }
      }
    }
  }

  async function getUser(): Promise<any> {
    return await api.get(`/user`)
  }

  useEffect(() => {
    getUser().then(res => {
      setUsername(res.data.username)
    })
  }, [])

  return (
    <div className="container">
     <div style={{ display: 'flex', 'flexDirection': 'column'}}>
       <NavbarComponent selected={navbarEnum.Profile} />

        <div className="form" onSubmit={handleSubmit}>
          <h1>Seu perfil</h1>
          <p>{errorMsg}</p>

          <InputValue text="Trocar nome de usuário" value={username} setValue={setUsername}/>
          <InputValue text="Digite uma nova senha" value={password} setValue={setPassword}/>
          <InputValue text="Confirme a nova senha" value={password2} setValue={setPassword2}/>

          <div className="groupInput">
            <div className="groupInputSelet">
              <button className="btn-primary">Atualizar dados</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

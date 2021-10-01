import React, { useEffect, useState } from 'react'
import api from '../../../services/api'
import { NavbarComponent, navbarEnum } from '../../../components/navbar/navbar'
import '../style.css'
import './style.css'


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
     <div className="post-local-container">
       <NavbarComponent selected={navbarEnum.Profile} />

        <form className="form" onSubmit={handleSubmit}>
          <h1>Seu perfil</h1>
          <p>{errorMsg}</p>

          <label htmlFor="">Trocar nome de usuário</label>
          <input
            type="text"
            placeholder="Digite um novo nome"
            value={username}
            onChange={e => setUsername(e.target.value)} />

          <label htmlFor="">Digite uma nova senha</label>
          <input
            type="password"
            placeholder=""
            value={password}
            onChange={e => setPassword(e.target.value)} />

          <label htmlFor="">Confirme a nova senha</label>
          <input
            type="password"
            placeholder=""
            value={password2}
            onChange={e => setPassword2(e.target.value)} />

          <button>Atualizar dados</button>
        </form>
      </div>
    </div>
  )
}

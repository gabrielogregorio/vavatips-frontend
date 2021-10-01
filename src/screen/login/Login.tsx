import React from "react"
import { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import api from "../../services/api"
import { login, getToken } from '../../services/auth'
import { NavbarComponentPublic, navbarEnumPublic } from "../../components/navbar_public/navbar";

export const LoginScreen = () => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [redirect, setRedirect] = useState<boolean>(false)
  const [errorMsg, setErroMsg] = useState<string>('')

  useEffect(() => {
    if(getToken()) {
      setRedirect(true)
    }
  }, [])

  async function handleSubmit() {
    if(!username || !password) {
      setErroMsg('Usuário ou senha não preenchido')
    } else {
      try {
        let token = await api.post('/auth', {username, password})
        login(token.data.token, token.data.id)
        setRedirect(true)

      } catch(error: any) {
        if (error.response?.status === 404) {
          setErroMsg('Usuário não cadastrado!')
        } else {
          console.log(error)
          setErroMsg('Erro ao fazer Login')
        }
      }
    }
  }

  return (
    <div className="containerAdmin">
      <div>
        <NavbarComponentPublic selected={navbarEnumPublic.Inicio} />
        <h1>Realizar Login</h1>

        <div className="form">
          {redirect ? <Redirect to="/Profile" /> : null }
          <p>Salve Ademir, bora fazer Login nessa bagaça? Responsabilidade ai em Ademir</p>
          <p>{errorMsg}</p>

          <div className="groupInput">
            <div className="groupInputItem">
              <label htmlFor="">Usuário:</label>
              <input type="text" placeholder="Usuário" onChange={e => setUsername(e.target.value)} />
            </div>
          </div>

          <div className="groupInput">
            <div className="groupInputItem">
              <label htmlFor="">Senha:</label>
              <input type="password" placeholder="******"  onChange={e => setPassword(e.target.value)}/>
            </div>
          </div>

          <Link to="Register">Fazer Cadastro</Link>

          <button onClick={() => handleSubmit()}>Login</button>

        </div>
      </div>
    </div>
  )
}

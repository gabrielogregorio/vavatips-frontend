import React from "react"
import { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import api from "../../services/api"
import './login.module.css'
import { login, getToken } from '../../services/auth'
import { useUser } from "../../context/user"

export const LoginScreen = () => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [redirect, setRedirect] = useState<boolean>(false)
  const [errorMsg, setErroMsg] = useState<string>('')
  const { setUser} = useUser()

  useEffect(() => {
    if(getToken()) {
      setRedirect(true)
    }
  }, [])

  async function handleSubmit(event: any) {
    event.preventDefault()

    if(!username || !password) {
      setErroMsg('Usuário ou senha não preenchido')
    } else {
      try {
        let token = await api.post('/auth', {username, password})
        login(token.data.token, token.data.id)
        setUser({id: token.data.id, username})
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
    <div className="container">
      <div>
        <form onSubmit={handleSubmit}>
          {redirect ? <Redirect to="/Profile" /> : null }

          <h1>Realizar Login</h1>
          <p>{errorMsg}</p>

          <label htmlFor="">Usuário:</label>
          <input type="text" placeholder="Usuário" onChange={e => setUsername(e.target.value)} />

          <label htmlFor="">Senha:</label>
          <input type="password" placeholder="******"  onChange={e => setPassword(e.target.value)}/>
          <Link to="Register">Fazer Cadastro</Link>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  )
}

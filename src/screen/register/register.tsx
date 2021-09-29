import React from "react";
import { Link, Redirect } from "react-router-dom";
import { useState } from 'react'
import api from "../../services/api";
import { login } from "../../services/auth";
import styles from './register.module.css'


export const RegisterScreen = () => {
  const [username, setUsername] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [password2, setPassword2] = useState<string>()
  const [errorMsg, setErrorMsg] = useState<string>()
  const [redirect, setRedirect] = useState<boolean>(false)

  async function handleSubmit(event: any) {
    event.preventDefault()

    if(!username || !password || !password2) {
      setErrorMsg('Você precisa preencher todos os campos')
    } else {
      if(password !== password2) {
        setErrorMsg("As senhas não combinam!")
      } else {
        try {
          // Cadastra o usuário
          await api.post('/user', {username, password})

          // Realiza Login, obtendo o token
          let token = await api.post('/auth', {username, password})

          // Realiza o login salvando os dados no localstorage
          login(token.data.token, token.data.id)

          // Saval os dados no context
          setUser({id: token.data.id, username})
          setRedirect(true)
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

  return (
    <div className={styles.container}>
      <div>
        <form onSubmit={handleSubmit}>
          {redirect ? <Redirect to="/Profile" /> : null }

          <h1>Criar uma conta</h1>
          <p>{errorMsg}</p>

          <label htmlFor="">Crie um código de cadastro</label>
          <input type="text" placeholder="Código de cadastro" />

          <label htmlFor="">Crie um nome de usuário</label>
          <input type="text" placeholder="Crie um nome de usuário" onChange={e => setUsername(e.target.value)} />

          <label htmlFor="">Digite uma senha</label>
          <input type="password" placeholder="******" onChange={e => setPassword(e.target.value)} />

          <label htmlFor="">Confirme uma senha</label>
          <input type="password" placeholder="******" onChange={e => setPassword2(e.target.value)} />

          <Link to="Login">fazer Login</Link>

          <button type="submit">Cadastrar</button>
        </form>
      </div>
   </div>
  )
}
function setUser(arg0: { id: any; username: string; }) {
  throw new Error("Function not implemented.");
}


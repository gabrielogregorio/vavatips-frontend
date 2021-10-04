import React from "react";
import { Redirect } from "react-router-dom";
import { useState } from 'react'
import api from "../../../services/api";
import { login } from "../../../services/auth";
import { NavbarComponentPublic, navbarEnumPublic } from "../../../components/navbar_public/navbar";
import { InputValue } from "../../../components/inputValue";
import { LoaderComponent } from "../../../components/loader/loader";

type accessType = "login" | "register"
export const AcessScreen = () => {
  const [ code, setCode ] = useState<string>('')
  const [ username, setUsername ] = useState<string>('')
  const [ password, setPassword ] = useState<string>('')
  const [ password2, setPassword2 ] = useState<string>('')
  const [ errorMsg, setErrorMsg ] = useState<string>('')
  const [ redirect, setRedirect ] = useState<boolean>(false)
  const [ typeAccess, setTypeAccess] = useState<accessType>('login')
  const [ activeLoader, setActiveLoader ] = useState<boolean>(false)

  function toggleAccess() {
    if(typeAccess === 'login') {
      setTypeAccess('register')
    } else {
      setTypeAccess('login')
    }
  }

  async function handleSubmit() {
    setActiveLoader(true)

    if(!username || !password || ( !password2 && typeAccess === 'register')) {
      setActiveLoader(false)
      return setErrorMsg('Você precisa preencher todos os campos')
    }

    if(password !== password2 && typeAccess === 'register') {
      setActiveLoader(false)
      return setErrorMsg("As senhas não combinam!")
    }

    try {
      // Cadastra o usuário
      if (typeAccess === 'register') {
        await api.post('/user', {username, password, code})
      }

      // Realiza Login, obtendo o token
      let token = await api.post('/auth', {username, password})

      // Realiza o login salvando os dados no localstorage
      login(token.data.token, token.data.id)

      setActiveLoader(false)
      setRedirect(true)
    } catch(error: any) {
      if(error.response?.status === 409) {
        setActiveLoader(false)
        setErrorMsg("Esse e-mail já está cadastrado")

      } else if (error.response?.status === 404) {
        setActiveLoader(false)
        setErrorMsg('Usuário não cadastrado!')

      } else if (error.response?.status === 403) {
        if (error.response?.data?.msg === 'invalid code') {
          setActiveLoader(false)
          setErrorMsg('Código de cadastro inválido')
        } else {
          setActiveLoader(false)
          setErrorMsg('Senha inválida!')
        }
      } else {
        console.log(error.response)
        setActiveLoader(false)
        setErrorMsg(`Erro Desconhecido ${error}`)
      }
    }
    setActiveLoader(false)
  }

  return (
    <div className="container">
      <div>
        <NavbarComponentPublic selected={navbarEnumPublic.Admin} />

        <div className="form">
          {redirect ? <Redirect to="/Profile" /> : null }

          <h1>{ typeAccess === 'login' ? 'Fazer Login' : 'Criar uma conta'} </h1>
          <LoaderComponent active={activeLoader} />
          <p className="errorMsg">{errorMsg}</p>

          { typeAccess === 'register' ? (
            <InputValue type="password" text="Código de cadastro" value={code} setValue={setCode}/>
          ) : null}

          <InputValue type="text" text="Usuário" value={username} setValue={setUsername}/>
          <InputValue type="password" text="Senha" value={password} setValue={setPassword}/>

          { typeAccess === 'register' ? (
            <InputValue type="password" text="Confirme uma senha" value={password2} setValue={setPassword2}/>
          ) : null}

          <div className="groupInput">
            <div className="groupInputSelet">
              <button className="btn-color-secundary" onClick={() => toggleAccess()} >{typeAccess === 'login' ? 'Fazer Cadastro' : 'Fazer Login' }</button>
              </div>
          </div>

          <div className="groupInput">
            <div className="groupInputSelet">
              <button className="btn-primary" onClick={handleSubmit}>{ typeAccess === 'register' ? 'Cadastrar' : 'Login'}</button>
            </div>
          </div>
        </div>
      </div>
   </div>
  )
}

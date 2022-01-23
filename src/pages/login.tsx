import { useEffect, useState } from 'react';
import Router from 'next/router';
import api from '../core/services/api';
import { login } from '../core/services/auth';
import NavbarComponentPublic from '../components/layout/navbar_public';
import Input from '../components/base/input';
import LoaderComponent from '../components/base/loader';
import FooterComponent from '../components/layout/footer';
import BreadcrumbComponent from '../components/widgets/breadcrumb';
import { LINKS } from '../core/data/links';
import Title from '../components/base/title';
import Button from '../components/base/button';
import { navbarEnumPublic } from '../interfaces/navbar';

type accessType = 'login' | 'register';

const breadcrumbs = [LINKS.inicio, LINKS.Login];

export default function Login() {
  const [code, setCode] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [password2, setPassword2] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [redirect, setRedirect] = useState<boolean>(false);
  const [typeAccess, setTypeAccess] = useState<accessType>('login');
  const [activeLoader, setActiveLoader] = useState<boolean>(false);

  function toggleAccess(): boolean {
    if (typeAccess === 'login') {
      setTypeAccess('register');
    } else {
      setTypeAccess('login');
    }
    return true;
  }

  function submitData(): boolean {
    setActiveLoader(true);

    if (!username || !password || (!password2 && typeAccess === 'register')) {
      setActiveLoader(false);
      setErrorMsg('Você precisa preencher todos os campos');
      return false;
    }

    if (password !== password2 && typeAccess === 'register') {
      setActiveLoader(false);
      setErrorMsg('As senhas não combinam!');
      return false;
    }

    if (typeAccess === 'register') {
      api
        .post('/user', { username, password, code })
        .then((res) => console.log(res))
        .catch((error) => console.log(error));
    }

    api
      .post('/auth', { username, password })
      .then((token) => {
        login(token.data.token, token.data.id);
        setActiveLoader(false);
        setRedirect(true);
      })
      .catch((error) => {
        if (error.response?.status === 409) {
          setActiveLoader(false);
          setErrorMsg('Esse e-mail já está cadastrado');
        } else if (error.response?.status === 404) {
          setActiveLoader(false);
          setErrorMsg('Usuário não cadastrado!');
        } else if (error.response?.status === 403) {
          if (error.response?.data?.msg === 'invalid code') {
            setActiveLoader(false);
            setErrorMsg('Código de cadastro inválido');
          } else {
            setActiveLoader(false);
            setErrorMsg('Senha inválida!');
          }
        } else {
          console.log(error.response);
          setActiveLoader(false);
          setErrorMsg(`Erro Desconhecido ${error}`);
        }
      })
      .finally(() => {
        setActiveLoader(false);
        return true;
      });
    return true;
  }

  useEffect(() => {
    if (redirect) {
      Router.push('/admin/dashboard');
    }
  }, [redirect]);

  return (
    <div className="container">
      <NavbarComponentPublic selected={navbarEnumPublic.Mistic} />
      <BreadcrumbComponent admin breadcrumbs={breadcrumbs} />

      <div className="subcontainer">
        <div className="form">
          <Title>{typeAccess === 'login' ? 'Fazer Login' : 'Criar uma conta'} </Title>

          <LoaderComponent active={activeLoader} />
          <p className="errorMsg">{errorMsg}</p>

          {typeAccess === 'register' ? (
            <Input type="password" text="Código de cadastro" value={code} setValue={setCode} />
          ) : null}

          <Input type="text" text="Usuário" value={username} setValue={setUsername} />
          <Input type="password" text="Senha" value={password} setValue={setPassword} />

          {typeAccess === 'register' ? (
            <Input type="password" text="Confirme uma senha" value={password2} setValue={setPassword2} />
          ) : null}

          <div className="groupInput">
            <div className="groupInputSelect">
              <Button className="btn-color-secundary" onClick={() => toggleAccess()}>
                {typeAccess === 'login' ? 'Fazer Cadastro' : 'Fazer Login'}
              </Button>
            </div>
          </div>

          <div className="groupInput">
            <div className="groupInputSelect">
              <Button className="btn-primary" onClick={() => submitData()}>
                {typeAccess === 'register' ? 'Cadastrar' : 'Login'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <FooterComponent color="primary" />
    </div>
  );
}

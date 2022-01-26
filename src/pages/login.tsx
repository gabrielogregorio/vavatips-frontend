import { useEffect, useState } from 'react';
import Router from 'next/router';
import api from '@/services/api';
import { login } from '@/services/auth';
import NavbarComponentPublic from '@/layout/navbar_public';
import Input from '@/base/input';
import LoaderComponent from '@/base/loader';
import FooterComponent from '@/layout/footer';
import BreadcrumbComponent from '@/widgets/breadcrumb';
import LINKS from '@/data/links';
import Title from '@/base/title';
import Button from '@/base/button';
import { navbarEnumPublic } from '@/interfaces/navbar';

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

  async function submitData(): Promise<any> {
    setActiveLoader(true);

    if (!username || !password || (!password2 && typeAccess === 'register')) {
      setErrorMsg('Você precisa preencher todos os campos');
      setActiveLoader(false);
      return false;
    }

    if (password !== password2 && typeAccess === 'register') {
      setErrorMsg('As senhas não combinam!');
      setActiveLoader(false);
      return false;
    }

    if (typeAccess === 'register') {
      try {
        await api.post('/user', { username, password, code });
      } catch (error) {
        if (error?.response?.status === 409) {
          setErrorMsg('Esse e-mail já está cadastrado');
          setActiveLoader(false);
          return false;
        }
        setErrorMsg('Erro ao cadastrar usuário');
        setActiveLoader(false);
        return true;
      }
    }

    try {
      const token = await api.post('/auth', { username, password });
      login(token.data.token);
      setActiveLoader(false);
      setRedirect(true);
    } catch (error) {
      if (error?.response?.status === 404) {
        setActiveLoader(false);
        setErrorMsg('Usuário não cadastrado!');
      } else if (error?.response?.status === 403) {
        setActiveLoader(false);
        setErrorMsg('Senha inválida!');
      } else {
        setActiveLoader(false);
        setErrorMsg(`Erro Desconhecido`);
      }
    }

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

      <div className="sub__container">
        <div className="form">
          <Title>{typeAccess === 'login' ? 'Fazer Login' : 'Criar uma conta'} </Title>

          <LoaderComponent active={activeLoader} />
          <p className="errorMsg">{errorMsg}</p>

          {typeAccess === 'register' ? (
            <Input name="keyAccess" type="password" text="Código de cadastro" value={code} setValue={setCode} />
          ) : null}

          <Input name="username" type="text" text="Usuário" value={username} setValue={setUsername} />
          <Input name="password" type="password" text="Senha" value={password} setValue={setPassword} />

          {typeAccess === 'register' ? (
            <Input
              name="confirmPassword"
              type="password"
              text="Confirme uma senha"
              value={password2}
              setValue={setPassword2}
            />
          ) : null}

          <div className="groupInput">
            <div className="groupInputSelect">
              <Button className="btn-color-secondary" onClick={() => toggleAccess()}>
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

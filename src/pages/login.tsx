import { useEffect, useState } from 'react';
import Router from 'next/router';
import { api } from '@/services/api';
import { Input } from '@/base/input';
import { Loader } from '@/base/loader';
import { Footer } from '@/layout/footer';
import { Breadcrumb } from '@/widgets/breadcrumb';
import { LINKS } from '@/data/links';
import { Title } from '@/base/title';
import { Button } from '@/base/button';
import { navbarEnum } from '@/enums/navbar';
import { Layout } from '@/layout/layout';
import { ErrorMsg } from '@/base/errorMsg';
import { GroupInput } from '@/base/groupInput';
import { SubContainer } from '@/base/subContainer';
import { Navbar } from '@/layout/navbar';
import { modelNavbarPublic } from '@/schemas/navbar';
import { Form } from '@/base/Form';
import { login } from '../core/services/auth';

type accessType = 'login' | 'register';

const breadcrumbs = [LINKS.inicio, LINKS.Login];

const Login = () => {
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

  async function submitData(): Promise<boolean | void> {
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
    <Layout>
      <Navbar selected={navbarEnum.Mistic} modelNavbar={modelNavbarPublic} />
      <Breadcrumb breadcrumbs={breadcrumbs} />

      <SubContainer>
        <Form>
          <Title>{typeAccess === 'login' ? 'Fazer Login' : 'Criar uma conta'} </Title>

          <Loader active={activeLoader} />
          <ErrorMsg msg={errorMsg} />

          {typeAccess === 'register' ? (
            <Input
              name="keyAccess"
              type="password"
              text="Código de cadastro"
              value={code}
              setValue={setCode}
            />
          ) : null}

          <Input
            name="username"
            type="text"
            text="Usuário"
            value={username}
            setValue={setUsername}
          />
          <Input
            name="password"
            type="password"
            text="Senha"
            value={password}
            setValue={setPassword}
          />

          {typeAccess === 'register' ? (
            <Input
              name="confirmPassword"
              type="password"
              text="Confirme uma senha"
              value={password2}
              setValue={setPassword2}
            />
          ) : null}

          <GroupInput>
            <Button
              className="dark:text-skin-white text-skin-gray-500"
              onClick={() => toggleAccess()}>
              {typeAccess === 'login' ? 'Fazer Cadastro' : 'Fazer Login'}
            </Button>
          </GroupInput>

          <GroupInput>
            <Button
              className="text-skin-white bg-skin-secondary-light rounded-xl p-1"
              onClick={() => submitData()}>
              {typeAccess === 'register' ? 'Cadastrar' : 'Login'}
            </Button>
          </GroupInput>
        </Form>
      </SubContainer>

      <Footer />
    </Layout>
  );
};
export default Login;

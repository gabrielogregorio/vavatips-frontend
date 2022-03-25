import { useEffect, useState } from 'react';
import Router from 'next/router';
import { api } from '@/services/api';
import { Input } from '@/base/input';
import { Loader } from '@/base/loader';
import { Footer } from '@/layout/footer';
import { Breadcrumb } from '@/widgets/breadcrumb';
import LINKS from '@/data/links.json';
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
import { useForm } from 'react-hook-form';
import { login } from '@/services/auth';
import { schemaLogin } from '@/handlers/forms';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';

const breadcrumbs = [LINKS.inicio, LINKS.Login];

export type registrationFormFields = {
  username: string;
  password: string;
};

const Login = () => {
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [redirect, setRedirect] = useState<boolean>(false);
  const [activeLoader, setActiveLoader] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<registrationFormFields>({ resolver: yupResolver(schemaLogin) });

  useEffect(() => {
    if (redirect) {
      Router.push('/admin/dashboard');
    }
  }, [redirect]);

  const onSubmit = async ({ username, password }) => {
    setActiveLoader(true);

    try {
      const token = await api.post('/auth', { username, password });
      login(token.data.token);
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
    } finally {
      setActiveLoader(false);
    }
  };

  return (
    <Layout>
      <Navbar selected={navbarEnum.Mistic} modelNavbar={modelNavbarPublic} />
      <Breadcrumb breadcrumbs={breadcrumbs} />

      <SubContainer>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Title>Login</Title>

          <Loader active={activeLoader} />
          <ErrorMsg msg={errorMsg} />

          <Input
            placeholder="Digite seu usuário"
            name="username"
            type="text"
            label="Usuário"
            register={register}
            errors={errors}
          />

          <Input
            placeholder="Digite sua senha"
            name="password"
            type="password"
            label="Senha"
            register={register}
            errors={errors}
          />

          <GroupInput>
            <p className=" flex flex-col   py-1">
              <span className="text-xs text-gray-500 dark:text-white text-center">Recebeu um código de cadastro?</span>
              <Link href="/register" passHref>
                <a className="text-xs text-center text-secondary ml-1" href="#/">
                  Fazer cadastro
                </a>
              </Link>
            </p>
          </GroupInput>

          <GroupInput>
            <Button type="submit" className="text-skin-white bg-skin-secondary-light rounded-md p-2 text-sm">
              Login
            </Button>
          </GroupInput>
        </Form>
      </SubContainer>

      <Footer />
    </Layout>
  );
};
export default Login;

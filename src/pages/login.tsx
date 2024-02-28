import { ReactElement, useEffect } from 'react';
import Router from 'next/router';
import { Input } from '@/base/input';
import { Loader } from '@/base/loader';
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
import { schemaLogin } from '@/handlers/forms';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useLoginAndSetToken } from '@/hooks/useLoginAndSetToken';
import { Footer } from '@/layout/footer';

const breadcrumbs = [LINKS.inicio, LINKS.Login];

export type registrationFormFields = {
  username: string;
  password: string;
};

const Login = (): ReactElement => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<registrationFormFields>({ resolver: yupResolver(schemaLogin) });

  const { tryLogin, errorMsg, redirect, isLoading } = useLoginAndSetToken();

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
        <Form onSubmit={handleSubmit(tryLogin)}>
          <Title>Login</Title>

          <Loader active={isLoading} />
          <ErrorMsg msg={errorMsg} />

          <Input
            placeholder="Digite seu usuário"
            name="username"
            type="text"
            label="Usuário"
            register={register('username')}
            errors={errors}
            isSubmitted={isSubmitted}
          />

          <Input
            placeholder="Digite sua senha"
            name="password"
            type="password"
            label="Senha"
            register={register('password')}
            errors={errors}
            isSubmitted={isSubmitted}
          />

          <GroupInput>
            <p className=" flex flex-col   py-1">
              <span className="text-xs text-gray-500 dark:text-white text-center">Recebeu um código de cadastro?</span>
              <Link href="/register" className="text-xs text-center text-secondary ml-1">
                Fazer cadastro
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

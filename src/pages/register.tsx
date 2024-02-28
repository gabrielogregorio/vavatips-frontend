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
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { schemaRegister } from '@/handlers/forms';
import { useRegister } from '@/hooks/useRegister';
import { Footer } from '@/layout/footer';

const breadcrumbs = [LINKS.inicio, LINKS.Login];

export type registrationFormFields = {
  username: string;
  password: string;
  keyCode: string;
  passwordConfirmation: string;
};

const Register = (): ReactElement => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<registrationFormFields>({ resolver: yupResolver(schemaRegister) });

  const { tryRegister, errorMsg, redirect, activeLoader } = useRegister();

  useEffect(() => {
    if (redirect) {
      Router.push('/login');
    }
  }, [redirect]);

  return (
    <Layout>
      <Navbar selected={navbarEnum.Mistic} modelNavbar={modelNavbarPublic} />
      <Breadcrumb breadcrumbs={breadcrumbs} />

      <SubContainer>
        <Form onSubmit={handleSubmit(tryRegister)}>
          <Title>Criar uma conta</Title>

          <Loader active={activeLoader} />
          <ErrorMsg msg={errorMsg} />

          <Input
            placeholder="Digite seu código de acesso"
            name="keyCode"
            register={register('keyCode')}
            type="password"
            label="Código"
            errors={errors}
          />

          <Input
            placeholder="Digite seu usuário"
            name="username"
            type="text"
            label="Usuário"
            register={register('username')}
            errors={errors}
          />

          <Input
            placeholder="Digite sua senha"
            name="password"
            type="password"
            label="Senha"
            register={register('password')}
            errors={errors}
          />

          <Input
            placeholder="Confirme sua senha"
            name="passwordConfirmation"
            type="password"
            label="Confirme uma senha"
            register={register('passwordConfirmation')}
            errors={errors}
          />

          <GroupInput>
            <p className="flex flex-col  py-1 ml-1">
              <span className="text-xs text-gray-500 dark:text-white text-center">Já tem cadastro?</span>
              <Link href="/login" className="text-xs text-center text-secondary">
                Fazer Login
              </Link>
            </p>
          </GroupInput>
          <GroupInput>
            <Button type="submit" className="text-skin-white bg-skin-secondary-light rounded-md p-2 text-sm">
              Cadastrar
            </Button>
          </GroupInput>
        </Form>
      </SubContainer>

      <Footer />
    </Layout>
  );
};
export default Register;

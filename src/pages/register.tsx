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
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { schemaRegister } from '@/handlers/forms';

const breadcrumbs = [LINKS.inicio, LINKS.Login];

export type registrationFormFields = {
  username: string;
  password: string;
};

const Register = () => {
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [redirect, setRedirect] = useState<boolean>(false);
  const [activeLoader, setActiveLoader] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<registrationFormFields>({ resolver: yupResolver(schemaRegister) });

  useEffect(() => {
    if (redirect) {
      Router.push('/login');
    }
  }, [redirect]);

  const onSubmit = async ({ keyCode, username: usernameLocal, password: passwordLocal }) => {
    setActiveLoader(true);

    try {
      await api.post('/user', { username: usernameLocal, password: passwordLocal, code: keyCode });
      setRedirect(true);
    } catch (error) {
      if (error?.response?.status === 409) {
        setErrorMsg('Esse e-mail já está cadastrado');
        setActiveLoader(false);
      } else {
        setErrorMsg('Erro ao cadastrar usuário');
        setActiveLoader(false);
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
          <Title>Criar uma conta</Title>

          <Loader active={activeLoader} />
          <ErrorMsg msg={errorMsg} />

          <Input
            placeholder="Digite seu código de acesso"
            name="keyCode"
            register={register}
            type="password"
            label="Código"
            errors={errors}
          />

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

          <Input
            placeholder="Confirme sua senha"
            name="passwordConfirmation"
            type="password"
            label="Confirme uma senha"
            register={register}
            errors={errors}
          />
          <GroupInput>
            <p className="flex flex-col  py-1 ml-1">
              <span className="text-xs text-gray-500 dark:text-white text-center">Já tem cadastro?</span>
              <Link href="/login">
                <a className="text-xs text-center text-secondary" href="#/">
                  Fazer Login
                </a>
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

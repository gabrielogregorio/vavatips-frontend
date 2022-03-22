import { useEffect, useState } from 'react';
import { Navbar } from '@/layout/navbar';
import { Input } from '@/base/input';
import { Loader } from '@/base/loader';
import { Footer } from '@/layout/footer';
import { Breadcrumb } from '@/widgets/breadcrumb';
import { Title } from '@/base/title';
import { api } from '@/services/api';
import { navbarEnum } from '@/enums/navbar';
import Router from 'next/router';
import { Layout } from '@/layout/layout';
import { SubContainer } from '@/base/subContainer';
import { Form } from '@/base/Form';
import { modelNavbarAdmin } from '@/schemas/navbar';
import { logout } from '@/services/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Button } from '@/base/button';
import { schemaUpdateProfile } from '@/handlers/forms';

const breadcrumbs = [
  { url: navbarEnum.Dashboard, text: 'admin' },
  { url: navbarEnum.Dashboard, text: 'perfil' },
];

export type registrationFormFields = {
  username: string;
  password: string;
  passwordConfirmation: string;
};

const Profile = () => {
  const [activeLoader, setActiveLoader] = useState<boolean>(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<registrationFormFields>({
    resolver: yupResolver(schemaUpdateProfile),
    defaultValues: {},
  });

  function handleLogout() {
    logout();
    Router.push('/login');
  }

  useEffect(() => {
    api
      .get(`/user`)
      .then(({ data }) => {
        const { username: usernameLocal } = data;

        const formToReset = {
          username: usernameLocal,
        };

        reset(formToReset);
      })
      .finally(() => {
        setActiveLoader(false);
      });
  }, [reset]);

  const onSubmit = async () => {};

  return (
    <Layout>
      <Navbar selected={navbarEnum.Profile} modelNavbar={modelNavbarAdmin} />
      <Breadcrumb breadcrumbs={breadcrumbs} />

      <SubContainer>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Title>Seu perfil</Title>
          <Loader active={activeLoader} />

          {activeLoader === false ? (
            <>
              <Input
                placeholder=""
                name="username"
                type="text"
                label="Trocar nome de usuário"
                register={register}
                errors={errors}
              />
              <Input
                placeholder=""
                name="password"
                type="password"
                label="Digite uma nova senha"
                register={register}
                errors={errors}
              />
              <Input
                placeholder=""
                name="passwordConfirmation"
                type="password"
                label="Confirme a nova senha"
                register={register}
                errors={errors}
              />

              <Button className="text-skin-primary-light border-none mt-2" onClick={() => handleLogout()}>
                logoff
              </Button>

              <Button
                className="bg-skin-primary-light text-skin-white border-skin-primary-light mt-2 p-1"
                type="submit">
                Atualizar dados
              </Button>
            </>
          ) : null}
        </Form>
      </SubContainer>
      <Footer />
    </Layout>
  );
};
export default Profile;

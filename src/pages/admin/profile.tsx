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
import { ButtonForm } from '@/base/buttonForm';
import { logout } from '@/services/auth';

const breadcrumbs = [
  { url: navbarEnum.Dashboard, text: 'admin' },
  { url: navbarEnum.Dashboard, text: 'perfil' },
];

const Profile = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [password2, setPassword2] = useState<string>('');
  const [activeLoader, setActiveLoader] = useState<boolean>(true);

  async function loadProfile() {
    api
      .get(`/user`)
      .then((profile) => {
        const profileJson = profile.data.username;
        setUsername(profileJson);
      })
      .finally(() => {
        setActiveLoader(false);
      });
  }
  useEffect(() => {
    loadProfile();
  }, []);

  function handleLogout() {
    logout();
    Router.push('/login');
  }
  return (
    <Layout>
      <Navbar selected={navbarEnum.Profile} modelNavbar={modelNavbarAdmin} />
      <Breadcrumb breadcrumbs={breadcrumbs} />

      <SubContainer>
        <Form>
          <Title>Seu perfil</Title>
          <Loader active={activeLoader} />

          {activeLoader === false ? (
            <>
              <Input
                name="username"
                type="text"
                text="Trocar nome de usuário"
                value={username}
                setValue={setUsername}
              />
              <Input
                name="password"
                type="password"
                text="Digite uma nova senha"
                value={password}
                setValue={setPassword}
              />
              <Input
                name="confirmPassword"
                type="password"
                text="Confirme a nova senha"
                value={password2}
                setValue={setPassword2}
              />

              <ButtonForm
                className="text-skin-primary-light border-none mt-2"
                onClick={() => handleLogout()}>
                logoff
              </ButtonForm>

              <ButtonForm
                className="bg-skin-primary-light text-skin-white border-skin-primary-light mt-2 p-1"
                onClick={() => null}>
                Atualizar dados
              </ButtonForm>
            </>
          ) : null}
        </Form>
      </SubContainer>
      <Footer />
    </Layout>
  );
};
export default Profile;

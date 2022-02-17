import { useEffect, useState } from 'react';
import NavbarComponent from '@/layout/navbar';
import Input from '@/base/input';
import LoaderComponent from '@/base/loader';
import FooterComponent from '@/layout/footer';
import BreadcrumbComponent from '@/widgets/breadcrumb';
import Title from '@/base/title';
import api from '@/services/api';
import navbarEnum from '@/interfaces/navbar';
import Router from 'next/router';
import LayoutComponent from '@/layout/layout';
import SubContainer from '@/base/subContainer';
import FormComponent from '@/base/Form';
import { modelNavbarAdmin } from '@/schemas/navbar';
import ButtonForm from '@/base/buttonForm';
import { logout } from '../../core/services/auth';

const breadcrumbs = [
  { url: navbarEnum.Dashboard, text: 'admin' },
  { url: navbarEnum.Dashboard, text: 'perfil' },
];

const MyProfileScreen = () => {
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
    <LayoutComponent>
      <NavbarComponent selected={navbarEnum.Profile} modelNavbar={modelNavbarAdmin} />
      <BreadcrumbComponent admin breadcrumbs={breadcrumbs} />

      <SubContainer>
        <FormComponent>
          <Title>Seu perfil</Title>
          <LoaderComponent active={activeLoader} />

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
                className="text-skin-secondary border-none mt-2"
                onClick={() => handleLogout()}>
                logoff
              </ButtonForm>

              <ButtonForm
                className="bg-skin-secondary text-skin-textColorInDarkness border-skin-secondary mt-2 p-1"
                onClick={() => {}}>
                Atualizar dados
              </ButtonForm>
            </>
          ) : null}
        </FormComponent>
      </SubContainer>
      <FooterComponent />
    </LayoutComponent>
  );
};
export default MyProfileScreen;

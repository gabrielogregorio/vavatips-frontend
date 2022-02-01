import React, { useEffect, useState } from 'react';
import NavbarComponent from '@/layout/navbar';
import Input from '@/base/input';
import LoaderComponent from '@/base/loader';
import FooterComponent from '@/layout/footer';
import BreadcrumbComponent from '@/widgets/breadcrumb';
import Title from '@/base/title';
import Button from '@/base/button';
import { logout } from '@/services/auth';
import api from '@/services/api';
import { navbarEnum } from '@/interfaces/navbar';
import Router from 'next/router';
import LayoutComponent from '../../components/layout/layout';

const breadcrumbs = [
  { url: navbarEnum.Dashboard, text: 'admin' },
  { url: navbarEnum.Dashboard, text: 'perfil' },
];

export default function MyProfileScreen() {
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
      <div className="container">
        <NavbarComponent selected={navbarEnum.Profile} />
        <BreadcrumbComponent admin breadcrumbs={breadcrumbs} />

        <div className="sub__container">
          <div className="form">
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

                <div className="groupInput">
                  <div className="groupInputSelect">
                    <Button onClick={() => handleLogout()} className="btn-color-secondary">
                      logoff
                    </Button>
                  </div>
                </div>

                <div className="groupInput">
                  <div className="groupInputSelect">
                    <Button className="btn-secondary">Atualizar dados</Button>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
        <FooterComponent />
      </div>
    </LayoutComponent>
  );
}

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

const breadcrumbs = [
  { url: '/Dashboard', text: 'administrativo' },
  { url: '/Dashboard', text: 'perfil' },
];

export default function MyProfileScreen() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [password2, setPassword2] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [activeLoader, setActiveLoader] = useState<boolean>(true);

  async function handleSubmit(event: any) {
    event.preventDefault();

    if (!username) {
      setErrorMsg('Você precisa preencher todos os campos');
    } else if (password !== password2) {
      setErrorMsg('As senhas não combinam!');
    } else {
      try {
        await api.put('/user', { username, password });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if (error.response?.status === 409) {
          setErrorMsg('Esse e-mail já está cadastrado');
        }
      }
    }
  }

  async function loadProfile() {
    const profileResponse = api.get(`/user`);

    try {
      const [profile] = await Promise.all([profileResponse]);
      const profileJson = profile.data.username;
      setUsername(profileJson);
      setActiveLoader(false);
    } catch (error) {
      logout();
      setActiveLoader(false);
    }
  }
  useEffect(() => {
    loadProfile();
  }, []);
  return (
    <div className="container">
      <NavbarComponent selected={navbarEnum.Profile} />
      <BreadcrumbComponent admin breadcrumbs={breadcrumbs} />

      <div className="sub__container">
        <div className="form" onSubmit={handleSubmit}>
          <Title>Seu perfil</Title>
          <LoaderComponent active={activeLoader} />
          <p>{errorMsg}</p>

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
                  <Button onClick={() => logout()} className="btn-color-secondary">
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
      <FooterComponent color="secondary" />
    </div>
  );
}

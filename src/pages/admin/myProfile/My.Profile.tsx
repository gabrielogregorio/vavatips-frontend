import React, { useEffect, useState } from 'react';
import api from '../../../core/services/api';
import { NavbarComponent, navbarEnum } from '../../../components/layout/navbar';
import { Input } from '../../../components/base/input';
import { logout } from '../../../core/services/auth';
import { LoaderComponent } from '../../../components/base/loader';
import { FooterComponent } from '../../../components/layout/footer';
import { BreadcrumbComponent } from '../../../components/widgets/breadcrumb';

const breadcrumbs = [
  { url: '/Dashboard', text: 'administrativo' },
  { url: '/Dashboard', text: 'perfil' },
];

export const MyProfileScreen = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [password2, setPassword2] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [activeLoader, setActiveLoader] = useState<boolean>(true);

  async function handleSubmit(event: any) {
    event.preventDefault();

    if (!username) {
      setErrorMsg('Você precisa preencher todos os campos');
    } else {
      if (password !== password2) {
        setErrorMsg('As senhas não combinam!');
      } else {
        try {
          await api.put('/user', { username, password });
          console.log('ok, dados alterados');
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          if (error.response?.status === 409) {
            setErrorMsg('Esse e-mail já está cadastrado');
          } else {
            console.log(error);
          }
        }
      }
    }
  }

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    console.log('load profile');
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

  return (
    <div className="container">
      <NavbarComponent selected={navbarEnum.Profile} />
      <BreadcrumbComponent admin breadcrumbs={breadcrumbs} />

      <div className="subcontainer">
        <div className="form" onSubmit={handleSubmit}>
          <h1>Seu perfil</h1>
          <LoaderComponent active={activeLoader} />
          <p>{errorMsg}</p>

          {activeLoader === false ? (
            <>
              <Input
                type="text"
                text="Trocar nome de usuário"
                value={username}
                setValue={setUsername}
              />
              <Input
                type="password"
                text="Digite uma nova senha"
                value={password}
                setValue={setPassword}
              />
              <Input
                type="password"
                text="Confirme a nova senha"
                value={password2}
                setValue={setPassword2}
              />

              <div className="groupInput">
                <div className="groupInputSelet">
                  <button
                    onClick={() => logout()}
                    className="btn-color-secundary">
                    logoff
                  </button>
                </div>
              </div>

              <div className="groupInput">
                <div className="groupInputSelet">
                  <button className="btn-secundary">Atualizar dados</button>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
      <FooterComponent color="secundary" />
    </div>
  );
};

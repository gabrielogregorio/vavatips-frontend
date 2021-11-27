import { useState } from 'react';
import api from '../../core/services/api';
import { NavbarComponent, navbarEnum } from '../../components/layout/navbar';
import { Input } from '../../components/base/input';
import { FooterComponent } from '../../components/layout/footer';
import { BreadcrumbComponent } from '../../components/widgets/breadcrumb';

const breadcrumbs = [
  { url: '/Dashboard', text: 'administrativo' },
  { url: '/Config', text: 'Configs' },
];

export const ConfigScreen = () => {
  const [keyAccess, setKeyAccess] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [codeMsg, setCodeMsg] = useState<string>('');

  async function handleSubmit() {
    try {
      const code = await api.post('/generate_code', {
        GENERATOR_CODE: keyAccess,
      });
      setCodeMsg(code.data.code);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response.status === 404) {
        setErrorMsg('Essa não é uma chave válida!');
      } else if (error.response.status === 405) {
        setErrorMsg(
          'Por segurança o servidor bloqueou a geração de novos convites permanentemente!',
        );
      } else {
        setErrorMsg('Erro desconhecido no servidor!');
      }
    }
  }

  return (
    <div className="container">
      <NavbarComponent selected={navbarEnum.Config} />
      <BreadcrumbComponent admin breadcrumbs={breadcrumbs} />

      <div className="subcontainer">
        <div className="form">
          <h1>Gerar Convite</h1>
          <p>** !!! Somente para Devs !!! *</p>
          <p className="errorMsg">{errorMsg}</p>

          <Input
            type="password"
            text="Chave Secreta"
            value={keyAccess}
            setValue={setKeyAccess}
          />

          <div className="groupInput">
            <div className="groupInputSelet">
              <button className="btn-secundary" onClick={handleSubmit}>
                Gerar
              </button>
            </div>
          </div>
          <p>{codeMsg}</p>
        </div>
      </div>
      <FooterComponent color="secundary" />
    </div>
  );
};

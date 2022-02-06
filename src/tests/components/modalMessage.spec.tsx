import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useEffect } from 'react';
import ModalMessage from '@/widgets/modalMessage';
import { useModalMessage } from '@/contexts/modalMessage';
import MockApp from '@/mock/App.Mock';

function ComponentSetup() {
  const { setModalMessage } = useModalMessage();
  const msg = 'Sugestão enviado com sucesso, muito obrigado!';
  const type = 'success';

  useEffect(() => {
    setModalMessage({ active: true, message: { type, msg } });
  }, []);

  return <ModalMessage />;
}

function ComponentSetupWithError() {
  const { setModalMessage } = useModalMessage();
  const msg = 'Erro desconhecido';
  const type = 'error';

  useEffect(() => {
    setModalMessage({ active: true, message: { type, msg } });
  }, []);

  return <ModalMessage />;
}

describe('<ModalMessage />', () => {
  it('should render modal setup error', async () => {
    render(
      <MockApp>
        <ComponentSetup />
      </MockApp>,
    );

    expect(screen.getByText('Sugestão enviado com sucesso, muito obrigado!')).toBeInTheDocument();
    userEvent.click(screen.getByRole('button'));
    expect(
      screen.queryByText('Sugestão enviado com sucesso, muito obrigado!'),
    ).not.toBeInTheDocument();
  });

  it('should render modal setup error', async () => {
    render(
      <MockApp>
        <ComponentSetupWithError />
      </MockApp>,
    );

    expect(screen.getByText('Erro desconhecido')).toBeInTheDocument();
    userEvent.click(screen.getByRole('button'));
    expect(screen.queryByText('Erro desconhecido')).not.toBeInTheDocument();
  });
});

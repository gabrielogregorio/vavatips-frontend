import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useEffect, useState } from 'react';
import ModalMessage from '@/widgets/modalMessage';
import { useModalMessage } from '@/contexts/modalMessage';
import MockApp from '@/mock/App.Mock';

const ComponentSetup = () => {
  const { setModalMessage } = useModalMessage();
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const msg = 'Sugestão enviada com sucesso, muito obrigado!';
  const type = 'success';

  useEffect(() => {
    if (isFirstLoading) {
      setModalMessage({ active: true, message: { type, msg } });
      setIsFirstLoading(false);
    }
  }, [isFirstLoading, setModalMessage]);

  return <ModalMessage />;
};

const ComponentSetupWithError = () => {
  const { setModalMessage } = useModalMessage();
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const msg = 'Erro desconhecido';
  const type = 'error';

  useEffect(() => {
    if (isFirstLoading) {
      setModalMessage({ active: true, message: { type, msg } });
      setIsFirstLoading(false);
    }
  }, [isFirstLoading, setModalMessage]);

  return <ModalMessage />;
};

describe('<ModalMessage />', () => {
  it('should render modal setup error', async () => {
    render(
      <MockApp>
        <ComponentSetup />
      </MockApp>,
    );

    expect(screen.getByText('Sugestão enviada com sucesso, muito obrigado!')).toBeInTheDocument();
    userEvent.click(screen.getByRole('button'));
    expect(
      screen.queryByText('Sugestão enviada com sucesso, muito obrigado!'),
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

import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useEffect, useState } from 'react';
import { ModalMessage } from '@/widgets/modalMessage';
import { useModalMessage } from '@/contexts/modalMessage';
import MockApp from '@/mock/App.Mock';

const useModalMock = (msg, type, setModalMessage) => {
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  useEffect(() => {
    if (isFirstLoading) {
      setModalMessage({ active: true, message: { type, msg } });
      setIsFirstLoading(false);
    }
  }, [isFirstLoading, setModalMessage, msg, type]);

  return { isFirstLoading };
};

const Setup = () => {
  const msg = 'Sugestão enviada com sucesso, muito obrigado!';
  const type = 'success';
  const { setModalMessage } = useModalMessage();
  useModalMock(msg, type, setModalMessage);

  return <ModalMessage />;
};

const SetupWithError = () => {
  const msg = 'Erro desconhecido';
  const type = 'error';
  const { setModalMessage } = useModalMessage();
  useModalMock(msg, type, setModalMessage);

  return <ModalMessage />;
};

describe('<ModalMessage />', () => {
  it('should render modal setup error', async () => {
    render(
      <MockApp>
        <Setup />
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
        <SetupWithError />
      </MockApp>,
    );

    expect(screen.getByText('Erro desconhecido')).toBeInTheDocument();
    userEvent.click(screen.getByRole('button'));
    expect(screen.queryByText('Erro desconhecido')).not.toBeInTheDocument();
  });
});

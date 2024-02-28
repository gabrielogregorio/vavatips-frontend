import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useEffect, useState } from 'react';
import { ModalMessage } from '@/widgets/modalMessage';
import { useModalMessage } from '@/contexts/modalMessage';
import { MockApp } from '@/mock/App.Mock';

const useModalMock = (msg, type, setModalMessage) => {
  const [isFirstLoading, setIsFirstLoading] = useState(true);

  useEffect(() => {
    if (isFirstLoading) {
      setModalMessage({ active: true, message: { msg, type } });
      setIsFirstLoading(false);
    }
  }, [isFirstLoading, setModalMessage, msg, type]);

  return { isFirstLoading };
};
const msgSuccess = 'Sugestão enviada com sucesso, muito obrigado!';
const Setup = () => {
  const type = 'success';
  const { setModalMessage } = useModalMessage();
  useModalMock(msgSuccess, type, setModalMessage);

  return <ModalMessage />;
};

const msgError = 'Erro desconhecido';
const SetupWithError = () => {
  const type = 'error';
  const { setModalMessage } = useModalMessage();
  useModalMock(msgError, type, setModalMessage);

  return <ModalMessage />;
};

describe('<ModalMessage />', () => {
  it('should render modal setup error', async () => {
    render(
      <MockApp>
        <Setup />
      </MockApp>,
    );

    expect(screen.getByText(msgSuccess)).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button'));
    expect(screen.queryByText(msgSuccess)).not.toBeInTheDocument();
  });

  it('should render modal setup error', async () => {
    render(
      <MockApp>
        <SetupWithError />
      </MockApp>,
    );

    expect(screen.getByText(msgError)).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button'));
    expect(screen.queryByText(msgError)).not.toBeInTheDocument();
  });
});

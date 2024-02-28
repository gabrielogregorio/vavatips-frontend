import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { ModalMessage } from '@/widgets/modalMessage';
import { ModalOfSuggestion } from '@/widgets/modalOfSuggestion';
import { useModalContext } from '@/contexts/modalSuggestion';
import { MockApp } from '@/mock/App.Mock';
import { Api } from '@/services/api';
import { CreateAxiosErrorMock, createResponseMock } from '@/mock/createResponseMock';

jest.mock('next/router', () => ({
  useRouter: () => ({
    asPath: '',
    pathname: '',
    query: { map: 'Ascent32' },
    route: '/',
  }),
}));

const post = {
  description: 'my Description post',
  imgs: [{ description: 'description image', id: '98', image: 'https://image.png' }],
  tags: {
    ability: 'Flecha rastread1ora',
    agent: 'Sova',
    difficult: 'médio',
    map: 'Ascent',
    mapPosition: 'b',
    moment: 'post plant',
    side: 'a',
  },
  title: 'my title post',
  user: { id: '53', image: 'https://docker.png', username: 'Gabriel' },
};

const waitForSuccessfully = async () =>
  waitFor(() => expect(screen.getByText('Sugestão enviada com sucesso, muito obrigado!')).toBeInTheDocument());

jest.mock(
  'next/link',
  () =>
    ({ children }: { children: ReactNode }) =>
      children,
);

const defaultEmail = 'myEmail@email.com';
const defaultDescription = 'my long description for problem';

const spy = jest.spyOn(Api, 'post');
spy.mockImplementation(() =>
  //  const { idPost, email, description } = payload;

  // const requestIsCorrectly =
  //   (idPost === '12' && email === defaultEmail && description === defaultDescription) || email === 'email@email.com';
  // if (requestIsCorrectly) {
  createResponseMock(
    {
      description: 'dddssd',
      email: 'vv',
      post_id: 'aaa',
    },
    200,
  ),
);
const Setup = ({ notId }: { notId?: boolean }) => {
  const { setModalSuggestion } = useModalContext();
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const localPost = useMemo(() => ({ ...post, id: notId ? undefined : '12' }), [notId]);

  useEffect(() => {
    if (isFirstLoading) {
      setModalSuggestion({ active: true, post: localPost });
      setIsFirstLoading(false);
    }
  }, [isFirstLoading, setModalSuggestion, localPost]);

  return (
    <>
      <ModalMessage />
      <ModalOfSuggestion title="Fazer sugestão" />
    </>
  );
};

Setup.defaultProps = {
  notId: false,
};

const optionalEmail = 'Email para retorno (Opcional)';

describe('<ModalOfSuggestion />', () => {
  it('should render modal suggestion and send suggestion', async () => {
    render(
      <MockApp>
        <Setup />
      </MockApp>,
    );

    await userEvent.type(screen.getByLabelText(optionalEmail), defaultEmail);

    await userEvent.type(screen.getByLabelText('Descrição'), defaultDescription);

    await userEvent.click(screen.getByRole('button', { name: 'Adicionar' }));

    await waitForSuccessfully();
  });

  it('should send suggestion simulated dont id post', async () => {
    render(
      <MockApp>
        <Setup notId />
      </MockApp>,
    );

    await userEvent.type(screen.getByLabelText(optionalEmail), 'email@email.com');

    await userEvent.type(screen.getByLabelText('Descrição'), defaultDescription);

    await userEvent.click(screen.getByRole('button', { name: 'Adicionar' }));

    await waitForSuccessfully();
  });

  it('should render modal suggestion and error to send suggestion', async () => {
    spy.mockImplementation(() =>
      Promise.reject(new CreateAxiosErrorMock({ message: 'Error', code: '500', response: { status: 500, data: '' } })),
    );

    render(
      <MockApp>
        <Setup />
      </MockApp>,
    );

    await userEvent.type(screen.getByLabelText(optionalEmail), 'invalidEmailApi@email.com');

    await userEvent.type(screen.getByLabelText('Descrição'), defaultDescription);

    await userEvent.click(screen.getByRole('button', { name: 'Adicionar' }));
    await screen.findByText('Erro ao enviar a Sugestão. Você poderia reportar o problema aos desenvolvedores');
  });

  it('should closed Modal in button closed', async () => {
    render(
      <MockApp>
        <Setup />
      </MockApp>,
    );

    await userEvent.click(screen.getByTestId('closeModal'));
  });

  it('should closed Modal in button cancel', async () => {
    render(
      <MockApp>
        <Setup />
      </MockApp>,
    );

    await userEvent.click(screen.getByRole('button', { name: 'Cancelar' }));
  });

  it('should render modal suggestion and send suggestion', async () => {
    render(
      <MockApp>
        <Setup />
      </MockApp>,
    );

    await userEvent.type(screen.getByLabelText(optionalEmail), defaultEmail);
    await userEvent.click(screen.getByRole('button', { name: 'Adicionar' }));

    await screen.findByText('Essa descrição está muito curta');

    await userEvent.type(screen.getByLabelText('Descrição'), 'small');
    await userEvent.click(screen.getByRole('button', { name: 'Adicionar' }));

    await screen.findByText('Essa descrição está muito curta');
  });
});

import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { ModalMessage } from '@/widgets/modalMessage';
import { ModalOfSuggestion } from '@/widgets/modalOfSuggestion';
import { useModalContext } from '@/contexts/modalSuggestion';
import MockApp from '@/mock/App.Mock';
import { URL_POST_SUGGESTION } from '@/mock/ROUTES_API';
import { ParsedUrlQuery } from 'querystring';
import { ERROR_IN_SERVER_HTTP_CODE, SUCCESS_HTTP_CODE } from '@/utils/statusCode';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: { map: 'Ascent32' },
      asPath: '',
    };
  },
}));

const post = {
  user: { id: '53', username: 'Gabriel', image: 'https://docker.png' },
  description: 'my Description post',
  title: 'my title post',
  imgs: [{ id: '98', image: 'https://image.png', description: 'description image' }],
  tags: {
    map: 'Ascent',
    agent: 'Sova',
    ability: 'Flecha rastread1ora',
    moment: 'post plant',
    difficult: 'médio',
    side: 'a',
    mapPosition: 'b',
  },
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

const handlers = [
  rest.post(URL_POST_SUGGESTION, async (req, res, ctx) => {
    const { idPost, email, description } = req.body as ParsedUrlQuery;

    const requestIsCorrectly =
      (idPost === '12' && email === defaultEmail && description === defaultDescription) || email === 'email@email.com';
    if (requestIsCorrectly) {
      return res(
        ctx.status(SUCCESS_HTTP_CODE),
        ctx.json({
          post_id: 'aaa',
          email: 'vv',
          description: 'dddssd',
        }),
      );
    }
    return res(ctx.status(ERROR_IN_SERVER_HTTP_CODE), ctx.json({ error: 'Erro no Servidor' }));
  }),
];

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

const server = setupServer(...handlers);

const optionalEmail = 'Email para retorno (Opcional)';

describe('<ModalOfSuggestion />', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('should render modal suggestion and send suggestion', async () => {
    render(
      <MockApp>
        <Setup />
      </MockApp>,
    );

    userEvent.type(screen.getByLabelText(optionalEmail), defaultEmail);

    userEvent.type(screen.getByLabelText('Descrição'), defaultDescription);

    userEvent.click(screen.getByRole('button', { name: 'Adicionar' }));

    await waitForSuccessfully();
  });

  it('should send suggestion simulated dont id post', async () => {
    render(
      <MockApp>
        <Setup notId />
      </MockApp>,
    );

    userEvent.type(screen.getByLabelText(optionalEmail), 'email@email.com');

    userEvent.type(screen.getByLabelText('Descrição'), defaultDescription);

    userEvent.click(screen.getByRole('button', { name: 'Adicionar' }));

    await waitForSuccessfully();
  });

  it('should render modal suggestion and error to send suggestion', async () => {
    render(
      <MockApp>
        <Setup />
      </MockApp>,
    );

    userEvent.type(screen.getByLabelText(optionalEmail), 'invalidEmailApi@email.com');

    userEvent.type(screen.getByLabelText('Descrição'), defaultDescription);

    userEvent.click(screen.getByRole('button', { name: 'Adicionar' }));
    await screen.findByText('Erro ao enviar a Sugestão. Você poderia reportar o problema aos desenvolvedores');
  });

  it('should closed Modal in button closed', async () => {
    render(
      <MockApp>
        <Setup />
      </MockApp>,
    );

    userEvent.click(screen.getByTestId('closeModal'));
  });

  it('should closed Modal in button cancel', async () => {
    render(
      <MockApp>
        <Setup />
      </MockApp>,
    );

    userEvent.click(screen.getByRole('button', { name: 'Cancelar' }));
  });

  it('should render modal suggestion and send suggestion', async () => {
    render(
      <MockApp>
        <Setup />
      </MockApp>,
    );

    userEvent.type(screen.getByLabelText(optionalEmail), defaultEmail);
    userEvent.click(screen.getByRole('button', { name: 'Adicionar' }));

    await screen.findByText('Essa descrição está muito curta');

    userEvent.type(screen.getByLabelText('Descrição'), 'small');
    userEvent.click(screen.getByRole('button', { name: 'Adicionar' }));

    await screen.findByText('Essa descrição está muito curta');
  });
});

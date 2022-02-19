import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { ReactNode, useEffect } from 'react';
import ModalMessage from '@/widgets/modalMessage';
import ModalOfSuggestion from '@/widgets/modalOfSuggestion';
import { useModalContext } from '@/contexts/modalSuggestion';
import MockApp from '@/mock/App.Mock';
import { URL_POST_SUGGESTION } from '@/mock/ROUTES_API';
import { ParsedUrlQuery } from 'querystring';

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

jest.mock(
  'next/link',
  () =>
    function LinkComponent({ children }: { children: ReactNode }) {
      return children;
    },
);

const handlers = [
  rest.post(URL_POST_SUGGESTION, async (req, res, ctx) => {
    const { idPost, email, description } = req.body as ParsedUrlQuery;

    const requestIsCorrectly =
      (idPost === '12' &&
        email === 'myEmail@email.com' &&
        description === 'my long description for problem') ||
      email === 'acceptDataWithNotId';
    if (requestIsCorrectly) {
      return res(
        ctx.status(200),
        ctx.json({
          post_id: 'aaa',
          email: 'vv',
          description: 'dddssd',
        }),
      );
    }
    return res(ctx.status(500), ctx.json({ error: 'Erro no Servidor' }));
  }),
];

const ComponentSetup = ({ notId }: { notId?: boolean }) => {
  const { setModalSuggestion } = useModalContext();

  const post = {
    id: notId ? undefined : '12',
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
  useEffect(() => {
    setModalSuggestion({ active: true, post });
  }, []);

  return (
    <>
      <ModalMessage />
      <ModalOfSuggestion title="fazer sugestão" />
    </>
  );
};

ComponentSetup.defaultProps = {
  notId: false,
};

const server = setupServer(...handlers);

describe('<ModalOfSuggestion />', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('should render modal suggestion and send suggestion', async () => {
    render(
      <MockApp>
        <ComponentSetup />
      </MockApp>,
    );

    userEvent.type(screen.getByLabelText('Email para contato (Opcional)'), 'myEmail@email.com');

    userEvent.type(screen.getByLabelText('Descrição'), 'my long description for problem');

    userEvent.click(screen.getByRole('button', { name: 'Adicionar' }));

    await waitFor(() =>
      expect(
        screen.queryByText('Sugestão enviada com sucesso, muito obrigado!'),
      ).toBeInTheDocument(),
    );
  });

  it('should send suggestion simulated dont id post', async () => {
    render(
      <MockApp>
        <ComponentSetup notId />
      </MockApp>,
    );

    userEvent.type(screen.getByLabelText('Email para contato (Opcional)'), 'acceptDataWithNotId');

    userEvent.type(screen.getByLabelText('Descrição'), 'my long description for problem');

    userEvent.click(screen.getByRole('button', { name: 'Adicionar' }));

    await waitFor(() =>
      expect(
        screen.queryByText('Sugestão enviada com sucesso, muito obrigado!'),
      ).toBeInTheDocument(),
    );
  });
  it('should render modal suggestion and error to send suggestion', async () => {
    render(
      <MockApp>
        <ComponentSetup />
      </MockApp>,
    );

    userEvent.type(
      screen.getByLabelText('Email para contato (Opcional)'),
      'invalidEmailApi@email.com',
    );

    userEvent.type(screen.getByLabelText('Descrição'), 'my long description for problem');

    userEvent.click(screen.getByRole('button', { name: 'Adicionar' }));
    await waitFor(() =>
      expect(
        screen.queryByText(
          'Erro ao enviar a Sugestão. Você poderia reportar o problema aos desenvolvedores',
        ),
      ).toBeInTheDocument(),
    );
  });

  it('should closed Modal in button closed', async () => {
    render(
      <MockApp>
        <ComponentSetup />
      </MockApp>,
    );

    userEvent.click(screen.getByTestId('closeModal'));
  });

  it('should closed Modal in button cancel', async () => {
    render(
      <MockApp>
        <ComponentSetup />
      </MockApp>,
    );

    userEvent.click(screen.getByRole('button', { name: 'Cancelar' }));
  });

  it('should render modal suggestion and send suggestion', async () => {
    render(
      <MockApp>
        <ComponentSetup />
      </MockApp>,
    );

    userEvent.type(screen.getByLabelText('Email para contato (Opcional)'), 'myEmail@email.com');
    userEvent.click(screen.getByRole('button', { name: 'Adicionar' }));

    expect(
      screen.getByText('Você precisa preencher o campo Descrição com as informações'),
    ).toBeInTheDocument();

    userEvent.type(screen.getByLabelText('Descrição'), 'small');
    userEvent.click(screen.getByRole('button', { name: 'Adicionar' }));

    expect(screen.getByText('Você precisa de uma descrição mais detalhada')).toBeInTheDocument();
  });
});

import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Router from 'next/router';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import MockApp from '../core/App.Mock';
import CreatePostScreen from '../../pages/admin/post-create';
import { URL_POST_CREATE_POST } from '../mock/ROUTES_API';

jest.mock('next/router', () => ({
  push: jest.fn(),
  useRouter() {
    return {
      route: '',
      pathname: '/posts',
      query: { map: 'Ascent', agent: 'Sova' },
      asPath: '',
    };
  },
}));

const handlers = [
  rest.post(URL_POST_CREATE_POST, async (req, res, ctx) => {
    const { title, description, tags, imgs }: any = req.body;

    const postIsValid =
      title === `Title New Post` &&
      description === 'Description New Post' &&
      `${tags}` ===
        `${{
          tags: {
            moment: 'InicioPartida',
            difficult: 'Medio',
            ability: 'RobôDeAlarme',
            side: 'Atacantes',
            map: 'Ascent',
            mapPosition: 'BaseAtacante',
            agent: 'Killjoy',
          },
        }}` &&
      imgs.length === 1 &&
      imgs[0].description === '' &&
      imgs[0].image === '';

    if (postIsValid) {
      return res(ctx.status(200));
    }
    return res(ctx.status(500));
  }),
];

const server = setupServer(...handlers);

describe('<CreatePostScreen />', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('should render screen to create post', async () => {
    render(
      <MockApp>
        <CreatePostScreen />
      </MockApp>,
    );

    expect(screen.queryByRole('button', { name: 'Excluir' })).not.toBeInTheDocument();

    expect(screen.getByRole('heading', { name: 'Criar um post' })).toBeInTheDocument();

    const inputTitle: HTMLInputElement = screen.getByLabelText('Titulo');
    const inputDescription: HTMLInputElement = screen.getByLabelText('Descrição');

    expect(inputTitle.value).toEqual('');
    expect(inputDescription.value).toEqual('');
  });

  it('should render create post screen and create post', async () => {
    render(
      <MockApp>
        <CreatePostScreen />
      </MockApp>,
    );

    expect(screen.getByRole('heading', { name: 'Criar um post' })).toBeInTheDocument();

    userEvent.type(screen.getByLabelText('Titulo'), 'Title New Post');
    userEvent.type(screen.getByLabelText('Descrição'), 'Description New Post');

    userEvent.selectOptions(screen.getByLabelText('Agente'), 'Killjoy');
    userEvent.selectOptions(screen.getByLabelText('Mapa'), 'Ascent');
    userEvent.selectOptions(screen.getByLabelText('Habilidade'), 'RobôDeAlarme');
    userEvent.selectOptions(screen.getByLabelText('Posição'), 'BaseAtacante');
    userEvent.selectOptions(screen.getByLabelText('Momento'), 'InicioPartida');
    userEvent.selectOptions(screen.getByLabelText('Dificuldade'), 'Medio');
    userEvent.selectOptions(screen.getByLabelText('Lado'), 'Atacantes');

    // upload fake & test modal actions
    userEvent.click(screen.getByRole('button', { name: 'Novo Passo' }));
    expect(screen.getByText('Adicionar Post')).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: 'Adicionar' }));
    expect(screen.queryByText('Adicionar Post')).not.toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: 'Novo Passo' }));
    expect(screen.getByText('Adicionar Post')).toBeInTheDocument();
    userEvent.click(screen.getByTestId('closeModal'));
    expect(screen.queryByText('Adicionar Post')).not.toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: 'Novo Passo' }));
    expect(screen.getByText('Adicionar Post')).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: 'Cancelar' }));
    expect(screen.queryByText('Adicionar Post')).not.toBeInTheDocument();
    // upload fake

    expect(screen.getAllByRole('img')[0]).toHaveAttribute('alt', '');
    expect(screen.getAllByRole('img')[0]).toHaveAttribute('src', 'http://127.0.0.1:3333/images/');

    userEvent.click(screen.getByRole('button', { name: 'Publicar Dica' }));

    await waitForElementToBeRemoved(screen.getByTestId(/loader/i), {
      timeout: 2000,
    });

    expect(Router.push).toHaveBeenCalledWith('/admin/view-posts');
    Router.push('');
  });
});

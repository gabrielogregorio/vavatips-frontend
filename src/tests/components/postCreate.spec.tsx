import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Router from 'next/router';
import { setupServer } from 'msw/node';
import { MockApp } from '@/mock/App.Mock';
import { URL_POST_CREATE_POST } from '@/mock/ROUTES_API';
import CreatePost from '@/pages/admin/post-create';
import { waitByLoading } from '@/utils/waitByLoading';
import { rest } from 'msw';
import { ERROR_IN_SERVER_HTTP_CODE, SUCCESS_HTTP_CODE } from '@/utils/statusCode';
import { TPostsProps } from '@/types/posts';

jest.mock('next/router', () => ({
  push: jest.fn(),
  useRouter: () => ({
    asPath: '',
    pathname: '/posts',
    query: { agent: 'Sova', map: 'Ascent' },
    route: '',
  }),
}));

const FIRST_POSITION = 0;

const handlers = [
  rest.post(URL_POST_CREATE_POST, async (req, res, ctx) => {
    const { title, description, tags, imgs } = req.body as TPostsProps;

    const postIsValid =
      title === `Title New Post` &&
      description === 'Description New Post' &&
      `${tags}` ===
        `${{
          tags: {
            ability: 'RobôDeAlarme',
            agent: 'Killjoy',
            difficult: 'Medio',
            map: 'Ascent',
            mapPosition: 'BaseAtacante',
            moment: 'InicioPartida',
            side: 'Atacantes',
          },
        }}` &&
      imgs.length === 1 &&
      imgs[FIRST_POSITION].description === 'De um pulo e jogue o bombinho' &&
      imgs[FIRST_POSITION].image === '';

    if (postIsValid) {
      return res(ctx.status(SUCCESS_HTTP_CODE));
    }
    return res(ctx.status(ERROR_IN_SERVER_HTTP_CODE));
  }),
];

const server = setupServer(...handlers);
const newStep = 'Novo Passo';

describe('<CreatePost />', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('should render screen to create post', async () => {
    render(
      <MockApp>
        <CreatePost />
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
        <CreatePost />
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

    userEvent.click(screen.getByRole('button', { name: newStep }));
    userEvent.type(screen.getByLabelText('Descrição post'), 'abc');
    userEvent.click(screen.getByRole('button', { name: 'Adicionar' }));

    userEvent.click(screen.getByRole('button', { name: newStep }));
    userEvent.type(screen.getByLabelText('Descrição post'), 'abc');
    userEvent.click(screen.getByRole('button', { name: 'Adicionar' }));

    userEvent.click(screen.getByTestId('closeModal'));
    expect(screen.queryByText(/Adicionar/i)).not.toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: newStep }));
    userEvent.type(screen.getByLabelText(/Descrição post/i), 'De um pulo e jogue o bombinho');
    userEvent.click(screen.getByRole('button', { name: 'Adicionar' }));

    await waitFor(() => screen.findByText(/De um pulo e jogue o bombinho/i));

    userEvent.click(screen.getByRole('button', { name: 'Publicar Dica' }));

    await waitByLoading();

    await waitFor(() => expect(Router.push).toHaveBeenCalledWith('/admin/view-posts'));
  });
});

import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import userEvent from '@testing-library/user-event';
import Router from 'next/router';
import MockApp from '../core/App.Mock';
import CreatePostManagement from '../../components/widgets/managmentPost';

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

const postBase = {
  id: '617d44c81bc4243f9b2d5a67',
  title: 'title managment post',
  description: 'description1',
  user: {
    id: '615301f1b2f117e4b06db30e',
    username: 'gabriel',
  },
  tags: {
    moment: 'DepoisDoPlant',
    difficult: 'Díficil',
    ability: 'FlechaRastreadora',
    side: 'Defensores',
    map: 'Ascent',
    mapPosition: 'BaseDefensora',
    agent: 'Sova',
  },
  imgs: [
    {
      id: '111',
      description: 'title1_img1',
      image: 'image_111',
    },
    {
      id: '222',
      description: 'title1_img2',
      image: 'image_222',
    },
    {
      id: '333',
      description: 'title1_img3',
      image: 'image_333',
    },
  ],
};

const handlers = [
  rest.delete('http://localhost/post/', async (req, res, ctx) => res(ctx.status(200))),
  rest.post(`http://localhost/post`, async (req, res, ctx) => {
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
  rest.get(`http://localhost/post/`, async (req, res, ctx) => res(ctx.json(postBase))),
  rest.put(`http://localhost/post/`, async (req, res, ctx) => {
    const { title, description, tags, imgs }: any = req.body;
    const postIsValid =
      title === `${postBase.title} concatenate new title` &&
      description === postBase.description &&
      `${tags}` === `${postBase.tags}` &&
      `${imgs}` === `${postBase.imgs}`;

    if (postIsValid) {
      return res(ctx.status(200));
    }

    return res(ctx.status(500));
  }),
];

const server = setupServer(...handlers);

describe('<CreatePostManagement />', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('should render edit post screen and update post', async () => {
    render(
      <MockApp>
        <CreatePostManagement
          breadcrumbs={[
            { url: '/dashboard', text: 'administrativo' },
            { url: '/dashboard', text: 'editar' },
          ]}
          mode="edit"
        />
      </MockApp>,
    );

    await waitForElementToBeRemoved(screen.getByTestId(/loader/i), {
      timeout: 2000,
    });

    expect(screen.getByRole('button', { name: 'Excluir' })).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: 'Editar um post' })).toBeInTheDocument();

    const inputTitle: HTMLInputElement = screen.getByLabelText('Titulo');
    const inputDescription: HTMLInputElement = screen.getByLabelText('Descrição');

    expect(inputTitle.value).toEqual('title managment post');
    expect(inputDescription.value).toEqual('description1');

    userEvent.type(inputTitle, ' concatenate new title');

    expect(screen.getByText('1 - title1_img1')).toBeInTheDocument();
    expect(screen.getAllByRole('img')[0]).toHaveAttribute('alt', 'title1_img1');
    expect(screen.getAllByRole('img')[0]).toHaveAttribute('src', 'undefined/images/image_111');

    expect(screen.getByText('2 - title1_img2')).toBeInTheDocument();
    expect(screen.getAllByRole('img')[1]).toHaveAttribute('alt', 'title1_img2');
    expect(screen.getAllByRole('img')[1]).toHaveAttribute('src', 'undefined/images/image_222');

    expect(screen.getByText('3 - title1_img3')).toBeInTheDocument();
    expect(screen.getAllByRole('img')[2]).toHaveAttribute('alt', 'title1_img3');
    expect(screen.getAllByRole('img')[2]).toHaveAttribute('src', 'undefined/images/image_333');

    userEvent.click(screen.getByRole('button', { name: 'Publicar Dica' }));

    await waitForElementToBeRemoved(screen.getByTestId(/loader/i), {
      timeout: 2000,
    });

    expect(Router.push).toHaveBeenCalledWith('/admin/view-posts');
    Router.push('');
  });

  it('should render create post screen and create post', async () => {
    render(
      <MockApp>
        <CreatePostManagement
          breadcrumbs={[
            { url: '/dashboard', text: 'administrativo' },
            { url: '/dashboard', text: 'criar' },
          ]}
          mode="create"
        />
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
    expect(screen.getAllByRole('img')[0]).toHaveAttribute('src', 'undefined/images/');

    userEvent.click(screen.getByRole('button', { name: 'Publicar Dica' }));

    await waitForElementToBeRemoved(screen.getByTestId(/loader/i), {
      timeout: 2000,
    });

    expect(Router.push).toHaveBeenCalledWith('/admin/view-posts');
    Router.push('');
  });

  it('should delete step', async () => {
    render(
      <MockApp>
        <CreatePostManagement
          breadcrumbs={[
            { url: '/dashboard', text: 'administrativo' },
            { url: '/dashboard', text: 'editar' },
          ]}
          mode="edit"
        />
      </MockApp>,
    );

    await waitForElementToBeRemoved(screen.getByTestId(/loader/i), {
      timeout: 2000,
    });

    expect(screen.getByRole('heading', { name: 'Editar um post' })).toBeInTheDocument();

    expect(screen.getByText('1 - title1_img1')).toBeInTheDocument();
    expect(screen.getAllByRole('img')[0]).toHaveAttribute('alt', 'title1_img1');
    expect(screen.getAllByRole('img')[0]).toHaveAttribute('src', 'undefined/images/image_111');

    expect(screen.getByText('2 - title1_img2')).toBeInTheDocument();
    expect(screen.getAllByRole('img')[1]).toHaveAttribute('alt', 'title1_img2');
    expect(screen.getAllByRole('img')[1]).toHaveAttribute('src', 'undefined/images/image_222');

    expect(screen.getByText('3 - title1_img3')).toBeInTheDocument();
    expect(screen.getAllByRole('img')[2]).toHaveAttribute('alt', 'title1_img3');
    expect(screen.getAllByRole('img')[2]).toHaveAttribute('src', 'undefined/images/image_333');

    userEvent.click(screen.getByTestId('deleteStepButton-2'));

    expect(screen.queryByText('2 - title1_img2')).not.toBeInTheDocument();
  });

  it('should delete post', async () => {
    render(
      <MockApp>
        <CreatePostManagement
          breadcrumbs={[
            { url: '/dashboard', text: 'administrativo' },
            { url: '/dashboard', text: 'editar' },
          ]}
          mode="edit"
        />
      </MockApp>,
    );

    await waitForElementToBeRemoved(screen.getByTestId(/loader/i), {
      timeout: 2000,
    });

    expect(screen.getByRole('heading', { name: 'Editar um post' })).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: 'Excluir' }));

    expect(Router.push).toHaveBeenCalledWith('/admin/view-posts');

    await waitForElementToBeRemoved(screen.getByTestId(/loader/i), {
      timeout: 2000,
    });
  });

  it('should delete step', async () => {
    render(
      <MockApp>
        <CreatePostManagement
          breadcrumbs={[
            { url: '/dashboard', text: 'administrativo' },
            { url: '/dashboard', text: 'editar' },
          ]}
          mode="edit"
        />
      </MockApp>,
    );

    await waitForElementToBeRemoved(screen.getByTestId(/loader/i), {
      timeout: 2000,
    });

    expect(screen.getByRole('heading', { name: 'Editar um post' })).toBeInTheDocument();

    expect(screen.getByText('1 - title1_img1')).toBeInTheDocument();
    expect(screen.getAllByRole('img')[0]).toHaveAttribute('alt', 'title1_img1');
    expect(screen.getAllByRole('img')[0]).toHaveAttribute('src', 'undefined/images/image_111');

    expect(screen.getByText('2 - title1_img2')).toBeInTheDocument();
    expect(screen.getAllByRole('img')[1]).toHaveAttribute('alt', 'title1_img2');
    expect(screen.getAllByRole('img')[1]).toHaveAttribute('src', 'undefined/images/image_222');

    expect(screen.getByText('3 - title1_img3')).toBeInTheDocument();
    expect(screen.getAllByRole('img')[2]).toHaveAttribute('alt', 'title1_img3');
    expect(screen.getAllByRole('img')[2]).toHaveAttribute('src', 'undefined/images/image_333');

    userEvent.click(screen.getByTestId('btn-top-2'));

    expect(screen.getByText('1 - title1_img2')).toBeInTheDocument();
    expect(screen.getAllByRole('img')[0]).toHaveAttribute('alt', 'title1_img2');
    expect(screen.getAllByRole('img')[0]).toHaveAttribute('src', 'undefined/images/image_222');

    expect(screen.getByText('2 - title1_img1')).toBeInTheDocument();
    expect(screen.getAllByRole('img')[1]).toHaveAttribute('alt', 'title1_img1');
    expect(screen.getAllByRole('img')[1]).toHaveAttribute('src', 'undefined/images/image_111');

    expect(screen.getByText('3 - title1_img3')).toBeInTheDocument();
    expect(screen.getAllByRole('img')[2]).toHaveAttribute('alt', 'title1_img3');
    expect(screen.getAllByRole('img')[2]).toHaveAttribute('src', 'undefined/images/image_333');

    userEvent.click(screen.getByTestId('btn-bottom-2'));

    expect(screen.getByText('1 - title1_img2')).toBeInTheDocument();
    expect(screen.getAllByRole('img')[0]).toHaveAttribute('alt', 'title1_img2');
    expect(screen.getAllByRole('img')[0]).toHaveAttribute('src', 'undefined/images/image_222');

    expect(screen.getByText('2 - title1_img3')).toBeInTheDocument();
    expect(screen.getAllByRole('img')[1]).toHaveAttribute('alt', 'title1_img3');
    expect(screen.getAllByRole('img')[1]).toHaveAttribute('src', 'undefined/images/image_333');

    expect(screen.getByText('3 - title1_img1')).toBeInTheDocument();
    expect(screen.getAllByRole('img')[2]).toHaveAttribute('alt', 'title1_img1');
    expect(screen.getAllByRole('img')[2]).toHaveAttribute('src', 'undefined/images/image_111');
  });

  it('should edit step', async () => {
    render(
      <MockApp>
        <CreatePostManagement
          breadcrumbs={[
            { url: '/dashboard', text: 'administrativo' },
            { url: '/dashboard', text: 'editar' },
          ]}
          mode="edit"
        />
      </MockApp>,
    );

    await waitForElementToBeRemoved(screen.getByTestId(/loader/i), {
      timeout: 2000,
    });

    expect(screen.getByRole('heading', { name: 'Editar um post' })).toBeInTheDocument();

    expect(screen.getByText('1 - title1_img1')).toBeInTheDocument();
    expect(screen.getAllByRole('img')[0]).toHaveAttribute('alt', 'title1_img1');
    expect(screen.getAllByRole('img')[0]).toHaveAttribute('src', 'undefined/images/image_111');

    expect(screen.getByText('2 - title1_img2')).toBeInTheDocument();
    expect(screen.getAllByRole('img')[1]).toHaveAttribute('alt', 'title1_img2');
    expect(screen.getAllByRole('img')[1]).toHaveAttribute('src', 'undefined/images/image_222');

    expect(screen.getByText('3 - title1_img3')).toBeInTheDocument();
    expect(screen.getAllByRole('img')[2]).toHaveAttribute('alt', 'title1_img3');
    expect(screen.getAllByRole('img')[2]).toHaveAttribute('src', 'undefined/images/image_333');

    userEvent.click(screen.getByText('2 - title1_img2'));

    userEvent.type(screen.getByLabelText('Descrição post'), ' add in final');

    userEvent.click(screen.getByRole('button', { name: 'Adicionar' }));

    expect(screen.getByText('1 - title1_img1')).toBeInTheDocument();
    expect(screen.getByText('2 - title1_img2 add in final')).toBeInTheDocument();
    expect(screen.getByText('3 - title1_img3')).toBeInTheDocument();
  });
});

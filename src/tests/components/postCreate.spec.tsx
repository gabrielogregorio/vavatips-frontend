import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Router from 'next/router';
import { MockApp } from '@/mock/App.Mock';
import CreatePost from '@/pages/admin/post-create';
import { waitByLoading } from '@/utils/waitByLoading';
import { Api } from '@/services/api';
import { CreateAxiosErrorMock, createResponseMock } from '@/mock/createResponseMock';

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

const spyOn = jest.spyOn(Api, 'post');

spyOn.mockImplementation((ur, payload) => {
  const { title, description, tags, imgs } = payload;

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
    return Promise.resolve(createResponseMock({}, 200));
  }
  return Promise.reject(new CreateAxiosErrorMock({ message: '', response: { status: 500, data: '' } }));
});

const newStep = 'Novo Passo';

describe('<CreatePost />', () => {
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

    await userEvent.type(screen.getByLabelText('Titulo'), 'Title New Post');
    await userEvent.type(screen.getByLabelText('Descrição'), 'Description New Post');

    await userEvent.selectOptions(screen.getByLabelText('Agente'), 'Killjoy');
    await userEvent.selectOptions(screen.getByLabelText('Mapa'), 'Ascent');
    await userEvent.selectOptions(screen.getByLabelText('Habilidade'), 'RobôDeAlarme');
    await userEvent.selectOptions(screen.getByLabelText('Posição'), 'BaseAtacante');
    await userEvent.selectOptions(screen.getByLabelText('Momento'), 'InicioPartida');
    await userEvent.selectOptions(screen.getByLabelText('Dificuldade'), 'Medio');
    await userEvent.selectOptions(screen.getByLabelText('Lado'), 'Atacantes');

    await userEvent.click(screen.getByRole('button', { name: newStep }));
    await userEvent.type(screen.getByLabelText('Descrição post'), 'abc');
    await userEvent.click(screen.getByRole('button', { name: 'Adicionar' }));

    await userEvent.click(screen.getByRole('button', { name: newStep }));
    await userEvent.type(screen.getByLabelText('Descrição post'), 'abc');
    await userEvent.click(screen.getByRole('button', { name: 'Adicionar' }));

    await userEvent.click(screen.getByRole('button', { name: newStep }));
    await userEvent.type(screen.getByLabelText(/Descrição post/i), 'De um pulo e jogue o bombinho');
    await userEvent.click(screen.getByRole('button', { name: 'Adicionar' }));

    await waitFor(() => screen.findByText(/De um pulo e jogue o bombinho/i));

    await userEvent.click(screen.getByRole('button', { name: 'Publicar Dica' }));

    await waitByLoading();

    await waitFor(() => expect(Router.push).toHaveBeenCalledWith('/admin/view-posts'));
  });
});

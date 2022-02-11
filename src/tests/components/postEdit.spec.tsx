import { render, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import userEvent from '@testing-library/user-event';
import Router from 'next/router';
import MockApp from '@/mock/App.Mock';
import EditPostScreen from '@/pages/admin/post-edit';
import {
  URL_DELETE_POST_BY_ID,
  URL_GET_POST_BY_ID,
  URL_PUT_EDIT_POST_BY_ID,
} from '@/mock/ROUTES_API';
import waitByLoading from '@/utils/waitByLoading';

jest.mock('next/router', () => ({
  push: jest.fn(),
  useRouter() {
    return {
      route: '/admin/post-edit',
      pathname: '',
      query: { id: '617d44c81bc4243f9b2d5a67' },
      asPath: '',
      isReady: true,
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null),
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
  rest.get(URL_GET_POST_BY_ID, async (req, res, ctx) => {
    if (req.params.postId === '617d44c81bc4243f9b2d5a67') {
      return res(ctx.json(postBase));
    }
    return res(ctx.status(404));
  }),

  rest.put(URL_PUT_EDIT_POST_BY_ID, async (req, res, ctx) => {
    const { title, description, tags, imgs }: any = req.body;
    const postIsValid =
      title === `${postBase.title} concatenate new title` &&
      description === postBase.description &&
      `${tags}` === `${postBase.tags}` &&
      `${imgs}` === `${postBase.imgs}`;

    if (req.params.postId !== '617d44c81bc4243f9b2d5a67') {
      return res(ctx.status(404));
    }

    if (postIsValid) {
      return res(ctx.status(200));
    }

    return res(ctx.status(500));
  }),

  rest.delete(URL_DELETE_POST_BY_ID, async (req, res, ctx) => {
    if (req.params.postId === '617d44c81bc4243f9b2d5a67') {
      return res(ctx.status(200));
    }
    return res(ctx.status(404));
  }),
];

const server = setupServer(...handlers);

describe('<EditPostScreen />', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('should render edit post screen and update post', async () => {
    render(
      <MockApp>
        <EditPostScreen />
      </MockApp>,
    );

    await waitByLoading();

    expect(screen.getByRole('button', { name: 'Excluir' })).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: 'Editar um post' })).toBeInTheDocument();

    const inputTitle: HTMLInputElement = screen.getByLabelText('Titulo');
    const inputDescription: HTMLInputElement = screen.getByLabelText('Descrição');

    expect(inputTitle.value).toEqual('title managment post');
    expect(inputDescription.value).toEqual('description1');

    userEvent.type(inputTitle, ' concatenate new title');

    expect(screen.getByText('1 - title1_img1')).toBeInTheDocument();
    expect(screen.getAllByRole('img')[0]).toHaveAttribute('alt', 'title1_img1');
    expect(screen.getAllByRole('img')[0]).toHaveAttribute(
      'src',
      '/_next/image?url=http%3A%2F%2F127.0.0.1%3A3333%2Fimages%2Fimage_111&w=3840&q=75',
    );

    expect(screen.getByText('2 - title1_img2')).toBeInTheDocument();
    expect(screen.getAllByRole('img')[1]).toHaveAttribute('alt', 'title1_img2');
    expect(screen.getAllByRole('img')[1]).toHaveAttribute(
      'src',
      '/_next/image?url=http%3A%2F%2F127.0.0.1%3A3333%2Fimages%2Fimage_222&w=3840&q=75',
    );

    expect(screen.getByText('3 - title1_img3')).toBeInTheDocument();
    expect(screen.getAllByRole('img')[2]).toHaveAttribute('alt', 'title1_img3');
    expect(screen.getAllByRole('img')[2]).toHaveAttribute(
      'src',
      '/_next/image?url=http%3A%2F%2F127.0.0.1%3A3333%2Fimages%2Fimage_333&w=3840&q=75',
    );
  });

  it('should render edit post screen and update post', async () => {
    render(
      <MockApp>
        <EditPostScreen />
      </MockApp>,
    );

    await waitByLoading();

    expect(screen.getByRole('button', { name: 'Excluir' })).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: 'Editar um post' })).toBeInTheDocument();

    const inputTitle: HTMLInputElement = screen.getByLabelText('Titulo');
    const inputDescription: HTMLInputElement = screen.getByLabelText('Descrição');

    expect(inputTitle.value).toEqual('title managment post');
    expect(inputDescription.value).toEqual('description1');

    userEvent.type(inputTitle, ' concatenate new title');

    expect(screen.getByText('1 - title1_img1')).toBeInTheDocument();
    expect(screen.getAllByRole('img')[0]).toHaveAttribute('alt', 'title1_img1');
    expect(screen.getAllByRole('img')[0]).toHaveAttribute(
      'src',
      'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
    );

    expect(screen.getByText('2 - title1_img2')).toBeInTheDocument();
    expect(screen.getAllByRole('img')[1]).toHaveAttribute('alt', 'title1_img2');
    expect(screen.getAllByRole('img')[1]).toHaveAttribute(
      'src',
      'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
    );

    expect(screen.getByText('3 - title1_img3')).toBeInTheDocument();
    expect(screen.getAllByRole('img')[2]).toHaveAttribute('alt', 'title1_img3');
    expect(screen.getAllByRole('img')[2]).toHaveAttribute(
      'src',
      'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
    );

    userEvent.click(screen.getByRole('button', { name: 'Publicar Dica' }));

    await waitByLoading();

    expect(Router.push).toHaveBeenCalledWith('/admin/view-posts');
    Router.push('');
  });

  it('should delete post', async () => {
    render(
      <MockApp>
        <EditPostScreen />
      </MockApp>,
    );

    await waitByLoading();

    expect(screen.getByRole('heading', { name: 'Editar um post' })).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: 'Excluir' }));

    expect(Router.push).toHaveBeenCalledWith('/admin/view-posts');

    await waitByLoading();
  });
});

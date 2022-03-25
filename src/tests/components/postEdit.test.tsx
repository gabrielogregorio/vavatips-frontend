import { render, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import userEvent from '@testing-library/user-event';
import Router from 'next/router';
import MockApp from '@/mock/App.Mock';
import EditPost from '@/pages/admin/post-edit';
import { URL_DELETE_POST_BY_ID, URL_GET_POST_BY_ID, URL_PUT_EDIT_POST_BY_ID } from '@/mock/ROUTES_API';
import { waitByLoading } from '@/utils/waitByLoading';
import { ParsedUrlQuery } from 'querystring';
import postBase from '@/mock/responseGetPostById.json';
import { DATA_ALT, DATA_SRC } from '@/helpers/variables';
import defaultListFromRender from '@/mock/defaultListFromRender.json';

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

const handlers = [
  rest.get(URL_GET_POST_BY_ID, async (req, res, ctx) => {
    if (req.params.postId === '617d44c81bc4243f9b2d5a67') {
      return res(ctx.json(postBase));
    }
    return res(ctx.status(404));
  }),

  rest.put(URL_PUT_EDIT_POST_BY_ID, async (req, res, ctx) => {
    const { title, description, tags, imgs } = req.body as ParsedUrlQuery;
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

describe('<EditPost />', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('should render edit post screen and update post', async () => {
    render(
      <MockApp>
        <EditPost />
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
    const listOfImages = screen.getAllByRole('img');

    defaultListFromRender.forEach(({ title, alt, src }, index) => {
      expect(screen.getByText(title)).toBeInTheDocument();
      expect(listOfImages[index]).toHaveAttribute(DATA_ALT, alt);
      expect(listOfImages[index]).toHaveAttribute(DATA_SRC, src);
    });
  });

  it('should render edit post screen and update post', async () => {
    render(
      <MockApp>
        <EditPost />
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
    const listOfImages = screen.getAllByRole('img');

    defaultListFromRender.forEach(({ title, alt, src }, index) => {
      expect(screen.getByText(title)).toBeInTheDocument();
      expect(listOfImages[index]).toHaveAttribute(DATA_ALT, alt);
      expect(listOfImages[index]).toHaveAttribute(DATA_SRC, src);
    });

    userEvent.click(screen.getByRole('button', { name: 'Publicar Dica' }));

    await waitByLoading();

    expect(Router.push).toHaveBeenCalledWith('/admin/view-posts');
    Router.push('');
  });

  it('should delete post', async () => {
    render(
      <MockApp>
        <EditPost />
      </MockApp>,
    );

    await waitByLoading();

    expect(screen.getByRole('heading', { name: 'Editar um post' })).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: 'Excluir' }));

    expect(Router.push).toHaveBeenCalledWith('/admin/view-posts');

    await waitByLoading();
  });
});

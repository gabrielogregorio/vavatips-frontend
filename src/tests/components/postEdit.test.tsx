import { render, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import userEvent from '@testing-library/user-event';
import Router from 'next/router';
import { MockApp } from '@/mock/App.Mock';
import EditPost from '@/pages/admin/post-edit';
import { URL_DELETE_POST_BY_ID, URL_GET_POST_BY_ID, URL_PUT_EDIT_POST_BY_ID } from '@/mock/ROUTES_API';
import { waitByLoading } from '@/utils/waitByLoading';
import { ParsedUrlQuery } from 'querystring';
import postBase from '@/mock/responseGetPostById.json';
import { verifyListRender } from '@/utils/verifyListRender';
import { expectTitlePost } from '@/utils/expectTitlePost';
import { ERROR_IN_SERVER_HTTP_CODE, ERROR_NOT_FOUND_HTTP_CODE, SUCCESS_HTTP_CODE } from '@/utils/statusCode';

jest.mock('next/router', () => ({
  push: jest.fn(),
  useRouter: () => ({
    asPath: '',
    beforePopState: jest.fn(() => null),
    events: {
      off: jest.fn(),
      on: jest.fn(),
    },
    isReady: true,
    pathname: '',
    prefetch: jest.fn(() => null),
    push: jest.fn(),
    query: { id: '617d44c81bc4243f9b2d5a67' },
    route: '/admin/post-edit',
  }),
}));

const handlers = [
  rest.get(URL_GET_POST_BY_ID, async (req, res, ctx) => {
    if (req.params.postId === '617d44c81bc4243f9b2d5a67') {
      return res(ctx.json(postBase));
    }
    return res(ctx.status(ERROR_NOT_FOUND_HTTP_CODE));
  }),

  rest.put(URL_PUT_EDIT_POST_BY_ID, async (req, res, ctx) => {
    const { title, description, tags, imgs } = req.body as ParsedUrlQuery;
    const postIsValid =
      title === `${postBase.title} concatenate new title` &&
      description === postBase.description &&
      `${tags}` === `${postBase.tags}` &&
      `${imgs}` === `${postBase.imgs}`;

    if (req.params.postId !== '617d44c81bc4243f9b2d5a67') {
      return res(ctx.status(ERROR_NOT_FOUND_HTTP_CODE));
    }

    if (postIsValid) {
      return res(ctx.status(SUCCESS_HTTP_CODE));
    }

    return res(ctx.status(ERROR_IN_SERVER_HTTP_CODE));
  }),

  rest.delete(URL_DELETE_POST_BY_ID, async (req, res, ctx) => {
    if (req.params.postId === '617d44c81bc4243f9b2d5a67') {
      return res(ctx.status(SUCCESS_HTTP_CODE));
    }
    return res(ctx.status(ERROR_NOT_FOUND_HTTP_CODE));
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

    expectTitlePost();

    const inputTitle: HTMLInputElement = screen.getByLabelText('Titulo');
    const inputDescription: HTMLInputElement = screen.getByLabelText('Descrição');

    expect(inputTitle.value).toEqual('title managment post');
    expect(inputDescription.value).toEqual('description1');

    userEvent.type(inputTitle, ' concatenate new title');

    verifyListRender();
  });

  it('should render edit post screen and update post', async () => {
    render(
      <MockApp>
        <EditPost />
      </MockApp>,
    );

    await waitByLoading();

    expect(screen.getByRole('button', { name: 'Excluir' })).toBeInTheDocument();

    expectTitlePost();

    const inputTitle: HTMLInputElement = screen.getByLabelText('Titulo');
    const inputDescription: HTMLInputElement = screen.getByLabelText('Descrição');

    expect(inputTitle.value).toEqual('title managment post');
    expect(inputDescription.value).toEqual('description1');

    userEvent.type(inputTitle, ' concatenate new title');

    verifyListRender();

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

    expectTitlePost();
    userEvent.click(screen.getByRole('button', { name: 'Excluir' }));

    expect(Router.push).toHaveBeenCalledWith('/admin/view-posts');

    await waitByLoading();
  });
});

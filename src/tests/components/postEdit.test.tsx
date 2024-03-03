import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Router from 'next/router';
import { MockApp } from '@/mock/App.Mock';
import EditPost from '@/pages/admin/post-edit';
import { waitByLoading } from '@/utils/waitByLoading';
import postBase from '@/mock/responseGetPostById.json';
import { verifyListRender } from '@/utils/verifyListRender';
import { expectTitlePost } from '@/utils/expectTitlePost';
import { ERROR_IN_SERVER_HTTP_CODE, ERROR_NOT_FOUND_HTTP_CODE, SUCCESS_HTTP_CODE } from '@/utils/statusCode';
import { Api } from '@/services/api';
import { CreateAxiosErrorMock, createResponseMock } from '@/mock/createResponseMock';

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

const spyGet = jest.spyOn(Api, 'get');

spyGet.mockImplementation((url) => {
  if (url.includes('/617d44c81bc4243f9b2d5a67')) {
    return Promise.resolve(createResponseMock(postBase, 200));
  }

  return Promise.reject(new CreateAxiosErrorMock({ response: { data: '', status: ERROR_NOT_FOUND_HTTP_CODE } }));
});

const spyPut = jest.spyOn(Api, 'put');
spyPut.mockImplementation((url, payload) => {
  const { title, description, tags, imgs } = payload;
  const postIsValid =
    title === `${postBase.title} concatenate new title` &&
    description === postBase.description &&
    `${tags}` === `${postBase.tags}` &&
    `${imgs}` === `${postBase.imgs}`;

  if (url.includes('617d44c81bc4243f9b2d5a67') === false) {
    return Promise.reject(new CreateAxiosErrorMock({ response: { data: '', status: ERROR_NOT_FOUND_HTTP_CODE } }));
  }

  if (postIsValid) {
    return Promise.resolve(createResponseMock({}, SUCCESS_HTTP_CODE));
  }

  return Promise.reject(new CreateAxiosErrorMock({ response: { data: '', status: ERROR_IN_SERVER_HTTP_CODE } }));
});

const spyDelete = jest.spyOn(Api, 'delete');
spyDelete.mockImplementation((url) => {
  if (url.includes('617d44c81bc4243f9b2d5a67') === false) {
    return Promise.resolve(createResponseMock({}, SUCCESS_HTTP_CODE));
  }

  return Promise.reject(new CreateAxiosErrorMock({ response: { data: '', status: ERROR_NOT_FOUND_HTTP_CODE } }));
});

describe('<EditPost />', () => {
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

    await waitFor(() => expect(inputTitle.value).toEqual('title managment post'));

    expect(inputDescription.value).toEqual('description1');

    await userEvent.type(inputTitle, ' concatenate new title');

    verifyListRender();
  });

  it('3should render edit post screen and update post', async () => {
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

    await waitFor(() => expect(inputTitle.value).toEqual('title managment post'));
    expect(inputDescription.value).toEqual('description1');

    await userEvent.type(inputTitle, ' concatenate new title');

    verifyListRender();

    await userEvent.click(screen.getByRole('button', { name: 'Publicar Dica' }));

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
    await userEvent.click(screen.getByRole('button', { name: 'Excluir' }));

    expect(Router.push).toHaveBeenCalledWith('/admin/view-posts');

    await waitByLoading();
  });
});

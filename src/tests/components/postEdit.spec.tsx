import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import userEvent from '@testing-library/user-event';
import MockApp from '../core/App.Mock';
import EditPostScreen from '../../pages/admin/post-edit';

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

const handlers = [rest.get(`http://localhost/post/`, async (req, res, ctx) => res(ctx.json(postBase)))];

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
  });
});

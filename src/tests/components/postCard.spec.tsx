import { render, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import userEvent from '@testing-library/user-event';
import { PostCard } from '@/widgets/postCard';
import { ModalOfSuggestion } from '@/widgets/modalOfSuggestion';
import mockPosts from '@/mock/mockPosts.json';
import MockApp from '@/mock/App.Mock';
import { URL_GET_ALL_POSTS } from '@/mock/ROUTES_API';
import { TOKEN_JWT } from '@/services/auth';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '',
      pathname: '',
      query: { map: 'Ascent', agent: 'Sova' },
      asPath: '',
    };
  },
}));

let count = 0;
const descriptionOne = 'description image 111';
const descriptionFive = 'description image 555';

const post = {
  id: '12',
  user: { id: '53', username: 'Gabriel', image: '/user.png' },
  description: 'my Description post',
  title: 'my title post',
  imgs: [
    { id: '111', image: 'https://image111.png', description: descriptionOne },
    { id: '222', image: 'https://image222.png', description: 'description image 222' },
    { id: '333', image: 'https://image333.png', description: 'description image 333' },
    { id: '444', image: 'https://image444.png', description: 'description image 444' },
    { id: '555', image: 'https://image555.png', description: descriptionFive },
  ],
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

const handlers = [
  rest.get(URL_GET_ALL_POSTS, async (req, res, ctx) => {
    if (count === 2) {
      return res(ctx.status(500));
    }
    count += 1;
    const query = req.url.searchParams;
    query.append('agent', 'Sova');
    query.append('map', 'Ascent');
    query.append('page', '1');
    query.append('filters', '');

    return res(ctx.json(mockPosts));
  }),
];

const server = setupServer(...handlers);

describe('<PostCard />', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('should test normal mode', async () => {
    render(
      <MockApp>
        <PostCard post={post} />
      </MockApp>,
    );

    expect(screen.getAllByRole('img')[0]).toHaveAttribute('alt', 'Foto de perfil do Autor da postagem');

    expect(screen.getAllByRole('img')[0]).toHaveAttribute('data-src', `/user.png`);
  });

  it('should test if image author is render in not image available', async () => {
    render(
      <MockApp>
        <PostCard post={{ ...post, user: { id: '53', username: 'Gabriel', image: '' } }} />
      </MockApp>,
    );

    expect(screen.getAllByRole('img')[0]).toHaveAttribute('alt', 'Foto de perfil do Autor da postagem');

    expect(screen.getAllByRole('img')[0]).toHaveAttribute('data-src', `/images/users/profile.webp`);
  });

  it('should render correctly post card, save post and test post', async () => {
    render(
      <MockApp>
        <PostCard post={post} />
      </MockApp>,
    );

    userEvent.click(screen.getByRole('button', { name: 'Testado' }));
    userEvent.click(screen.getByRole('button', { name: 'Salvar' }));
    expect(screen.queryByRole('button', { name: 'Editar' })).not.toBeInTheDocument();
  });

  it('should render correctly post card with undefined user', async () => {
    render(
      <MockApp>
        <PostCard post={{ ...post, user: { ...post.user, username: undefined } }} />
      </MockApp>,
    );

    userEvent.click(screen.getByRole('button', { name: 'Testado' }));
    userEvent.click(screen.getByRole('button', { name: 'Salvar' }));
  });

  it('should render correctly post card and open suggestion modal', async () => {
    render(
      <MockApp>
        <ModalOfSuggestion title="Fazer sugestão" />
        <PostCard post={post} />
      </MockApp>,
    );

    userEvent.click(screen.getByRole('button', { name: 'Sugerir' }));

    screen.getByRole('heading', { name: 'Fazer sugestão' });
    const inputType: HTMLInputElement = screen.getByLabelText('Dica');
    expect(inputType.value).toEqual(post.title);
  });

  it('should navigated correctly post card images', async () => {
    render(
      <MockApp>
        <PostCard post={post} />
      </MockApp>,
    );
    const dataIsSelected = 'data-is-selected';
    expect(screen.getAllByRole('img')[1]).toHaveAttribute('alt', descriptionOne);
    expect(screen.getAllByRole('img')[1]).toHaveAttribute('data-src', `https://image111.png`);
    expect(screen.getAllByRole('img')[1]).toHaveAttribute(dataIsSelected, `true`);

    userEvent.click(screen.getByTestId('prev-btn'));
    expect(screen.getAllByRole('img')[5]).toHaveAttribute('alt', descriptionFive);
    expect(screen.getAllByRole('img')[5]).toHaveAttribute('data-src', `https://image555.png`);
    expect(screen.getAllByRole('img')[5]).toHaveAttribute(dataIsSelected, `true`);
    expect(screen.getAllByRole('img')[1]).toHaveAttribute(dataIsSelected, `false`);

    userEvent.click(screen.getByTestId('next-btn'));
    userEvent.click(screen.getByTestId('next-btn'));
    expect(screen.getAllByRole('img')[2]).toHaveAttribute('alt', 'description image 222');
    expect(screen.getAllByRole('img')[2]).toHaveAttribute('data-src', `https://image222.png`);

    userEvent.click(screen.getByTestId('next-btn'));
    expect(screen.getAllByRole('img')[3]).toHaveAttribute('alt', 'description image 333');
    expect(screen.getAllByRole('img')[3]).toHaveAttribute('data-src', `https://image333.png`);

    userEvent.click(screen.getByTestId('next-btn'));
    expect(screen.getAllByRole('img')[4]).toHaveAttribute('alt', 'description image 444');
    expect(screen.getAllByRole('img')[4]).toHaveAttribute('data-src', `https://image444.png`);

    userEvent.click(screen.getByTestId('next-btn'));
    expect(screen.getAllByRole('img')[5]).toHaveAttribute('alt', descriptionFive);
    expect(screen.getAllByRole('img')[5]).toHaveAttribute('data-src', `https://image555.png`);

    userEvent.click(screen.getByTestId('next-btn'));
    expect(screen.getAllByRole('img')[1]).toHaveAttribute('alt', descriptionOne);
    expect(screen.getAllByRole('img')[1]).toHaveAttribute('data-src', `https://image111.png`);
  });

  it('should test save and test posts and return', async () => {
    render(
      <MockApp
        localstorage={{
          SAVE_POSTS: '[]',
          TESTED_POSTS: '[]',
        }}>
        <PostCard post={post} />
      </MockApp>,
    );

    expect(localStorage.getItem('SAVE_POSTS')).toEqual('[]');
    expect(localStorage.getItem('TESTED_POSTS')).toEqual('[]');

    userEvent.click(screen.getByRole('button', { name: 'Testado' }));
    expect(localStorage.getItem('SAVE_POSTS')).toEqual('[]');
    expect(localStorage.getItem('TESTED_POSTS')).toEqual('["12"]');

    userEvent.click(screen.getByRole('button', { name: 'Salvar' }));
    expect(localStorage.getItem('SAVE_POSTS')).toEqual('["12"]');
    expect(localStorage.getItem('TESTED_POSTS')).toEqual('["12"]');

    userEvent.click(screen.getByRole('button', { name: 'Testado' }));
    expect(localStorage.getItem('SAVE_POSTS')).toEqual('["12"]');
    expect(localStorage.getItem('TESTED_POSTS')).toEqual('[]');

    userEvent.click(screen.getByRole('button', { name: 'Salvar' }));
    expect(localStorage.getItem('SAVE_POSTS')).toEqual('[]');
    expect(localStorage.getItem('TESTED_POSTS')).toEqual('[]');
  });

  it('should test view admin', async () => {
    render(
      <MockApp
        localstorage={{
          'app-token-valorant': 'token jwt',
        }}>
        <PostCard post={post} />
      </MockApp>,
    );

    expect(screen.getByRole('button', { name: /Testado/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Salvar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Editar/i })).toBeInTheDocument();
    expect(localStorage.getItem(TOKEN_JWT)).toEqual('token jwt');
  });
});

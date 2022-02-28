import { render, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import userEvent from '@testing-library/user-event';
import { PostCard } from '@/widgets/postCard';
import { ModalOfSuggestion } from '@/widgets/modalOfSuggestion';
import mockPosts from '@/mock/mockPosts.json';
import MockApp from '@/mock/App.Mock';
import { URL_GET_ALL_POSTS } from '@/mock/ROUTES_API';

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

const post = {
  id: '12',
  user: { id: '53', username: 'Gabriel', image: 'https://docker.png' },
  description: 'my Description post',
  title: 'my title post',
  imgs: [
    { id: '111', image: 'https://image111.png', description: 'description image 111' },
    { id: '222', image: 'https://image222.png', description: 'description image 222' },
    { id: '333', image: 'https://image333.png', description: 'description image 333' },
    { id: '444', image: 'https://image444.png', description: 'description image 444' },
    { id: '555', image: 'https://image555.png', description: 'description image 555' },
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

  it('should render correctly post card, save post and test post', async () => {
    render(
      <MockApp>
        <PostCard post={post} viewAdmin={false} />
      </MockApp>,
    );

    userEvent.click(screen.getByRole('button', { name: 'Testado' }));
    userEvent.click(screen.getByRole('button', { name: 'Salvar' }));
  });

  it('should render correctly post card with undefined user', async () => {
    render(
      <MockApp>
        <PostCard
          post={{ ...post, user: { ...post.user, username: undefined } }}
          viewAdmin={false}
        />
      </MockApp>,
    );

    userEvent.click(screen.getByRole('button', { name: 'Testado' }));
    userEvent.click(screen.getByRole('button', { name: 'Salvar' }));

    userEvent.click(screen.getByRole('button', { name: 'Testado' }));
    userEvent.click(screen.getByRole('button', { name: 'Salvar' }));
  });

  it('should render correctly post card and open suggestion modal', async () => {
    render(
      <MockApp>
        <ModalOfSuggestion title="fazer sugestão" />
        <PostCard post={post} viewAdmin={false} />
      </MockApp>,
    );

    userEvent.click(screen.getByRole('button', { name: 'Sugerir' }));

    screen.getByRole('heading', { name: 'fazer sugestão' });
    const inputType: HTMLInputElement = screen.getByLabelText('Dica');
    expect(inputType.value).toEqual(post.title);
  });

  it('should navigated correctly post card images', async () => {
    render(
      <MockApp>
        <PostCard post={post} viewAdmin={false} />
      </MockApp>,
    );

    expect(screen.getAllByRole('img')[1]).toHaveAttribute('alt', 'description image 111');
    expect(screen.getAllByRole('img')[1]).toHaveAttribute(
      'src',
      'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
    );

    userEvent.click(screen.getByTestId('prev-btn'));
    expect(screen.getAllByRole('img')[1]).toHaveAttribute('alt', 'description image 555');
    expect(screen.getAllByRole('img')[1]).toHaveAttribute(
      'src',
      'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
    );

    userEvent.click(screen.getByTestId('next-btn'));
    userEvent.click(screen.getByTestId('next-btn'));
    expect(screen.getAllByRole('img')[1]).toHaveAttribute('alt', 'description image 222');
    expect(screen.getAllByRole('img')[1]).toHaveAttribute(
      'src',
      'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
    );

    userEvent.click(screen.getByTestId('next-btn'));
    expect(screen.getAllByRole('img')[1]).toHaveAttribute('alt', 'description image 333');
    expect(screen.getAllByRole('img')[1]).toHaveAttribute(
      'src',
      'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
    );

    userEvent.click(screen.getByTestId('next-btn'));
    expect(screen.getAllByRole('img')[1]).toHaveAttribute('alt', 'description image 444');
    expect(screen.getAllByRole('img')[1]).toHaveAttribute(
      'src',
      'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
    );

    userEvent.click(screen.getByTestId('next-btn'));
    expect(screen.getAllByRole('img')[1]).toHaveAttribute('alt', 'description image 555');
    expect(screen.getAllByRole('img')[1]).toHaveAttribute(
      'src',
      'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
    );

    userEvent.click(screen.getByTestId('next-btn'));
    expect(screen.getAllByRole('img')[1]).toHaveAttribute('alt', 'description image 111');
    expect(screen.getAllByRole('img')[1]).toHaveAttribute(
      'src',
      'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
    );
  });

  it('should test view admin', async () => {
    render(
      <MockApp>
        <PostCard post={post} viewAdmin />
      </MockApp>,
    );

    expect(screen.queryByRole('button', { name: 'Testado' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Salvar' })).not.toBeInTheDocument();
  });

  it('should test view admin', async () => {
    render(
      <MockApp>
        <PostCard post={post} viewAdmin />
      </MockApp>,
    );
  });
});

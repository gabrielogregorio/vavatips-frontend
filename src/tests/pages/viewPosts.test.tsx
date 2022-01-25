import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { mockPosts } from '../mock/mockPosts';
import MockApp from '../core/App.Mock';
import ViewPostsScreen from '../../pages/admin/view-posts';

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

const handlers = [
  rest.get(`http://localhost/posts`, async (req, res, ctx) => {
    if (count === 2) {
      return res(ctx.status(500));
    }
    count += 1;
    const query = req.url.searchParams;
    query.append('agent', 'Sova');
    query.append('map', 'Ascent');
    query.append('page', '1');
    query.append('filters', '');

    return res(ctx.json(mockPosts()));
  }),
];

const server = setupServer(...handlers);

describe('<HomeScreen />', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('should render home screen', async () => {
    render(
      <MockApp>
        <ViewPostsScreen />
      </MockApp>,
    );

    await waitForElementToBeRemoved(screen.getByText(/Carregando posts/i), {
      timeout: 2000,
    });

    expect(screen.getByRole('heading', { name: mockPosts().posts[0].title })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: mockPosts().posts[1].title })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: mockPosts().posts[2].title })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: mockPosts().posts[3].title })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: mockPosts().posts[4].title })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: mockPosts().posts[5].title })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: mockPosts().posts[6].title })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: mockPosts().posts[7].title })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: mockPosts().posts[8].title })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: mockPosts().posts[9].title })).toBeInTheDocument();

    expect(screen.getByText(mockPosts().posts[0].description)).toBeInTheDocument();
    expect(screen.getByText(mockPosts().posts[1].description)).toBeInTheDocument();
    expect(screen.getByText(mockPosts().posts[2].description)).toBeInTheDocument();
    expect(screen.getByText(mockPosts().posts[3].description)).toBeInTheDocument();
    expect(screen.getByText(mockPosts().posts[4].description)).toBeInTheDocument();
    expect(screen.getByText(mockPosts().posts[5].description)).toBeInTheDocument();
    expect(screen.getByText(mockPosts().posts[6].description)).toBeInTheDocument();
    expect(screen.getByText(mockPosts().posts[7].description)).toBeInTheDocument();
    expect(screen.getByText(mockPosts().posts[8].description)).toBeInTheDocument();
    expect(screen.getByText(mockPosts().posts[9].description)).toBeInTheDocument();

    expect(screen.getAllByRole('button', { name: 'Testar' })).toHaveLength(mockPosts().posts.length);
    expect(screen.getAllByRole('button', { name: 'Salvar' })).toHaveLength(mockPosts().posts.length);
    expect(screen.getAllByRole('button', { name: 'Sugerir' })).toHaveLength(mockPosts().posts.length);
  });
});

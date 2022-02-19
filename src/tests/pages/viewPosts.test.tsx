import { render, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { mockPosts } from '@/mock/mockPosts';
import MockApp from '@/mock/App.Mock';
import ViewPostsScreen from '@/pages/admin/view-posts';
import { URL_GET_ALL_POSTS } from '@/mock/ROUTES_API';
import waitByLoading from '@/utils/waitByLoading';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/posts',
      isReady: true,
      pathname: '',
      query: { map: 'randomInformation', agent: 'randomInformation', type: '', page: 1 },
      asPath: `/posts?map=randomInformation&agent=randomInformation`,
    };
  },
}));

const handlers = [rest.get(URL_GET_ALL_POSTS, async (req, res, ctx) => res(ctx.json(mockPosts())))];

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

    await waitByLoading();

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

    expect(screen.getAllByRole('button', { name: 'Testado' })).toHaveLength(
      mockPosts().posts.length,
    );
    expect(screen.getAllByRole('button', { name: 'Salvar' })).toHaveLength(
      mockPosts().posts.length,
    );
    expect(screen.getAllByRole('button', { name: 'Sugerir' })).toHaveLength(
      mockPosts().posts.length,
    );
  });
});

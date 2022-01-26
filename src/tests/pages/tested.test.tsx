import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import MockApp from '../core/App.Mock';
import { mockPosts } from '../mock/mockPosts';
import TestScreen from '../../pages/tested';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '',
      pathname: '',
      query: '',
      asPath: '',
    };
  },
}));

const handlers = [
  rest.get(`http://127.0.0.1:3333/posts`, async (req, res, ctx) => {
    const idPosts = req.url.searchParams.get('idPosts');
    const idPostsList = JSON.parse(idPosts);
    const filteredPosts = mockPosts().posts.filter((post) => idPostsList.includes(post.id));

    return res(
      ctx.json({
        posts: filteredPosts,
        count: filteredPosts.length,
        tags: [],
      }),
    );
  }),
];

const server = setupServer(...handlers);

describe('<SaveScreen />', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('should render sage screen', async () => {
    render(
      <MockApp
        localstorage={{
          TESTED_POSTS: '["617d44c81bc4243f9b2d5a67","617d44dd1bc4243f9b2d5a75","617d44bb1bc4243f9b2d5a5d"]',
        }}>
        <TestScreen />
      </MockApp>,
    );

    await waitForElementToBeRemoved(screen.getByText(/Carregando posts/i), {
      timeout: 2000,
    });

    expect(screen.getByRole('heading', { name: mockPosts().posts[0].title })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: mockPosts().posts[1].title })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: mockPosts().posts[2].title })).toBeInTheDocument();

    expect(screen.getByText(mockPosts().posts[0].description)).toBeInTheDocument();
    expect(screen.getByText(mockPosts().posts[1].description)).toBeInTheDocument();
    expect(screen.getByText(mockPosts().posts[2].description)).toBeInTheDocument();
  });
});

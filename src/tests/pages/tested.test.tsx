import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen } from '@testing-library/react';
import MockApp from '@/mock/App.Mock';
import { posts } from '@/mock/mockPosts.json';
import TestScreen from '@/pages/tested';
import { URL_GET_ALL_POSTS } from '@/mock/ROUTES_API';
import { waitByLoading } from '@/utils/waitByLoading';
import { getDescription, getTitle } from '../utils/getPosts';
import { generateNumericList } from '../../core/helpers/generateArray';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/posts',
      isReady: true,
      pathname: '',
      query: { map: 'randomInfo', agent: 'randomInfo', type: 'tested', page: 1 },
      asPath: `/posts?map=randomInfo&agent=randomInfo`,
    };
  },
}));

const handlers = [
  rest.get(URL_GET_ALL_POSTS, async (req, res, ctx) => {
    const idPosts = req.url.searchParams.get('idPosts');
    const idPostsList = JSON.parse(idPosts);
    const filteredPosts = posts.filter((post) => idPostsList.includes(post.id.toString()));

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
          TESTED_POSTS:
            '["617d44c81bc4243f9b2d5a67","617d44dd1bc4243f9b2d5a75","617d44bb1bc4243f9b2d5a5d"]',
        }}>
        <TestScreen />
      </MockApp>,
    );

    await waitByLoading();
    generateNumericList(3).forEach((index) => {
      expect(screen.getByRole('heading', { name: getTitle(index) })).toBeInTheDocument();
    });

    generateNumericList(3).forEach((index) => {
      expect(screen.getByText(getDescription(index))).toBeInTheDocument();
    });
  });
});

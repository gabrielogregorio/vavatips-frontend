import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import mockPosts from '@/mock/mockPosts.json';
import MockApp from '@/mock/App.Mock';
import ViewPosts from '@/pages/admin/view-posts';
import { URL_GET_ALL_POSTS } from '@/mock/ROUTES_API';
import { waitByLoading } from '@/utils/waitByLoading';
import { generateNumericList } from '@/helpers/generateArray';
import { defaultMockRouterType } from 'src/tests/components/managmentPost.spec';
import { getDescription, getTitle } from '../utils/getPosts';

const postsLength = mockPosts.posts.length;

jest.mock('next/router', () => ({
  useRouter(): defaultMockRouterType {
    return {
      route: '/posts',
      isReady: true,
      pathname: '',
      query: { map: 'randomInformation', agent: 'randomInformation', type: '', page: 1 },
      asPath: `/posts?map=randomInformation&agent=randomInformation`,
    };
  },
}));

const handlers = [rest.get(URL_GET_ALL_POSTS, async (req, res, ctx) => res(ctx.json(mockPosts)))];

const server = setupServer(...handlers);

describe('<HomeScreen />', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('should render home screen', async () => {
    render(
      <MockApp>
        <ViewPosts />
      </MockApp>,
    );

    await waitByLoading();

    await waitFor(() => expect(screen.getByRole('heading', { name: getTitle(0) })).toBeInTheDocument());

    generateNumericList(9).forEach((index) => {
      expect(screen.getByRole('heading', { name: getTitle(index) })).toBeInTheDocument();
    });

    generateNumericList(9).forEach((index) => {
      expect(screen.getByText(getDescription(index))).toBeInTheDocument();
    });

    expect(screen.getAllByRole('button', { name: 'Testado' })).toHaveLength(postsLength);
    expect(screen.getAllByRole('button', { name: 'Salvar' })).toHaveLength(postsLength);
    expect(screen.getAllByRole('button', { name: 'Sugerir' })).toHaveLength(postsLength);
  });
});

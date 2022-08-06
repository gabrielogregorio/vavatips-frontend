import { render, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import mockPosts from '@/mock/mockPosts.json';
import { MockApp } from '@/mock/App.Mock';
import ViewPosts from '@/pages/admin/view-posts';
import { URL_GET_ALL_POSTS } from '@/mock/ROUTES_API';
import { waitByLoading } from '@/utils/waitByLoading';
import { generateNumericList } from '@/helpers/generateArray';
import { getDescription, getTitle } from '../utils/getPosts';

const postsLength = mockPosts.posts.length;

jest.mock('next/router', () => ({
  useRouter: () => ({
    asPath: `/posts?map=randomInformation&agent=randomInformation`,
    isReady: true,
    pathname: '',
    query: { agent: 'randomInformation', map: 'randomInformation', page: 1, type: '' },
    route: '/posts',
  }),
}));

const handlers = [rest.get(URL_GET_ALL_POSTS, async (req, res, ctx) => res(ctx.json(mockPosts)))];
const FIRST_POSITION = 0;
const server = setupServer(...handlers);
const QUANTITY_POSTS = 9;

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

    await screen.findByRole('heading', { name: getTitle(FIRST_POSITION) });

    generateNumericList(QUANTITY_POSTS).forEach((index) => {
      expect(screen.getByRole('heading', { name: getTitle(index) })).toBeInTheDocument();
    });

    generateNumericList(QUANTITY_POSTS).forEach((index) => {
      expect(screen.getByText(getDescription(index))).toBeInTheDocument();
    });

    expect(screen.getAllByRole('button', { name: 'Testado' })).toHaveLength(postsLength);
    expect(screen.getAllByRole('button', { name: 'Salvar' })).toHaveLength(postsLength);
    expect(screen.getAllByRole('button', { name: 'Sugerir' })).toHaveLength(postsLength);
  });
});

import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import userEvent from '@testing-library/user-event';
import mockPosts from '@/mock/mockPosts.json';
import HomeScreen from '@/pages/posts';
import MockApp from '@/mock/App.Mock';
import { URL_GET_ALL_POSTS } from '@/mock/ROUTES_API';
import { waitByLoading } from '@/utils/waitByLoading';
import { getDescription, getTitle } from '../utils/getPosts';
import { generateNumericList } from '../../core/helpers/generateArray';

const { posts } = mockPosts;

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '',
      pathname: '',
      query: { map: 'Ascent', agent: 'Sova' },
      isReady: true,
      asPath: '',
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
        <HomeScreen />
      </MockApp>,
    );

    await waitByLoading();

    generateNumericList(9).forEach((index) => {
      expect(screen.getByRole('heading', { name: getTitle(index) })).toBeInTheDocument();
    });

    generateNumericList(9).forEach((index) => {
      expect(screen.getByText(getDescription(index))).toBeInTheDocument();
    });

    expect(screen.getAllByRole('button', { name: 'Testado' })).toHaveLength(posts.length);
    expect(screen.getAllByRole('button', { name: 'Salvar' })).toHaveLength(posts.length);
    expect(screen.getAllByRole('button', { name: 'Sugerir' })).toHaveLength(posts.length);
  });

  it('should change image on click in buttons of navigation', async () => {
    render(
      <MockApp>
        <HomeScreen />
      </MockApp>,
    );

    await waitByLoading();

    const buttonPrev = screen.getAllByLabelText('Item anterior')[0];
    const buttonNext = screen.getAllByLabelText('Proximo item')[0];

    expect(screen.getByAltText(posts[0].imgs[0].description)).toBeInTheDocument();
    userEvent.click(buttonNext);

    await waitFor(
      () => {
        expect(screen.getByAltText(posts[0].imgs[1].description)).toBeInTheDocument();
      },
      { timeout: 3000 },
    );

    userEvent.click(buttonPrev);

    await waitFor(
      () => {
        expect(screen.getByAltText(posts[0].imgs[0].description)).toBeInTheDocument();
      },
      { timeout: 3000 },
    );

    userEvent.click(buttonNext);
    userEvent.click(buttonNext);

    await waitFor(
      () => {
        expect(screen.getByAltText(posts[0].imgs[2].description)).toBeInTheDocument();
      },
      { timeout: 3000 },
    );

    userEvent.click(buttonNext);

    await waitFor(
      () => {
        expect(screen.getByAltText(posts[0].imgs[0].description)).toBeInTheDocument();
      },
      { timeout: 3000 },
    );
  });
});

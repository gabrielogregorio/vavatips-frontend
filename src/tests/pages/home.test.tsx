import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import userEvent from '@testing-library/user-event';
import { mockPosts } from '@/mock/mockPosts';
import HomeScreen from '@/pages/posts';
import MockApp from '@/mock/App.Mock';
import { URL_GET_ALL_POSTS } from '@/mock/ROUTES_API';
import waitByLoading from '@/utils/waitByLoading';

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

const handlers = [rest.get(URL_GET_ALL_POSTS, async (req, res, ctx) => res(ctx.json(mockPosts())))];

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

    expect(screen.getAllByRole('button', { name: 'Testar' })).toHaveLength(
      mockPosts().posts.length,
    );
    expect(screen.getAllByRole('button', { name: 'Salvar' })).toHaveLength(
      mockPosts().posts.length,
    );
    expect(screen.getAllByRole('button', { name: 'Sugerir' })).toHaveLength(
      mockPosts().posts.length,
    );
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

    expect(screen.getByAltText(mockPosts().posts[0].imgs[0].description)).toBeInTheDocument();
    userEvent.click(buttonNext);

    await waitFor(
      () => {
        expect(screen.getByAltText(mockPosts().posts[0].imgs[1].description)).toBeInTheDocument();
      },
      { timeout: 3000 },
    );

    userEvent.click(buttonPrev);

    await waitFor(
      () => {
        expect(screen.getByAltText(mockPosts().posts[0].imgs[0].description)).toBeInTheDocument();
      },
      { timeout: 3000 },
    );

    userEvent.click(buttonNext);
    userEvent.click(buttonNext);

    await waitFor(
      () => {
        expect(screen.getByAltText(mockPosts().posts[0].imgs[2].description)).toBeInTheDocument();
      },
      { timeout: 3000 },
    );

    userEvent.click(buttonNext);

    await waitFor(
      () => {
        expect(screen.getByAltText(mockPosts().posts[0].imgs[0].description)).toBeInTheDocument();
      },
      { timeout: 3000 },
    );
  });

  // it('should render with error message', async () => {
  //   render(
  //     <MockApp>
  //       <HomeScreen />
  //     </MockApp>,
  //   );

  //   await waitByLoading()
  //   expect(screen.getByText('Request failed with status code 500')).toBeInTheDocument();
  // });
});

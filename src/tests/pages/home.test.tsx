import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockPosts from '@/mock/mockPosts.json';
import MockApp from '@/mock/App.Mock';
import { waitByLoading } from '@/utils/waitByLoading';
import HomeScreen from '@/pages/posts/[map]/[agent]';
import { generateNumericList } from '@/helpers/generateArray';
import { defaultMockRouterType } from 'src/tests/components/managmentPost.spec';
import { getDescription, getTitle } from '../utils/getPosts';

const { posts } = mockPosts;

jest.mock('next/router', () => ({
  useRouter(): defaultMockRouterType {
    return {
      route: '',
      pathname: '',
      query: { map: 'Ascent', agent: 'Sova' },
      isReady: true,
      asPath: '',
    };
  },
}));

describe('<HomeScreen />', () => {
  it('should render home screen', async () => {
    render(
      <MockApp>
        <HomeScreen posts={posts} />
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
        <HomeScreen posts={posts} />
      </MockApp>,
    );

    await waitByLoading();
    const FIRST_ITEM: number = 0;
    const SECOND_ITEM: number = 1;
    const THREE_ITEM: number = 2;
    const DEFAULT_TIMEOUT_TESTS = 3000;
    const buttonPrev = screen.getAllByLabelText('Item anterior')[FIRST_ITEM];
    const buttonNext = screen.getAllByLabelText('Proximo item')[FIRST_ITEM];

    expect(screen.getByAltText(posts[FIRST_ITEM].imgs[FIRST_ITEM].description)).toBeInTheDocument();
    userEvent.click(buttonNext);

    await waitFor(
      () => {
        expect(screen.getByAltText(posts[FIRST_ITEM].imgs[SECOND_ITEM].description)).toBeInTheDocument();
      },
      { timeout: DEFAULT_TIMEOUT_TESTS },
    );

    userEvent.click(buttonPrev);

    await waitFor(
      () => {
        expect(screen.getByAltText(posts[FIRST_ITEM].imgs[FIRST_ITEM].description)).toBeInTheDocument();
      },
      { timeout: DEFAULT_TIMEOUT_TESTS },
    );

    userEvent.click(buttonNext);
    userEvent.click(buttonNext);

    await waitFor(
      () => {
        expect(screen.getByAltText(posts[FIRST_ITEM].imgs[THREE_ITEM].description)).toBeInTheDocument();
      },
      { timeout: DEFAULT_TIMEOUT_TESTS },
    );

    userEvent.click(buttonNext);

    await waitFor(
      () => {
        expect(screen.getByAltText(posts[FIRST_ITEM].imgs[FIRST_ITEM].description)).toBeInTheDocument();
      },
      { timeout: DEFAULT_TIMEOUT_TESTS },
    );
  });
});

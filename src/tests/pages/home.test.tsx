import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockPosts from '@/mock/mockPosts.json';
import { MockApp } from '@/mock/App.Mock';
import { waitByLoading } from '@/utils/waitByLoading';
import HomeScreen from '@/pages/posts/[map]/[agent]';
import { generateNumericList } from '@/helpers/generateArray';
import { getDescription, getTitle } from '../utils/getPosts';

const { posts } = mockPosts;

jest.mock('next/router', () => ({
  useRouter: () => ({
    asPath: '',
    isReady: true,
    pathname: '',
    query: { agent: 'Sova', map: 'Ascent' },
    route: '',
  }),
}));

const FIRST_POSITION = 0;
const SECOND_POSITION = 1;
const THIRD_POSITION = 2;
const TIME_TO_EXPECT_REQUEST_IN_MS = 300;
const QUANTITY_POSTS = 9;

describe('<HomeScreen />', () => {
  it('should render home screen', async () => {
    render(
      <MockApp>
        <HomeScreen posts={posts} />
      </MockApp>,
    );

    await waitByLoading();

    generateNumericList(QUANTITY_POSTS).forEach((index) => {
      expect(screen.getByRole('heading', { name: getTitle(index) })).toBeInTheDocument();
    });

    generateNumericList(QUANTITY_POSTS).forEach((index) => {
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

    const buttonPrev = screen.getAllByLabelText('Item anterior')[FIRST_POSITION];
    const buttonNext = screen.getAllByLabelText('Proximo item')[FIRST_POSITION];

    expect(screen.getByAltText(posts[FIRST_POSITION].imgs[FIRST_POSITION].description)).toBeInTheDocument();
    await userEvent.click(buttonNext);

    await waitFor(
      () => {
        expect(screen.getByAltText(posts[FIRST_POSITION].imgs[SECOND_POSITION].description)).toBeInTheDocument();
      },
      { timeout: TIME_TO_EXPECT_REQUEST_IN_MS },
    );

    await userEvent.click(buttonPrev);

    await waitFor(
      () => {
        expect(screen.getByAltText(posts[FIRST_POSITION].imgs[FIRST_POSITION].description)).toBeInTheDocument();
      },
      { timeout: TIME_TO_EXPECT_REQUEST_IN_MS },
    );

    await userEvent.click(buttonNext);
    await userEvent.click(buttonNext);

    await waitFor(
      () => {
        expect(screen.getByAltText(posts[FIRST_POSITION].imgs[THIRD_POSITION].description)).toBeInTheDocument();
      },
      { timeout: TIME_TO_EXPECT_REQUEST_IN_MS },
    );

    await userEvent.click(buttonNext);

    await waitFor(
      () => {
        expect(screen.getByAltText(posts[FIRST_POSITION].imgs[FIRST_POSITION].description)).toBeInTheDocument();
      },
      { timeout: TIME_TO_EXPECT_REQUEST_IN_MS },
    );
  });
});

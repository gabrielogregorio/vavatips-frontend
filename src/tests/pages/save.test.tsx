import { render, screen } from '@testing-library/react';
import { MockApp } from '@/mock/App.Mock';
import SaveScreen from '@/pages/save';
import { posts } from '@/mock/mockPosts.json';
import { waitByLoading } from '@/utils/waitByLoading';
import { getDescription, getTitle } from '../utils/getPosts';

const FIRST_POSITION = 0;
const SECOND_POSITION = 1;
const THIRD_POSITION = 2;

jest.mock('next/router', () => ({
  useRouter: () => ({
    asPath: `/posts?map=oneRandomData&agent=oneRandomData`,
    isReady: true,
    pathname: '',
    query: { agent: 'oneRandomData', map: 'oneRandomData', page: 1, type: 'save' },
    route: '/posts',
  }),
}));

describe('<SaveScreen />', () => {
  it('should render sage screen', async () => {
    const idPostsList = ['617d44c81bc4243f9b2d5a67', '617d44dd1bc4243f9b2d5a75', '617d44bb1bc4243f9b2d5a5d'];
    const filteredPosts = posts.filter((post) => idPostsList.includes(post.id));

    render(
      <MockApp
        localstorage={{
          SAVE_POSTS: '["617d44c81bc4243f9b2d5a67","617d44dd1bc4243f9b2d5a75","617d44bb1bc4243f9b2d5a5d"]',
        }}>
        <SaveScreen posts={filteredPosts} />
      </MockApp>,
    );

    await waitByLoading();

    expect(screen.getByRole('heading', { name: getTitle(FIRST_POSITION) })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: getTitle(SECOND_POSITION) })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: getTitle(THIRD_POSITION) })).toBeInTheDocument();

    expect(screen.getByText(getDescription(FIRST_POSITION))).toBeInTheDocument();
    expect(screen.getByText(getDescription(SECOND_POSITION))).toBeInTheDocument();
    expect(screen.getByText(getDescription(THIRD_POSITION))).toBeInTheDocument();
  });
});

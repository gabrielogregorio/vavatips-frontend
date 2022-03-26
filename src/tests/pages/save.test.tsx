import { render, screen } from '@testing-library/react';
import MockApp from '@/mock/App.Mock';
import SaveScreen from '@/pages/save';
import { posts } from '@/mock/mockPosts.json';
import { waitByLoading } from '@/utils/waitByLoading';
import { getDescription, getTitle } from '../utils/getPosts';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/posts',
      isReady: true,
      pathname: '',
      query: { map: 'oneRandomData', agent: 'oneRandomData', type: 'save', page: 1 },
      asPath: `/posts?map=oneRandomData&agent=oneRandomData`,
    };
  },
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

    expect(screen.getByRole('heading', { name: getTitle(0) })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: getTitle(1) })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: getTitle(2) })).toBeInTheDocument();

    expect(screen.getByText(getDescription(0))).toBeInTheDocument();
    expect(screen.getByText(getDescription(1))).toBeInTheDocument();
    expect(screen.getByText(getDescription(2))).toBeInTheDocument();
  });
});

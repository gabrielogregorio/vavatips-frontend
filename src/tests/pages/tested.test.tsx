import { render, screen } from '@testing-library/react';
import MockApp from '@/mock/App.Mock';
import { posts } from '@/mock/mockPosts.json';
import TestScreen from '@/pages/tested';
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

describe('<SaveScreen />', () => {
  it('should render sage screen', async () => {
    const idPostsList = ['617d44c81bc4243f9b2d5a67', '617d44dd1bc4243f9b2d5a75', '617d44bb1bc4243f9b2d5a5d'];
    const filteredPosts = posts.filter((post) => idPostsList.includes(post.id.toString()));

    render(
      <MockApp
        localstorage={{
          TESTED_POSTS: JSON.stringify(idPostsList),
        }}>
        <TestScreen posts={filteredPosts} />
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

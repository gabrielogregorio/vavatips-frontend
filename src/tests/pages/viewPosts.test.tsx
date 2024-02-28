import { render, screen } from '@testing-library/react';
import mockPosts from '@/mock/mockPosts.json';
import { MockApp } from '@/mock/App.Mock';
import ViewPosts from '@/pages/admin/view-posts';
import { waitByLoading } from '@/utils/waitByLoading';
import { generateNumericList } from '@/helpers/generateArray';
import { Api } from '@/services/api';
import { createResponseMock } from '@/mock/createResponseMock';
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

const FIRST_POSITION = 0;
const QUANTITY_POSTS = 9;

const spyOn = jest.spyOn(Api, 'get');

describe('<HomeScreen />', () => {
  it('should render home screen', async () => {
    spyOn.mockImplementation(() => createResponseMock(mockPosts, 200));

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

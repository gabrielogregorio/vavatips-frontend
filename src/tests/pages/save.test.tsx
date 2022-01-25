import { rest } from 'msw';
import { setupServer } from 'msw/node';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '',
      pathname: '/save',
      query: { map: 'Ascent', agent: 'Sova' },
      asPath: '',
    };
  },
}));

const handlers = [
  rest.get(`http://localhost/posts`, async (req, res, ctx) =>
    // ?map=&page=1&agent=&filters=&idPosts=[%226159d1db1775570b9c406147%22,%2261ec25a792248164a4c490f3%22,%22615f3653d5dfc1f8ad206f4f%22,%22615b133a3d918dc99eaff833%22,%226161a2fdce40a7938c9cecc0%22]
    // console.log(req, 'aaaaaaaaaa');

    res(ctx.json({})),
  ),
];

const server = setupServer(...handlers);

describe('<SaveScreen />', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('should render sage screen', async () => {
    // render(
    //   <MockApp>
    //     <SaveScreen />
    //   </MockApp>,
    // );
    // await waitForElementToBeRemoved(screen.getByText(/Carregando posts/i), {
    //   timeout: 2000,
    // });
    // expect(screen.getByRole('heading', { name: mockPosts().posts[0].title })).toBeInTheDocument();
    // expect(screen.getByRole('heading', { name: mockPosts().posts[1].title })).toBeInTheDocument();
    // expect(screen.getByRole('heading', { name: mockPosts().posts[2].title })).toBeInTheDocument();
    // expect(screen.getByRole('heading', { name: mockPosts().posts[3].title })).toBeInTheDocument();
    // expect(screen.getByRole('heading', { name: mockPosts().posts[4].title })).toBeInTheDocument();
    // expect(screen.getByRole('heading', { name: mockPosts().posts[5].title })).toBeInTheDocument();
    // expect(screen.getByRole('heading', { name: mockPosts().posts[6].title })).toBeInTheDocument();
    // expect(screen.getByRole('heading', { name: mockPosts().posts[7].title })).toBeInTheDocument();
    // expect(screen.getByRole('heading', { name: mockPosts().posts[8].title })).toBeInTheDocument();
    // expect(screen.getByRole('heading', { name: mockPosts().posts[9].title })).toBeInTheDocument();
    // expect(screen.getByText(mockPosts().posts[0].description)).toBeInTheDocument();
    // expect(screen.getByText(mockPosts().posts[1].description)).toBeInTheDocument();
    // expect(screen.getByText(mockPosts().posts[2].description)).toBeInTheDocument();
    // expect(screen.getByText(mockPosts().posts[3].description)).toBeInTheDocument();
    // expect(screen.getByText(mockPosts().posts[4].description)).toBeInTheDocument();
    // expect(screen.getByText(mockPosts().posts[5].description)).toBeInTheDocument();
    // expect(screen.getByText(mockPosts().posts[6].description)).toBeInTheDocument();
    // expect(screen.getByText(mockPosts().posts[7].description)).toBeInTheDocument();
    // expect(screen.getByText(mockPosts().posts[8].description)).toBeInTheDocument();
    // expect(screen.getByText(mockPosts().posts[9].description)).toBeInTheDocument();
    // expect(screen.getAllByRole('button', { name: 'Testar' })).toHaveLength(mockPosts().posts.length);
    // expect(screen.getAllByRole('button', { name: 'Salvar' })).toHaveLength(mockPosts().posts.length);
    // expect(screen.getAllByRole('button', { name: 'Sugerir' })).toHaveLength(mockPosts().posts.length);
  });
});

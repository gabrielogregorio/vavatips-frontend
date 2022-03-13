import { screen, render } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { ErrorMsg } from '@/base/errorMsg';
import { usePosts, typeRequestType } from '@/hooks/usePosts';
import { Loader } from '@/base/loader';
import MockApp from '@/mock/App.Mock';
import { URL_GET_AGENTS_AND_MAP_SELECTED_ERROR, URL_GET_ALL_POSTS } from '@/mock/ROUTES_API';
import { waitByLoading } from '@/utils/waitByLoading';
import { ReactNode } from 'react';
import { TPropsPost } from '@/types/posts';

jest.mock(
  'next/link',
  () =>
    function LinkComponent({ children }: { children: ReactNode }) {
      return children;
    },
);

const mockPosts = [
  {
    id: 1,
    title: 'post 1',
    agent: 'side',
    map: 'moon',
    type: 'most_popular',
    page: 1,
  },
  {
    id: 2,
    title: 'post 2',
    agent: 'side',
    map: 'moon',
    type: 'most_popular',
    page: 1,
  },
  {
    id: 3,
    title: 'post 3',
    agent: 'side',
    map: 'moon',
    type: 'most_popular',
    page: 1,
  },
  {
    id: 4,
    title: 'post 4',
    agent: 'kay/0',
    map: 'ascent',
    type: '',
    page: 1,
  },
  {
    id: 5,
    title: 'post 5',
    agent: 'kay/0',
    map: 'ascent',
    type: '',
    page: 1,
  },
];

const server = setupServer(
  rest.get(URL_GET_ALL_POSTS, (req, res, ctx) => {
    const map = req.url.searchParams.get('map');
    const agent = req.url.searchParams.get('agent');
    const idPosts = req.url.searchParams.get('idPosts');
    const page = Number(req.url.searchParams.get('page'));

    if (idPosts !== null) {
      const filtered = mockPosts.filter((post) => idPosts.includes(post.id.toString()));
      return res(
        ctx.status(200),
        ctx.json({
          posts: filtered,
          count: filtered.length,
        }),
      );
    }

    let finalFilter = mockPosts.filter((post) => post.map === map);
    finalFilter = finalFilter.filter((post) => post.agent === agent);
    finalFilter = finalFilter.filter((post) => post.page === page);

    if (finalFilter.length === 0) {
      return res(ctx.status(404));
    }
    if (idPosts === null) {
      return res(
        ctx.status(200),
        ctx.json({
          posts: finalFilter,
          count: finalFilter.length,
        }),
      );
    }

    return res(ctx.status(500));
  }),

  rest.get(URL_GET_AGENTS_AND_MAP_SELECTED_ERROR, (req, res, ctx) => res(ctx.status(500))),
);

const Posts = ({
  agent,
  map,
  type,
  page,
}: {
  agent: string;
  map: string;
  type: typeRequestType;
  page: number;
}) => {
  const { posts, isLoading, errorMsg, finishPage, queryUrl } = usePosts(
    {
      route: '/posts',
      isReady: true,
      pathname: '',
      query: { map, agent, type, page: page.toString() }, //
      asPath: `/posts?map=${map}&agent=${agent}`,
      basePath: null,
      isLocaleDomain: null,
      replace: null,
      reload: null,
      push: null,
      back: null,
      beforePopState: null,
      events: null,
      isFallback: null,
      isPreview: null,
      prefetch: null,
    },
    type,
  );

  function renderPosts() {
    return posts?.map((agentItem: TPropsPost) => (
      <div key={agentItem.id}>
        <h3>ID: {agentItem.id}</h3>
        <h3>TITLE: {agentItem.title}</h3>
      </div>
    ));
  }

  return (
    <div>
      <Loader active={isLoading} />
      {errorMsg !== '' ? <ErrorMsg msg="Erro desconhecido" /> : null}
      <h3>{`PAGE: ${finishPage}`}</h3>
      <h3>{`QUERY_AGENT: ${queryUrl.agent}`}</h3>
      <h3>{`QUERY_MAP: ${queryUrl.map}`}</h3>
      <h3>{`QUERY_TYPE: ${queryUrl.type}`}</h3>
      <h3>{`QUERY_PAGE: ${queryUrl.page}`}</h3>

      {renderPosts()}
    </div>
  );
};

describe('<Posts />', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('should return posts', async () => {
    render(
      <MockApp>
        <Posts agent="side" map="moon" type="" page={1} />
      </MockApp>,
    );
    await waitByLoading();
    expect(screen.getByRole('heading', { name: 'ID: 1' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'TITLE: post 1' })).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: 'ID: 2' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'TITLE: post 2' })).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: 'ID: 3' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'TITLE: post 3' })).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: 'PAGE: 3' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'QUERY_AGENT: side' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'QUERY_MAP: moon' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'QUERY_TYPE:' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'QUERY_PAGE: 1' })).toBeInTheDocument();
  });

  it('should return post tested', async () => {
    render(
      <MockApp
        localstorage={{
          TESTED_POSTS: '["5"]',
        }}>
        <Posts agent="kay/0" map="ascent" type="tested" page={1} />
      </MockApp>,
    );

    await waitByLoading();

    expect(screen.queryByRole('heading', { name: 'ID: 4' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'TITLE: post 4' })).not.toBeInTheDocument();

    expect(screen.getByRole('heading', { name: 'ID: 5' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'TITLE: post 5' })).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: 'PAGE: 1' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'QUERY_AGENT: kay/0' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'QUERY_MAP: ascent' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'QUERY_TYPE: tested' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'QUERY_PAGE: 1' })).toBeInTheDocument();
  });

  it('should return post save', async () => {
    render(
      <MockApp
        localstorage={{
          SAVE_POSTS: '["4"]',
        }}>
        <Posts agent="kay/0" map="ascent" type="save" page={1} />
      </MockApp>,
    );

    await waitByLoading();

    expect(screen.getByRole('heading', { name: 'ID: 4' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'TITLE: post 4' })).toBeInTheDocument();

    expect(screen.queryByRole('heading', { name: 'ID: 5' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'TITLE: post 5' })).not.toBeInTheDocument();

    expect(screen.getByRole('heading', { name: 'PAGE: 1' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'QUERY_AGENT: kay/0' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'QUERY_MAP: ascent' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'QUERY_TYPE: save' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'QUERY_PAGE: 1' })).toBeInTheDocument();
  });

  // it('should test error', async () => {
  //   render(
  //     <MockApp>
  //       <Posts agent="notExists" map="notExists" type="" page={0} />
  //     </MockApp>,
  //   );

  //   await waitByLoading();
  //   expect(screen.queryByText(/Erro desconhecido/i)).toBeInTheDocument();
  // });
});

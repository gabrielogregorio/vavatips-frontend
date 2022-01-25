import { screen, render, waitForElementToBeRemoved } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import usePosts from '../../core/hooks/usePosts';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: { map: 'Ascent32' },
      asPath: '',
    };
  },
}));

jest.mock(
  'next/link',
  () =>
    function LinkComponent({ children }: any) {
      return children;
    },
);

const server = setupServer(
  rest.get('http://localhost/posts', (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        posts: [
          { id: 1, title: 'post 1' },
          { id: 2, title: 'post 2' },
          { id: 3, title: 'post 3' },
        ],
        count: 8,
      }),
    ),
  ),

  rest.get('http://localhost/agents/mapSelectedWithError', (req, res, ctx) => res(ctx.status(500))),
);

function ComponentPosts({ urlBase, typeRequest }: any) {
  const { posts, activeLoader, errorMsg, finishPage, queryUrl } = usePosts(
    {
      query: {
        agent: 'AgentItem',
        map: 'MapItem',
        type: 'TypeItem',
        page: '5',
      },
    },
    urlBase ? typeRequest : undefined,
  );

  function renderPosts() {
    return posts?.map((agent: any) => (
      <div key={agent.id}>
        <h3>ID: {agent.id}</h3>
        <h3>TITLE: {agent.title}</h3>
      </div>
    ));
  }

  return (
    <div>
      {activeLoader ? <h3>Loading...</h3> : null}
      {errorMsg !== '' ? <h3>{errorMsg}</h3> : null}
      <h3>{`PAGE: ${finishPage}`}</h3>
      <h3>{`QUERY_AGENT: ${queryUrl.agent}`}</h3>
      <h3>{`QUERY_MAP: ${queryUrl.map}`}</h3>
      <h3>{`QUERY_TYPE: ${queryUrl.type}`}</h3>
      <h3>{`QUERY_PAGE: ${queryUrl.page}`}</h3>

      {renderPosts()}
    </div>
  );
}

function ComponentPostsWithSuccess() {
  return <ComponentPosts urlBase typeRequest="" />;
}

function ComponentPostsNoSendParamsUrlBase() {
  return <ComponentPosts urlBase={false} />;
}

function ComponentPostsWithSave() {
  return <ComponentPosts urlBase typeRequest="save" />;
}

function ComponentPostsWithTested() {
  return <ComponentPosts urlBase typeRequest="tested" />;
}

describe('<ComponentPosts />', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('should return posts', async () => {
    render(<ComponentPostsWithSuccess />);

    await waitForElementToBeRemoved(screen.queryByText('Loading...'), {
      timeout: 2000,
    });

    expect(screen.getByRole('heading', { name: 'ID: 1' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'TITLE: post 1' })).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: 'ID: 2' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'TITLE: post 2' })).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: 'ID: 3' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'TITLE: post 3' })).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: 'PAGE: 8' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'QUERY_AGENT: AgentItem' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'QUERY_MAP: MapItem' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'QUERY_TYPE: TypeItem' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'QUERY_PAGE: 5' })).toBeInTheDocument();
  });

  it('should return post tested, but, not send url base', async () => {
    render(<ComponentPostsNoSendParamsUrlBase />);

    await waitForElementToBeRemoved(screen.queryByText('Loading...'), {
      timeout: 2000,
    });

    expect(screen.getByRole('heading', { name: 'ID: 1' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'TITLE: post 1' })).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: 'ID: 2' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'TITLE: post 2' })).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: 'ID: 3' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'TITLE: post 3' })).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: 'PAGE: 8' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'QUERY_AGENT: AgentItem' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'QUERY_MAP: MapItem' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'QUERY_TYPE: TypeItem' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'QUERY_PAGE: 5' })).toBeInTheDocument();
  });

  it('should return post save', async () => {
    // FIXME: integration with localstorage
    render(<ComponentPostsWithSave />);

    await waitForElementToBeRemoved(screen.queryByText('Loading...'), {
      timeout: 2000,
    });

    expect(screen.getByRole('heading', { name: 'ID: 1' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'TITLE: post 1' })).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: 'ID: 2' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'TITLE: post 2' })).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: 'ID: 3' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'TITLE: post 3' })).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: 'PAGE: 8' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'QUERY_AGENT: AgentItem' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'QUERY_MAP: MapItem' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'QUERY_TYPE: TypeItem' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'QUERY_PAGE: 5' })).toBeInTheDocument();
  });

  it('should return post tested', async () => {
    // FIXME: integration with localstorage
    render(<ComponentPostsWithTested />);

    await waitForElementToBeRemoved(screen.queryByText('Loading...'), {
      timeout: 2000,
    });

    expect(screen.getByRole('heading', { name: 'ID: 1' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'TITLE: post 1' })).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: 'ID: 2' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'TITLE: post 2' })).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: 'ID: 3' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'TITLE: post 3' })).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: 'PAGE: 8' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'QUERY_AGENT: AgentItem' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'QUERY_MAP: MapItem' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'QUERY_TYPE: TypeItem' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'QUERY_PAGE: 5' })).toBeInTheDocument();
  });

  // it('should test error', async () => {
  //   render(<ComponentPosts />);

  //   await waitForElementToBeRemoved(screen.queryByText('Loading...'), {
  //     timeout: 2000,
  //   });

  //   expect(screen.queryByText(/Erro desconhecido no servidor/i)).toBeInTheDocument();
  // });
});

import { screen, render, waitForElementToBeRemoved } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import useAgents from '../../core/hooks/useAgents';

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
  rest.get('http://localhost/agents/mapSelectedWithSuccess', (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        agents: [
          { id: 1, title: 'title 1' },
          { id: 2, title: 'title 2' },
          { id: 3, title: 'title 3' },
        ],
      }),
    ),
  ),

  rest.get('http://localhost/agents/mapSelectedWithError', (req, res, ctx) => res(ctx.status(500))),
);

function ComponentAgentTest({ typeMap }: any) {
  const { mapSelected, agentsApi, activeLoader, errorMsg } = useAgents({
    query: {
      map: typeMap,
    },
  });

  function renderPosts() {
    return agentsApi?.map((agent: any) => (
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
      <h3>MAP SELECTED: {mapSelected.map} </h3>
      {renderPosts()}
    </div>
  );
}

function ComponentAgentTestSuccess() {
  return <ComponentAgentTest typeMap="mapSelectedWithSuccess" />;
}

function ComponentAgentTestError() {
  return <ComponentAgentTest typeMap="mapSelectedWithError" />;
}

describe('<ComponentAgentTest />', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('should test resolve query', async () => {
    render(<ComponentAgentTestSuccess />);

    await waitForElementToBeRemoved(screen.queryByText('Loading...'), {
      timeout: 2000,
    });

    expect(screen.getByRole('heading', { name: 'ID: 1' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'TITLE: title 1' })).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: 'ID: 2' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'TITLE: title 2' })).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: 'ID: 3' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'TITLE: title 3' })).toBeInTheDocument();
  });

  it('should test error', async () => {
    render(<ComponentAgentTestError />);

    await waitForElementToBeRemoved(screen.queryByText('Loading...'), {
      timeout: 2000,
    });

    expect(screen.queryByText(/Erro desconhecido no servidor/i)).toBeInTheDocument();
  });
});

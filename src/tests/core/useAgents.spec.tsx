import { screen, render } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { useAgents } from '@/hooks/useAgents';
import {
  URL_GET_AGENTS_AND_MAP_SELECTED_ERROR,
  URL_GET_AGENTS_AND_MAP_SELECTED_SUCCESS,
} from '@/mock/ROUTES_API';
import MockApp from '@/mock/App.Mock';
import { waitByLoading } from '@/utils/waitByLoading';
import { ReactNode } from 'react';

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
    function Component({ children }: { children: ReactNode }) {
      return children;
    },
);

const server = setupServer(
  rest.get(URL_GET_AGENTS_AND_MAP_SELECTED_SUCCESS, (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        agents: ['Cypher', 'Killjoy', 'Sage', 'Sova', 'Viper'],
      }),
    ),
  ),

  rest.get(URL_GET_AGENTS_AND_MAP_SELECTED_ERROR, (req, res, ctx) => res(ctx.status(500))),
);

const AgentTest = ({ typeMap }: { typeMap: string }) => {
  const { mapSelected, agentsApi, isLoading, error } = useAgents({
    query: {
      map: typeMap,
    },
    route: '',
    pathname: '',
    asPath: '',
    basePath: '',
    isLocaleDomain: false,
    push: () => null,
    replace: () => null,
    reload: () => null,
    back: null,
    prefetch: null,
    beforePopState: null,
    events: null,
    isFallback: null,
    isReady: null,
    isPreview: null,
  });

  function renderPosts() {
    return agentsApi?.map((agent) => (
      <div key={agent}>
        <h3>NAME: {agent}</h3>
      </div>
    ));
  }

  return (
    <div>
      {isLoading ? <h3>Loading...</h3> : null}
      {error !== '' ? <h3>{error}</h3> : null}
      <h3>MAP SELECTED: {mapSelected.map} </h3>
      {renderPosts()}
    </div>
  );
};

const AgentTestSuccess = () => <AgentTest typeMap="mapSuccess" />;

// const AgentTestError = () => <AgentTest typeMap="mapError" />;

describe('<AgentTest />', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('should test resolve query', async () => {
    render(
      <MockApp>
        <AgentTestSuccess />
      </MockApp>,
    );

    await waitByLoading();

    expect(screen.getByRole('heading', { name: 'NAME: Cypher' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'NAME: Killjoy' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'NAME: Sage' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'NAME: Sova' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'NAME: Viper' })).toBeInTheDocument();
  });

  // it('should test error', async () => {
  //   render(
  //     <MockApp>
  //       <AgentTestError />
  //     </MockApp>,
  //   );

  //   await waitByLoading();

  //   expect(screen.queryByText(/Erro desconhecido no servidor/i)).toBeInTheDocument();
  // });
});

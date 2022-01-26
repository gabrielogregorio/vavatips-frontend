import { screen, render, waitForElementToBeRemoved } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import useMaps from '../../core/hooks/useMaps';

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
let count = 0;

const server = setupServer(
  rest.get('http://127.0.0.1:3333/maps', (req, res, ctx) => {
    if (count === 1) {
      return res(ctx.status(500));
    }
    count += 1;
    return res(
      ctx.status(200),
      ctx.json({
        maps: [
          { id: 1, title: 'map 1' },
          { id: 2, title: 'map 2' },
          { id: 3, title: 'map 3' },
        ],
      }),
    );
  }),
);

function ComponentAgentTest() {
  const { mapsApi, activeLoader, errorMsg } = useMaps();

  function renderMaps() {
    return mapsApi?.map((map: any) => (
      <div key={map.id}>
        <h3>ID: {map.id}</h3>
        <h3>TITLE: {map.title}</h3>
      </div>
    ));
  }

  return (
    <div>
      {activeLoader ? <h3>Loading...</h3> : null}
      {errorMsg !== '' ? <h3>{errorMsg}</h3> : null}
      {renderMaps()}
    </div>
  );
}

describe('<ComponentAgentTest />', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('should render map component', async () => {
    render(<ComponentAgentTest />);

    await waitForElementToBeRemoved(screen.queryByText('Loading...'), {
      timeout: 2000,
    });

    expect(screen.getByRole('heading', { name: 'ID: 1' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'TITLE: map 1' })).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: 'ID: 2' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'TITLE: map 2' })).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: 'ID: 3' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'TITLE: map 3' })).toBeInTheDocument();
  });

  it('should render with unknown error', async () => {
    render(<ComponentAgentTest />);

    await waitForElementToBeRemoved(screen.queryByText('Loading...'), {
      timeout: 2000,
    });

    expect(screen.queryByText(/Erro desconhecido no servidor/i)).toBeInTheDocument();
  });
});

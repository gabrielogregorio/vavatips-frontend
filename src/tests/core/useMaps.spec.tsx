import { screen, render } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import useMaps from '@/hooks/useMaps';
import { URL_GET_ALL_MAPS } from '@/mock/ROUTES_API';
import MockApp from '@/mock/App.Mock';
import waitByLoading from '@/utils/waitByLoading';
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
    function LinkComponent({ children }: { children: ReactNode }) {
      return children;
    },
);
let count = 0;

const server = setupServer(
  rest.get(URL_GET_ALL_MAPS, (req, res, ctx) => {
    if (count === 1) {
      return res(ctx.status(500));
    }
    count += 1;
    return res(
      ctx.status(200),
      ctx.json({
        maps: ['Ascent', 'Bind', 'Breeze', 'Fracture', 'Haven', 'Icebox', 'Split'],
      }),
    );
  }),
);

const AgentTest = () => {
  const { mapsApi, isLoading, error } = useMaps();

  function renderMaps() {
    return mapsApi?.map((map: string) => (
      <div key={map}>
        <h3>TITLE: {map}</h3>
      </div>
    ));
  }

  return (
    <div>
      {isLoading ? <h3>Loading...</h3> : null}
      {error !== '' ? <h3>{error}</h3> : null}
      {renderMaps()}
    </div>
  );
};

describe('<AgentTest />', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('should render map component', async () => {
    render(
      <MockApp>
        <AgentTest />
      </MockApp>,
    );

    await waitByLoading();

    expect(screen.getByRole('heading', { name: 'TITLE: Ascent' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'TITLE: Bind' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'TITLE: Breeze' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'TITLE: Fracture' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'TITLE: Haven' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'TITLE: Icebox' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'TITLE: Split' })).toBeInTheDocument();
  });

  it('should render with unknown error', async () => {
    render(
      <MockApp>
        <AgentTest />
      </MockApp>,
    );

    await waitByLoading();

    expect(screen.queryByText(/Erro desconhecido no servidor/i)).toBeInTheDocument();
  });
});

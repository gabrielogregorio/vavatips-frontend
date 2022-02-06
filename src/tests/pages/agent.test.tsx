import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import AgentScreen from '@/pages/agents';
import MockApp from '@/mock/App.Mock';
import { mockAgents } from '@/mock/mock';
import { URL_GET_AGENTS_BY_MAP_ASCENT } from '@/mock/ROUTES_API';
import waitByLoading from '@/utils/waitByLoading';

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

const handlers = [
  rest.get(URL_GET_AGENTS_BY_MAP_ASCENT, async (req, res, ctx) => res(ctx.json(mockAgents()))),
];

const server = setupServer(...handlers);

describe('<AgentScreen />', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('should render agent screen', async () => {
    render(
      <MockApp>
        <AgentScreen />
      </MockApp>,
    );

    await waitByLoading();

    expect(screen.getByText(/Sova/i)).toBeInTheDocument();
    expect(screen.getByText(/Astra/i)).toBeInTheDocument();
    expect(screen.getByText(/Raze/i)).toBeInTheDocument();
    expect(screen.getByText(/Yoru/i)).toBeInTheDocument();

    expect(screen.getByRole('img', { name: 'Sova' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Astra' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Raze' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Yoru' })).toBeInTheDocument();

    userEvent.click(screen.getByText(/Yoru/i));
  });
});

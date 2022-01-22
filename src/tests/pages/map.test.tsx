import { screen, render, waitForElementToBeRemoved } from '@testing-library/react';
import MapScreen from '../../pages';
import { rest } from 'msw';
import { mockMaps } from '../mock/mock';
import { setupServer } from 'msw/node';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '',
      pathname: '',
      query: {},
      asPath: '',
    };
  },
}));

const handlers = [
  rest.get(`http://localhost/maps`, async (req, res, ctx) => {
    return res(ctx.json(mockMaps()));
  }),
];

const server = setupServer(...handlers);

describe('<MapScreen />', () => {
  beforeAll(() => {
    return server.listen();
  });

  afterEach(() => {
    return server.resetHandlers();
  });

  afterAll(() => {
    return server.close();
  });

  it('should render maps screen', async () => {
    render(<MapScreen />);

    await waitForElementToBeRemoved(screen.getByText(/Buscando Mapas/i), {
      timeout: 2000,
    });

    expect(screen.getByText(/Split/i)).toBeInTheDocument();
    expect(screen.getByText(/Ascent/i)).toBeInTheDocument();
    expect(screen.getByText(/Icebox/i)).toBeInTheDocument();

    expect(screen.getByRole('img', { name: 'Split' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Ascent' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Icebox' })).toBeInTheDocument();
  });
});

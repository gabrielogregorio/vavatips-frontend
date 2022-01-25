import { screen, render, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import MapScreen from '../../pages';
import { mockMaps } from '../mock/mock';

jest.mock(
  'next/link',
  () =>
    function LinkComponent({ children }: any) {
      return children;
    },
);

const handlers = [rest.get(`http://localhost/maps`, async (req, res, ctx) => res(ctx.json(mockMaps())))];

const server = setupServer(...handlers);

describe('<MapScreen />', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

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

    userEvent.click(screen.getByText(/Split/i));
  });
});

import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import MapScreen from '@/pages/index';
import MockApp from '@/mock/App.Mock';
import { mockMaps } from '@/mock/mock';
import { URL_GET_ALL_MAPS } from '@/mock/ROUTES_API';
import { waitByLoading } from '@/utils/waitByLoading';
import { ReactNode } from 'react';

jest.mock(
  'next/link',
  () =>
    function LinkComponent({ children }: { children: ReactNode }) {
      return children;
    },
);

const handlers = [rest.get(URL_GET_ALL_MAPS, async (req, res, ctx) => res(ctx.json(mockMaps())))];

const server = setupServer(...handlers);

describe('<MapScreen />', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('should render maps screen', async () => {
    render(
      <MockApp>
        <MapScreen />
      </MockApp>,
    );

    await waitByLoading();

    expect(screen.getByText(/Split/i)).toBeInTheDocument();
    expect(screen.getByText(/Ascent/i)).toBeInTheDocument();
    expect(screen.getByText(/Icebox/i)).toBeInTheDocument();

    expect(screen.getByRole('img', { name: 'Split' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Ascent' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Icebox' })).toBeInTheDocument();

    userEvent.click(screen.getByText(/Split/i));
  });
});

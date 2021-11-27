import 'dotenv/config';
import {
  screen,
  render,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { MapScreen } from '../../pages/Map';
import { BrowserRouter } from 'react-router-dom';
import { rest } from 'msw';
import { mockMaps } from '../mock/mock';
import { setupServer } from 'msw/node';

const baseURL = process.env.REACT_APP_API_HOST;

const handlers = [
  rest.get(`${baseURL}/maps`, async (req, res, ctx) => {
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
    render(
      <BrowserRouter>
        <MapScreen />
      </BrowserRouter>,
    );

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

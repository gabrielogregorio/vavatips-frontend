import { screen, render, waitForElementToBeRemoved } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import SuggestionScreen from '../../pages/admin/suggestions';

// FIXME: test JWT token

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
  rest.get(`http://localhost/suggestions`, async (req, res, ctx) =>
    res(
      ctx.json([
        {
          description: 'description 111',
          email: 'email@email.com111',
          id: '111',
        },
        {
          description: 'description 222',
          email: 'email@email.com222',
          id: '222',
        },
        {
          description: 'description 333',
          email: 'email@email.com333',
          id: '333',
        },
        {
          description: 'description 444',
          email: 'email@email.com444',
          id: '444',
        },
      ]),
    ),
  ),
];

const server = setupServer(...handlers);

describe('<SuggestionScreen />', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('should render suggestion screen', async () => {
    render(<SuggestionScreen />);

    await waitForElementToBeRemoved(screen.getByTestId(/loader/i), {
      timeout: 2000,
    });

    expect(screen.getByText('description 111')).toBeDefined();
    expect(screen.getByText('email@email.com111')).toBeDefined();

    expect(screen.getByText('description 222')).toBeDefined();
    expect(screen.getByText('email@email.com222')).toBeDefined();

    expect(screen.getByText('description 333')).toBeDefined();
    expect(screen.getByText('email@email.com333')).toBeDefined();

    expect(screen.getByText('description 444')).toBeDefined();
    expect(screen.getByText('email@email.com444')).toBeDefined();
  });
});

import { screen, render } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Suggestions from '@/pages/admin/suggestions';
import MockApp from '@/mock/App.Mock';
import { URL_GET_ALL_SUGGESTIONS } from '@/mock/ROUTES_API';
import { waitByLoading } from '@/utils/waitByLoading';
import { ReactNode } from 'react';
import { defaultMockRouterType } from 'src/tests/components/managmentPost.spec';

jest.mock('next/router', () => ({
  useRouter(): defaultMockRouterType {
    return {
      route: '/',
      pathname: '',
      query: { map: 'Ascent32' },
      asPath: '',
      isReady: true,
    };
  },
}));

jest.mock(
  'next/link',
  () =>
    function LinkComponent({ children }: { children: ReactNode }): ReactNode {
      return children;
    },
);

const handlers = [
  rest.get(URL_GET_ALL_SUGGESTIONS, async (_req, res, ctx) =>
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

describe('<Suggestions />', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('should render suggestion screen', async () => {
    render(
      <MockApp>
        <Suggestions />
      </MockApp>,
    );

    await waitByLoading();

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

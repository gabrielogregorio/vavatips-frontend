import { screen, render } from '@testing-library/react';
import Suggestions from '@/pages/admin/suggestions';
import { MockApp } from '@/mock/App.Mock';
import { waitByLoading } from '@/utils/waitByLoading';
import { ReactNode } from 'react';
import { Api } from '@/services/api';
import { createResponseMock } from '@/mock/createResponseMock';

jest.mock('next/router', () => ({
  useRouter: () => ({
    asPath: '',
    pathname: '',
    query: { map: 'Ascent32' },
    route: '/',
  }),
}));

jest.mock(
  'next/link',
  () =>
    ({ children }: { children: ReactNode }) =>
      children,
);

const spyOn = jest.spyOn(Api, 'get');

describe('<Suggestions />', () => {
  beforeEach(() => {});

  it('should render suggestion screen', async () => {
    spyOn.mockImplementation(() =>
      createResponseMock(
        [
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
        ],
        200,
      ),
    );

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

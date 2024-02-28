import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AgentScreen from '@/pages/agents/[map]';
import { MockApp } from '@/mock/App.Mock';
import { mockAgents } from '@/mock/mock';
import { waitByLoading } from '@/utils/waitByLoading';
import { ReactNode } from 'react';

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

describe('<AgentScreen />', () => {
  it('should render agent screen', async () => {
    render(
      <MockApp>
        <AgentScreen agentsApi={mockAgents().agents} />
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

    await userEvent.click(screen.getByText(/Yoru/i));
  });
});

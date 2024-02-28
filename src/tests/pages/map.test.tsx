import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MapScreen from '@/pages/index';
import { MockApp } from '@/mock/App.Mock';
import { mockMaps } from '@/mock/mock';
import { waitByLoading } from '@/utils/waitByLoading';
import { ReactNode } from 'react';

jest.mock(
  'next/link',
  () =>
    ({ children }: { children: ReactNode }) =>
      children,
);

describe('<MapScreen />', () => {
  it('should render maps screen', async () => {
    render(
      <MockApp>
        <MapScreen mapsApi={mockMaps().maps} />
      </MockApp>,
    );

    await waitByLoading();

    expect(screen.getByText(/Split/i)).toBeInTheDocument();
    expect(screen.getByText(/Ascent/i)).toBeInTheDocument();
    expect(screen.getByText(/Icebox/i)).toBeInTheDocument();

    expect(screen.getByRole('img', { name: 'Split' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Ascent' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Icebox' })).toBeInTheDocument();

    await userEvent.click(screen.getByText(/Split/i));
  });
});

import { render, screen } from '@testing-library/react';
import { NotFoundScreen } from './NotFound';

describe('<NotFoundScreen />', () => {
  it('should render NotFoundScreen', () => {
    render(<NotFoundScreen />);
    expect(
      screen.getByRole('heading', { name: 'Not Found' }),
    ).toBeInTheDocument();
  });
});
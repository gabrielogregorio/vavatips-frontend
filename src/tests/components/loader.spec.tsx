import { render, screen } from '@testing-library/react';
import Loader from '@/base/loader';

describe('<Loader />', () => {
  it('should render Loader', () => {
    render(<Loader active />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('should not render Loader if active === false', () => {
    render(<Loader active={false} />);
    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
  });
});

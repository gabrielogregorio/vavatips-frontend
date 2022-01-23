import { render, screen } from '@testing-library/react';
import LoaderComponent from '@/base/loader';

describe('<LoaderComponent />', () => {
  it('should render LoaderComponent', () => {
    render(<LoaderComponent active />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('should not render LoaderComponent if active === false', () => {
    render(<LoaderComponent active={false} />);
    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
  });
});

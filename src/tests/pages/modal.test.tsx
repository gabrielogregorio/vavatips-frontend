import { render, screen } from '@testing-library/react';
import { NotFoundScreen } from '../../pages/NotFound';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '',
      pathname: '',
      query: {},
      asPath: '',
    };
  },
}));

describe('<NotFoundScreen />', () => {
  it('should render NotFoundScreen', () => {
    render(<NotFoundScreen />);
    expect(screen.getByRole('heading', { name: 'Not Found' })).toBeInTheDocument();
  });
});

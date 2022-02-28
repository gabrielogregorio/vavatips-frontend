import { render, screen } from '@testing-library/react';
import { Footer } from '@/layout/footer';

describe('<Footer />', () => {
  it('should render footer with primary color', () => {
    render(<Footer />);
    expect(screen.getByRole('heading', { name: 'Sobre' })).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import FooterComponent from '@/layout/footer';

describe('<FooterComponent />', () => {
  it('should render footer with primary color', () => {
    render(<FooterComponent />);
    expect(screen.getByRole('heading', { name: 'Sobre' })).toBeInTheDocument();
  });
});

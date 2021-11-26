import { render, screen } from '@testing-library/react';
import { FooterComponent } from '.';

describe('<FooterComponent />', () => {
  it('should render footer with primary color', () => {
    render(<FooterComponent color="primary" />);
    expect(screen.getByRole('heading', { name: 'Sobre' })).toBeInTheDocument();
  });
});

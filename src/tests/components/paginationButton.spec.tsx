import { render, screen } from '@testing-library/react';
import PaginationButtons, { PaginationDotItems } from '../../components/base/paginationButtons';

describe('PaginationButtons', () => {
  it('should render input', () => {
    render(<PaginationButtons numberOfPage={7} key={32} active urlBase="items" map="Ascent" agent="Jett" />);

    expect(screen.getByRole('link', { name: '7' })).toBeInTheDocument();

    expect(screen.getByRole('link', { name: '7' })).toHaveAttribute('class', 'active');
    expect(screen.getByRole('link', { name: '7' })).toHaveAttribute('href', '/items?map=Ascent&agent=Jett&page=7');
  });

  it('should render not active', () => {
    render(<PaginationButtons numberOfPage={3} key={32} active={false} urlBase="posts" map="Bind" agent="Raze" />);

    expect(screen.getByRole('link', { name: '3' })).toBeInTheDocument();

    expect(screen.getByRole('link', { name: '3' })).not.toHaveAttribute('class', 'active');
    expect(screen.getByRole('link', { name: '3' })).toHaveAttribute('href', '/posts?map=Bind&agent=Raze&page=3');
  });

  it('should render empty button', () => {
    render(<PaginationDotItems />);
    expect(screen.getByText('...')).toBeInTheDocument();
  });
});

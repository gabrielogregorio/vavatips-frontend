import { render, screen } from '@testing-library/react';
import PaginationButtons, { PaginationDotItems } from '@/base/paginationButtons';

describe('PaginationButtons', () => {
  it('should render pagination buttons', () => {
    render(
      <PaginationButtons
        numberOfPage={7}
        key={32}
        active
        urlBase="items"
        map="Ascent"
        agent="Jett"
      />,
    );

    expect(screen.getByRole('link', { name: '7' })).toBeInTheDocument();

    expect(screen.getByRole('link', { name: '7' })).toHaveAttribute(
      'class',
      'block p-2 bg-transparent hover:bg-skin-secondary-light hover:text-skin-gray-400 bg-skin-secondary-light text-skin-gray-400',
    );
    expect(screen.getByRole('link', { name: '7' })).toHaveAttribute(
      'href',
      '/items?page=7&map=Ascent&agent=Jett',
    );
  });

  it('should render not active', () => {
    render(
      <PaginationButtons
        numberOfPage={3}
        key={32}
        active={false}
        urlBase="posts"
        map="Bind"
        agent="Raze"
      />,
    );

    expect(screen.getByRole('link', { name: '3' })).toBeInTheDocument();

    expect(screen.getByRole('link', { name: '3' })).not.toHaveAttribute(
      'class',
      'block p-2 bg-transparent hover:bg-skin-secondary-light hover:text-skin-gray-400 bg-skin-secondary-light text-skin-gray-400',
    );
    expect(screen.getByRole('link', { name: '3' })).toHaveAttribute(
      'href',
      '/posts?page=3&map=Bind&agent=Raze',
    );
  });

  it('should render empty button', () => {
    render(<PaginationDotItems />);
    expect(screen.getByText('...')).toBeInTheDocument();
  });
});

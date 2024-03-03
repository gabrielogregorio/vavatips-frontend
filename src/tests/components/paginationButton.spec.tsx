import { render, screen } from '@testing-library/react';
import { PaginationButtons, PaginationDotItems } from '@/base/paginationButtons';

const ANY_KEY = 32;

describe('PaginationButtons', () => {
  it('should render pagination buttons', () => {
    const NUMBER_OF_PAGE = 7;
    render(
      <PaginationButtons
        numberOfPage={NUMBER_OF_PAGE}
        key={ANY_KEY}
        active
        urlBase="items"
        map="Ascent"
        agent="Jett"
      />,
    );

    expect(screen.getByRole('link', { name: `Navega para a página ${NUMBER_OF_PAGE}` })).toBeInTheDocument();

    expect(screen.getByRole('link', { name: `Navega para a página ${NUMBER_OF_PAGE}` })).toHaveAttribute(
      'href',
      'items?agent=Jett&map=Ascent&page=7',
    );
  });

  it('should render not active', () => {
    const NUMBER_OF_PAGE = 3;
    render(
      <PaginationButtons
        numberOfPage={NUMBER_OF_PAGE}
        key={ANY_KEY}
        active={false}
        urlBase="posts"
        map="Bind"
        agent="Raze"
      />,
    );

    expect(screen.getByRole('link', { name: `Navega para a página ${NUMBER_OF_PAGE}` })).toBeInTheDocument();

    expect(screen.getByRole('link', { name: `Navega para a página ${NUMBER_OF_PAGE}` })).toHaveAttribute(
      'href',
      'posts?agent=Raze&map=Bind&page=3',
    );
  });

  it('should render empty button', () => {
    render(<PaginationDotItems />);
    expect(screen.getByText('...')).toBeInTheDocument();
  });
});

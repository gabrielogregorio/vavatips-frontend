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

    expect(screen.getByRole('link', { name: NUMBER_OF_PAGE.toString() })).toBeInTheDocument();

    expect(screen.getByRole('link', { name: NUMBER_OF_PAGE.toString() })).toHaveAttribute(
      'href',
      '/items?page=7&map=Ascent&agent=Jett',
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

    expect(screen.getByRole('link', { name: NUMBER_OF_PAGE.toString() })).toBeInTheDocument();

    expect(screen.getByRole('link', { name: NUMBER_OF_PAGE.toString() })).toHaveAttribute(
      'href',
      '/posts?page=3&map=Bind&agent=Raze',
    );
  });

  it('should render empty button', () => {
    render(<PaginationDotItems />);
    expect(screen.getByText('...')).toBeInTheDocument();
  });
});

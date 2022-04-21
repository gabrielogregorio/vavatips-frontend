import { render, screen } from '@testing-library/react';
import { PaginationButtons, PaginationDotItems } from '@/base/paginationButtons';

const EXAMPLE_KEY_PAGE = 32;
const EXAMPLE_NUMBER_PAGE = 7;
const EXAMPLE_NUMBER_PAGE_SECOND = 3;

describe('PaginationButtons', () => {
  it('should render pagination buttons', () => {
    render(
      <PaginationButtons
        numberOfPage={EXAMPLE_NUMBER_PAGE}
        key={EXAMPLE_KEY_PAGE}
        active
        urlBase="items"
        map="Ascent"
        agent="Jett"
      />,
    );

    expect(screen.getByRole('link', { name: EXAMPLE_NUMBER_PAGE.toString() })).toBeInTheDocument();

    expect(screen.getByRole('link', { name: EXAMPLE_NUMBER_PAGE.toString() })).toHaveAttribute(
      'class',
      'block p-2 bg-transparent hover:bg-skin-secondary-light hover:text-skin-white bg-skin-secondary-light text-skin-white',
    );
    expect(screen.getByRole('link', { name: EXAMPLE_NUMBER_PAGE.toString() })).toHaveAttribute(
      'href',
      '/items?page=7&map=Ascent&agent=Jett',
    );
  });

  it('should render not active', () => {
    render(
      <PaginationButtons
        numberOfPage={EXAMPLE_NUMBER_PAGE_SECOND}
        key={EXAMPLE_KEY_PAGE}
        active={false}
        urlBase="posts"
        map="Bind"
        agent="Raze"
      />,
    );

    expect(screen.getByRole('link', { name: EXAMPLE_NUMBER_PAGE_SECOND.toString() })).toBeInTheDocument();

    expect(screen.getByRole('link', { name: EXAMPLE_NUMBER_PAGE_SECOND.toString() })).not.toHaveAttribute(
      'class',
      'block p-2 bg-transparent hover:bg-skin-secondary-light hover:text-skin-white bg-skin-secondary-light text-skin-white',
    );
    expect(screen.getByRole('link', { name: EXAMPLE_NUMBER_PAGE_SECOND.toString() })).toHaveAttribute(
      'href',
      '/posts?page=3&map=Bind&agent=Raze',
    );
  });

  it('should render empty button', () => {
    render(<PaginationDotItems />);
    expect(screen.getByText('...')).toBeInTheDocument();
  });
});

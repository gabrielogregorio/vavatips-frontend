import { render, screen } from '@testing-library/react';
import PaginationComponent from '../../components/widgets/pagination';

describe('PaginationComponent', () => {
  it('should render input', () => {
    render(<PaginationComponent urlBase="posts" initial={1} finish={4} selected={2} map="Ascent" agent="Neon" />);
    expect(screen.getByRole('link', { name: '2' })).toHaveAttribute('class', 'active');

    expect(screen.getByRole('link', { name: '1' })).toHaveAttribute('href', '/posts?map=Ascent&agent=Neon&page=1');
    expect(screen.getByRole('link', { name: '2' })).toHaveAttribute('href', '/posts?map=Ascent&agent=Neon&page=2');
    expect(screen.getByRole('link', { name: '3' })).toHaveAttribute('href', '/posts?map=Ascent&agent=Neon&page=3');
    expect(screen.getByRole('link', { name: '4' })).toHaveAttribute('href', '/posts?map=Ascent&agent=Neon&page=4');
  });

  it('should render input', () => {
    render(<PaginationComponent urlBase="posts" initial={1} finish={10} selected={1} map="Ascent" agent="Neon" />);
    expect(screen.getByRole('link', { name: '1' })).toHaveAttribute('class', 'active');

    expect(screen.getByRole('link', { name: '1' })).toHaveAttribute('href', '/posts?map=Ascent&agent=Neon&page=1');
    expect(screen.getByRole('link', { name: '2' })).toHaveAttribute('href', '/posts?map=Ascent&agent=Neon&page=2');
    expect(screen.getByRole('link', { name: '3' })).toHaveAttribute('href', '/posts?map=Ascent&agent=Neon&page=3');
    expect(screen.getByText('...')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '10' })).toHaveAttribute('href', '/posts?map=Ascent&agent=Neon&page=10');
  });

  it('should render input', () => {
    render(<PaginationComponent urlBase="posts" initial={1} finish={100} selected={28} map="Ascent" agent="Neon" />);
    expect(screen.getByRole('link', { name: '28' })).toHaveAttribute('class', 'active');

    expect(screen.getAllByText('...')[0]).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '27' })).toHaveAttribute('href', '/posts?map=Ascent&agent=Neon&page=27');
    expect(screen.getByRole('link', { name: '28' })).toHaveAttribute('href', '/posts?map=Ascent&agent=Neon&page=28');
    expect(screen.getByRole('link', { name: '29' })).toHaveAttribute('href', '/posts?map=Ascent&agent=Neon&page=29');
    expect(screen.getAllByText('...')[1]).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '100' })).toHaveAttribute('href', '/posts?map=Ascent&agent=Neon&page=100');
  });
});

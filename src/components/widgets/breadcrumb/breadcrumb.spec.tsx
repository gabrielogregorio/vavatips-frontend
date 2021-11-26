import { render, screen } from '@testing-library/react';
import { BreadcrumbComponent } from '.';
import { BrowserRouter } from 'react-router-dom';

const breadcrumbs = [
  { url: '/', text: 'inicio' },
  { url: '/Maps', text: 'mapas' },
  { url: '/Maps', text: 'agentes' },
  { url: '/Posts', text: 'dicas' },
];
describe('<BreadcrumbComponent />', () => {
  it('should render breadcrumb', () => {
    render(
      <BrowserRouter>
        <BreadcrumbComponent breadcrumbs={breadcrumbs} />
      </BrowserRouter>,
    );
    expect(screen.getByRole('link', { name: 'inicio' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'mapas' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'agentes' })).toBeInTheDocument();
  });
});

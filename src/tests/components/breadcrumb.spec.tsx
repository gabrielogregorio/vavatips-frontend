import { render, screen } from '@testing-library/react';
import { BreadcrumbComponent } from '@/widgets/breadcrumb';

const breadcrumbs = [
  { url: '/', text: 'inicio' },
  { url: '/maps', text: 'mapas' },
  { url: '/maps', text: 'agentes' },
  { url: '/posts', text: 'dicas' },
];
describe('<BreadcrumbComponent />', () => {
  it('should render breadcrumb', () => {
    render(<BreadcrumbComponent breadcrumbs={breadcrumbs} />);
    expect(screen.getByRole('link', { name: 'inicio' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'mapas' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'agentes' })).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import { Breadcrumb } from '@/widgets/breadcrumb';

const breadcrumbs = [
  { text: 'inicio', url: '/' },
  { text: 'mapas', url: '/maps' },
  { text: 'agentes', url: '/maps' },
  { text: 'dicas', url: '/posts' },
];

describe('<Breadcrumb />', () => {
  it('should render breadcrumb', () => {
    render(<Breadcrumb breadcrumbs={breadcrumbs} />);
    expect(screen.getByRole('link', { name: 'inicio' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'mapas' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'agentes' })).toBeInTheDocument();
  });
});

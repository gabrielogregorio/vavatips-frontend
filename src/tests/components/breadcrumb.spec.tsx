import { render, screen } from '@testing-library/react';
import Breadcrumb from '@/widgets/breadcrumb';

const breadcrumbs = [
  { url: '/', text: 'inicio' },
  { url: '/maps', text: 'mapas' },
  { url: '/maps', text: 'agentes' },
  { url: '/posts', text: 'dicas' },
];

describe('<Breadcrumb />', () => {
  it('should render breadcrumb', () => {
    render(<Breadcrumb breadcrumbs={breadcrumbs} admin={false} />);
    expect(screen.getByRole('link', { name: 'inicio' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'mapas' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'agentes' })).toBeInTheDocument();
  });
});

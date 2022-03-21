import { render, screen } from '@testing-library/react';
import { TagsFixFilters } from '@/widgets/tagsFixFilters';

describe('<TagsFixFilters />', () => {
  it('should render fix tags', () => {
    render(
      <TagsFixFilters
        queryUrl={{
          agent: 'Killjoy',
          map: 'Breeze',
          type: 'tested',
          page: '1',
          isReady: true,
        }}
      />,
    );

    expect(screen.getByRole('button', { name: '#Killjoy' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '#Breeze' })).toBeInTheDocument();
  });

  it('should render fix tags with empty values', () => {
    render(
      <TagsFixFilters
        queryUrl={{
          agent: '',
          map: '',
          type: 'tested',
          page: '1',
          isReady: true,
        }}
      />,
    );

    expect(screen.queryByRole('button', { name: '#Killjoy' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: '#Breeze' })).not.toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import { useMemo, useState } from 'react';
import { Tags } from '@/widgets/tags';
import { ContextFilters } from '@/contexts/filters';

const TestTags = () => {
  const [tags, setTags] = useState<string[]>(['Ascent', 'Raze', 'Atacante']);
  const [filters, setFilters] = useState<string[]>([]);

  const valueFilters = useMemo(() => ({ tags, filters, setTags, setFilters }), [tags, filters]);
  return (
    <ContextFilters.Provider value={valueFilters}>
      <Tags />
    </ContextFilters.Provider>
  );
};

describe('<Tags />', () => {
  it('should render tags', () => {
    render(<TestTags />);

    screen.getByRole('button', { name: 'Ascent' });
    screen.getByRole('button', { name: 'Raze' });
    screen.getByRole('button', { name: 'Atacante' });
  });
});

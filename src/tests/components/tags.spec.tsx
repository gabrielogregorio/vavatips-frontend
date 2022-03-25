import { render, screen } from '@testing-library/react';
import { useState } from 'react';
import { Tags } from '@/widgets/tags';

const TestTags = () => {
  const tags = ['Ascent', 'Raze', 'Atacante'];
  const [filteredActives, setFilteredsActive] = useState<string[]>([]);

  return <Tags tags={tags} setFilteredsActive={setFilteredsActive} filteredActives={filteredActives} />;
};

describe('<Tags />', () => {
  it('should render tags', () => {
    render(<TestTags />);

    screen.getByRole('button', { name: 'Ascent' });
    screen.getByRole('button', { name: 'Raze' });
    screen.getByRole('button', { name: 'Atacante' });
  });
});

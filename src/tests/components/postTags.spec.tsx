import { render, screen } from '@testing-library/react';
import { useFilters } from '@/contexts/filters';
import { useEffect, useState } from 'react';
import userEvent from '@testing-library/user-event';
import { Tags } from '@/widgets/tags';
import MockApp from '@/mock/App.Mock';

const Setup = () => {
  const { setTags, setFilters } = useFilters();
  const [isFirstLoading, setIsFirstLoading] = useState(true);

  useEffect(() => {
    if (isFirstLoading) {
      setTags(['tag1', 'tag2']);
      setFilters(['filter1', 'filter2']);
      setIsFirstLoading(false);
    }
  }, [isFirstLoading, setFilters, setTags]);

  return <Tags />;
};

describe('<Tags />', () => {
  it('should render component setup post tags', () => {
    render(
      <MockApp>
        <Setup />
      </MockApp>,
    );

    expect(screen.getByRole('button', { name: 'tag1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'tag2' })).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: 'tag2' }));

    expect(screen.getByRole('button', { name: 'tag2' })).toHaveAttribute(
      'class',
      'p-3 pb-1 pt-1 border border-skin-primary-light rounded-md text-skin-white bg-skin-primary-light',
    );

    userEvent.click(screen.getByRole('button', { name: 'tag2' }));

    expect(screen.getByRole('button', { name: 'tag2' })).not.toHaveAttribute(
      'class',
      'p-3 pb-1 pt-1 border border-skin-primary-light rounded-md text-skin-white bg-skin-primary-light',
    );
  });
});

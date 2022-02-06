import { render, screen } from '@testing-library/react';
import { useFilters } from '@/contexts/filters';
import { useEffect } from 'react';
import userEvent from '@testing-library/user-event';
import PostTags from '@/widgets/tags';
import MockApp from '@/mock/App.Mock';

function ComponentSetup() {
  const { setTags, setFilters } = useFilters();

  useEffect(() => {
    setTags(['tag1', 'tag2']);
    setFilters(['filter1', 'filter2']);
  }, []);

  return <PostTags />;
}

describe('<PostTags />', () => {
  it('should render component setup post tags', () => {
    render(
      <MockApp>
        <ComponentSetup />
      </MockApp>,
    );

    expect(screen.getByRole('button', { name: 'tag1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'tag2' })).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: 'tag2' }));

    expect(screen.getByRole('button', { name: 'tag2' })).toHaveAttribute(
      'class',
      'p-3 pb-1 pt-1 border border-skin-secondary rounded-2xl text-skin-textColorInDarkness bg-skin-secondary',
    );

    userEvent.click(screen.getByRole('button', { name: 'tag2' }));

    expect(screen.getByRole('button', { name: 'tag2' })).not.toHaveAttribute(
      'class',
      'p-3 pb-1 pt-1 border border-skin-secondary rounded-2xl text-skin-textColorInDarkness bg-skin-secondary',
    );
  });
});

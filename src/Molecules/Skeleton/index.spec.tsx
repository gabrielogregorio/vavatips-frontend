import { Skeleton } from '.';
import { render, screen } from '../../../utils/test-utils/test-utils';

describe('Skeleton', () => {
  it('should render a default variant', async () => {
    const { container } = render(<Skeleton />);

    expect(container).toMatchSnapshot();
  });
});

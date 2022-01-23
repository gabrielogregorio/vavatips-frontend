import { render, screen } from '@testing-library/react';
import Img from '@/base/img';

describe('<Img />', () => {
  it('should render image', () => {
    render(<Img src="image.png" alt="um texto qualquer" />);
    expect(screen.getByRole('img', { name: 'um texto qualquer' })).toBeInTheDocument();
  });
});

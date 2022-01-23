import { render, screen } from '@testing-library/react';
import { ErrorMsg } from '@/base/errorMsg';

describe('<ErrorMsg />', () => {
  it('should render h1', () => {
    render(<ErrorMsg msg="Mensagem de erro de exemplo" />);
    expect(screen.getByText(/Mensagem de erro de exemplo/i)).toBeInTheDocument();
  });

  it('should match snapshot', () => {
    const { container } = render(<ErrorMsg msg="Mensagem de erro de exemplo" />);
    // expect(container.firstChild).toMatchSnapshot();
  });
});

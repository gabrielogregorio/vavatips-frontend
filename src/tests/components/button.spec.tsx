import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '@/base/button';

describe('<Button />', () => {
  it('should render component', () => {
    render(<Button onClick={() => {}}>Conteudo Btn</Button>);
    expect(screen.getByRole('button', { name: 'Conteudo Btn' })).toBeInTheDocument();
  });

  it('should be clicked', () => {
    const fn = jest.fn();
    render(<Button onClick={fn}>Conteudo Btn</Button>);

    const button = screen.getByRole('button');
    expect(fn).toHaveBeenCalledTimes(0);

    userEvent.click(button);

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should not click if button is disabled', () => {
    const fn = jest.fn();
    render(
      <Button disabled onClick={fn}>
        Conteudo Btn
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'Conteudo Btn' });
    expect(fn).toHaveBeenCalledTimes(0);

    userEvent.click(button);

    expect(fn).toHaveBeenCalledTimes(0);
  });
});

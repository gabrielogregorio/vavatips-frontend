/* eslint-disable @typescript-eslint/no-empty-function */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ButtonLike } from '@/widgets/buttonLike';

describe('<ButtonLike />', () => {
  it('should render button like', () => {
    const fn = jest.fn();
    render(<ButtonLike active title="Like" styleBtn="testBtn" onClick={fn} />);
    expect(screen.getByRole('button', { name: /Like/i })).toBeInTheDocument();
  });

  it('should be disable when active is false', () => {
    render(<ButtonLike active={false} title="Like" styleBtn="testBtn" onClick={() => {}} />);
    expect(screen.getByRole('button')).not.toHaveClass('active');
  });

  it('should be active when active is true', () => {
    render(<ButtonLike active title="Like" styleBtn="testBtn" onClick={() => {}} />);
    expect(screen.getByRole('button')).toHaveClass('active');
  });

  it('should be click', () => {
    const fn = jest.fn();
    render(<ButtonLike active title="Like" styleBtn="testBtn" onClick={fn} />);
    const button = screen.getByRole('button');
    expect(fn).toHaveBeenCalledTimes(0);
    userEvent.click(button);
    userEvent.click(button);
    expect(fn).toHaveBeenCalledTimes(2);
  });
});

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from '@/base/input';

describe('should test input component', () => {
  it('should render input', () => {
    const fn = jest.fn();
    render(
      <Input
        name="description"
        text="Description from input"
        value=""
        type="text"
        disabled={false}
        setValue={() => fn()}
      />,
    );

    expect(screen.getByPlaceholderText(/Description from input/i)).toBeInTheDocument();
  });

  it('should call handleChange function on each key pressed', () => {
    const fn = jest.fn();
    render(
      <Input
        name="description"
        text="Description from input"
        value=""
        type="text"
        disabled={false}
        setValue={() => fn()}
      />,
    );

    const input: HTMLInputElement = screen.getByPlaceholderText(/Description from input/i);

    userEvent.type(input, 'a One text');
    expect(fn).toHaveBeenCalledTimes('a One text'.length);
  });
});

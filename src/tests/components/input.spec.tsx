import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '@/base/input';
import { useForm } from 'react-hook-form';

const Setup = () => {
  const {
    register,
    formState: { errors },
  } = useForm();

  return (
    <Input
      placeholder="Description from input"
      name="description"
      label="label from input"
      type="text"
      disabled={false}
      register={register}
      errors={errors}
    />
  );
};

describe('should test input component', () => {
  it('should render input', () => {
    render(<Setup />);

    expect(screen.getByPlaceholderText(/Description from input/i)).toBeInTheDocument();
  });

  it('should call handleChange function on each key pressed', () => {
    render(<Setup />);

    const input: HTMLInputElement = screen.getByPlaceholderText(/Description from input/i);

    userEvent.type(input, 'a One text');
  });
});

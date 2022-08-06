import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TextArea } from '@/base/textArea';
import { useForm } from 'react-hook-form';

const Setup = ({ title }: { title: string }) => {
  const {
    register,
    formState: { errors },
  } = useForm();

  return <TextArea name="description" title={title} register={register} errors={errors} />;
};

describe('<TextArea />', () => {
  it('should render textarea', () => {
    render(<Setup title="Type our description 1" />);

    expect(screen.getByLabelText(/Type our description 1/i)).toBeInTheDocument();
  });

  it('should call handleChange function on each key pressed', () => {
    render(<Setup title="Type our description 2" />);

    const input: HTMLInputElement = screen.getByLabelText(/Type our description 2/i);

    userEvent.type(input, 'a One2 text@12');
  });
});

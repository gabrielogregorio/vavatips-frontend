import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Selected } from '@/base/selected';
import { useForm } from 'react-hook-form';

const dataComponent = [
  {
    id: '1',
    name: 'Facil',
  },
  {
    id: '2',
    name: 'Medio',
  },
  {
    id: '3',
    name: 'Díficil',
  },
];

const Setup = () => {
  const {
    register,
    formState: { errors },
  } = useForm();

  return <Selected name="Dificuldade" text="Dificuldade" register={register} errors={errors} render={dataComponent} />;
};

describe('<Selected />', () => {
  it('should render selected 2', () => {
    render(<Setup />);
    expect(screen.getByLabelText('Dificuldade')).toBeInTheDocument();

    expect(screen.getByRole('option', { name: 'Facil' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Medio' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Díficil' })).toBeInTheDocument();
  });

  it('should render selected', () => {
    render(<Setup />);

    expect(screen.getByLabelText('Dificuldade')).toBeInTheDocument();

    userEvent.selectOptions(screen.getByLabelText('Dificuldade'), 'Díficil');
  });
});

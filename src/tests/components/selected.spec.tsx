import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Selected from '@/base/selected';

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

describe('<Selected />', () => {
  it('should render input', () => {
    const setValue = jest.fn();
    render(<Selected name="Dificuldade" text="Dificuldade" value="" setValue={setValue} render={dataComponent} />);
    expect(screen.getByLabelText('Dificuldade')).toBeInTheDocument();

    expect(screen.getByRole('option', { name: 'Facil' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Medio' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Díficil' })).toBeInTheDocument();
  });

  it('should render input', () => {
    const setValue = jest.fn();

    render(<Selected name="Dificuldade" text="Dificuldade" value="" setValue={setValue} render={dataComponent} />);
    expect(setValue).toHaveBeenCalledTimes(0);
    expect(screen.getByLabelText('Dificuldade')).toBeInTheDocument();

    userEvent.selectOptions(screen.getByLabelText('Dificuldade'), 'Díficil');

    expect(setValue).toHaveBeenCalledTimes(1);
    expect(setValue).toHaveBeenCalledWith('Díficil');
  });
});

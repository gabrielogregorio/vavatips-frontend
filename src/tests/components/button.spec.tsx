import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '@/base/button';

const NOT_CALLED = 0;
const CALLED_FIRST = 1;

describe('<Button />', () => {
  it('should render component', () => {
    render(<Button onClick={() => jest.fn()}>Conteudo Btn</Button>);
    expect(screen.getByRole('button', { name: 'Conteudo Btn' })).toBeInTheDocument();
  });

  it('should be clicked', async () => {
    const fnMock = jest.fn();
    render(<Button onClick={fnMock}>Conteudo Btn</Button>);

    const button = screen.getByRole('button');

    expect(fnMock).toHaveBeenCalledTimes(NOT_CALLED);

    await userEvent.click(button);

    expect(fnMock).toHaveBeenCalledTimes(CALLED_FIRST);
  });

  it('should not click if button is disabled', async () => {
    const fnMock = jest.fn();
    render(
      <Button disabled onClick={fnMock}>
        Conteudo Btn
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'Conteudo Btn' });
    expect(fnMock).toHaveBeenCalledTimes(NOT_CALLED);

    await userEvent.click(button);

    expect(fnMock).toHaveBeenCalledTimes(NOT_CALLED);
  });
});

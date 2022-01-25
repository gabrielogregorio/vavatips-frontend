import { screen, render } from '@testing-library/react';
import Error404 from '../../pages/404';
import MockApp from '../core/App.Mock';

describe('<Error404 />', () => {
  it('should render 404 error', async () => {
    render(
      <MockApp>
        <Error404 />
      </MockApp>,
    );

    expect(screen.getByRole('heading', { name: 'Página não encontrada' })).toBeInTheDocument();
  });
});

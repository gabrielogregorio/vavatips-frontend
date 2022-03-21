import { screen, render } from '@testing-library/react';
import Error500 from '@/pages/500';
import MockApp from '@/mock/App.Mock';

describe('<Error500 />', () => {
  it('should render 500 error', async () => {
    render(
      <MockApp>
        <Error500 />
      </MockApp>,
    );

    expect(
      screen.getByRole('heading', {
        name: 'Puts, aconteceu algo inesperado, os devs serão avisados. F pelo problema',
      }),
    ).toBeInTheDocument();
  });
});

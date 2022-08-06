import { render, screen } from '@testing-library/react';
import MyApp from '@/pages/_app';

jest.mock('next/router', () => ({
  useRouter: () => ({
    asPath: '',
    pathname: '',
    query: { agent: 'Sova', map: 'Ascent' },
    route: '',
  }),
}));

const Component = () => <div>aa</div>;

describe('<HomeScreen />', () => {
  it('should render home screen', async () => {
    render(<MyApp router={null} Component={Component} pageProps={{ name: 'opa' }} />);
    expect(screen).toMatchSnapshot();
  });
});

import { render, screen } from '@testing-library/react';
import MyApp from '@/pages/_app';
import { defaultMockRouterType } from 'src/tests/components/managmentPost.spec';

jest.mock('next/router', () => ({
  useRouter(): defaultMockRouterType {
    return {
      route: '',
      pathname: '',
      query: { map: 'Ascent', agent: 'Sova' },
      asPath: '',
      isReady: true,
    };
  },
}));

const Component = () => <div>aa</div>;

describe('<HomeScreen />', () => {
  it('should render home screen', async () => {
    render(<MyApp router={null} Component={Component} pageProps={{ name: 'opa' }} />);
    expect(screen).toMatchSnapshot();
  });
});

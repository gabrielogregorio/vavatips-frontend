import { render, screen } from '@testing-library/react';
import { MockApp } from '@/mock/App.Mock';
import { Posts } from '@/widgets/postsItem';

jest.mock('next/router', () => ({
  useRouter: () => ({
    asPath: '',
    pathname: '',
    query: { agent: 'Sova', map: 'Ascent' },
    route: '',
  }),
}));

const posts = [
  {
    description: 'desc1',
    id: '10',
    imgs: [],
    tags: {
      ability: 'ability1',
      agent: 'agent1',
      difficult: 'difficult1',
      map: 'map1',
      mapPosition: 'mapPosition1',
      moment: 'moment1',
      side: 'side1',
    },
    title: 'title1',
    user: { id: '15', image: '/user.png', username: 'user1' },
  },
  {
    description: 'desc2',
    id: '20',
    imgs: [],
    tags: {
      ability: 'ability2',
      agent: 'agent2',
      difficult: 'difficult2',
      map: 'map2',
      mapPosition: 'mapPosition2',
      moment: 'moment2',
      side: 'side2',
    },
    title: 'title2',
    user: { id: '25', image: '/user.png', username: 'user2' },
  },
];

describe('<PostCard />', () => {
  it('should test normal mode', async () => {
    render(
      <MockApp>
        <Posts posts={posts} />
      </MockApp>,
    );

    expect(screen.getAllByRole('button', { name: 'Testado' }).length).toEqual(2);
    expect(screen.getAllByRole('button', { name: 'Sugerir' }).length).toEqual(2);
    expect(screen.getAllByRole('button', { name: 'Salvar' }).length).toEqual(2);

    expect(screen.getByRole('heading', { name: 'title1' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title2' })).toBeInTheDocument();

    expect(screen.getByText('user1')).toBeInTheDocument();
    expect(screen.getByText('user2')).toBeInTheDocument();

    expect(screen.getByText('desc1')).toBeInTheDocument();
    expect(screen.getByText('desc2')).toBeInTheDocument();

    expect(screen.getByText('#map1')).toBeInTheDocument();
    expect(screen.getByText('#agent1')).toBeInTheDocument();
    expect(screen.getByText('#ability1')).toBeInTheDocument();
    expect(screen.getByText('#moment1')).toBeInTheDocument();
    expect(screen.getByText('#difficult1')).toBeInTheDocument();
    expect(screen.getByText('#side1')).toBeInTheDocument();
    expect(screen.getByText('#mapPosition1')).toBeInTheDocument();

    expect(screen.getByText('#map2')).toBeInTheDocument();
    expect(screen.getByText('#agent2')).toBeInTheDocument();
    expect(screen.getByText('#ability2')).toBeInTheDocument();
    expect(screen.getByText('#moment2')).toBeInTheDocument();
    expect(screen.getByText('#difficult2')).toBeInTheDocument();
    expect(screen.getByText('#side2')).toBeInTheDocument();
    expect(screen.getByText('#mapPosition2')).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import MockApp from '../core/App.Mock';
import CreatePostScreen from '../../pages/admin/post-create';

jest.mock('next/router', () => ({
  push: jest.fn(),
  useRouter() {
    return {
      route: '',
      pathname: '/posts',
      query: { map: 'Ascent', agent: 'Sova' },
      asPath: '',
    };
  },
}));

describe('<CreatePostScreen />', () => {
  it('should render screen to create post', async () => {
    render(
      <MockApp>
        <CreatePostScreen />
      </MockApp>,
    );

    expect(screen.queryByRole('button', { name: 'Excluir' })).not.toBeInTheDocument();

    expect(screen.getByRole('heading', { name: 'Criar um post' })).toBeInTheDocument();

    const inputTitle: HTMLInputElement = screen.getByLabelText('Titulo');
    const inputDescription: HTMLInputElement = screen.getByLabelText('Descrição');

    expect(inputTitle.value).toEqual('');
    expect(inputDescription.value).toEqual('');
  });
});

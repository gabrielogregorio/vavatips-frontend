import { render, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import userEvent from '@testing-library/user-event';
import MockApp from '@/mock/App.Mock';
import { CreatePostManagement } from '@/widgets/managmentPost';
import { URL_GET_POST_EDITABLE } from '@/mock/ROUTES_API';
import { waitByLoading } from '@/utils/waitByLoading';
import { navbarEnum } from '@/enums/navbar';

jest.mock('next/router', () => ({
  push: jest.fn(),
  useRouter() {
    return {
      route: '',
      pathname: '/admin/post-edit',
      query: { id: '6159c92b1775570b9c40612a', map: 'Ascent', agent: 'Sova' },
      asPath: '',
      isReady: true,
    };
  },
}));

const postBase = {
  id: '617d44c81bc4243f9b2d5a67',
  title: 'title managment post',
  description: 'description1',
  user: {
    id: '615301f1b2f117e4b06db30e',
    username: 'gabriel',
  },
  tags: {
    moment: 'DepoisDoPlant',
    difficult: 'Díficil',
    ability: 'FlechaRastreadora',
    side: 'Defensores',
    map: 'Ascent',
    mapPosition: 'BaseDefensora',
    agent: 'Sova',
  },
  imgs: [
    {
      id: '111',
      description: 'title1_img1',
      image: 'image_111',
    },
    {
      id: '222',
      description: 'title1_img2',
      image: 'image_222',
    },
    {
      id: '333',
      description: 'title1_img3',
      image: 'image_333',
    },
  ],
};

const handlers = [
  rest.get(URL_GET_POST_EDITABLE, async (req, res, ctx) => res(ctx.json(postBase))),
];

const server = setupServer(...handlers);

describe('<CreatePostManagement />', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('should delete step', async () => {
    render(
      <MockApp>
        <CreatePostManagement
          breadcrumbs={[
            { url: navbarEnum.Dashboard, text: 'admin' },
            { url: navbarEnum.Dashboard, text: 'editar' },
          ]}
          mode="edit"
        />
      </MockApp>,
    );

    await waitByLoading();

    expect(screen.getByRole('heading', { name: 'Editar um post' })).toBeInTheDocument();

    expect(screen.getByText('1 - title1_img1')).toBeInTheDocument();
    expect(screen.getAllByRole('img')[0]).toHaveAttribute('alt', 'title1_img1');
    expect(screen.getAllByRole('img')[0]).toHaveAttribute(
      'data-src',
      'http://127.0.0.1:3333/images/image_111',
    );

    expect(screen.getByText('2 - title1_img2')).toBeInTheDocument();
    expect(screen.getAllByRole('img')[1]).toHaveAttribute('alt', 'title1_img2');
    expect(screen.getAllByRole('img')[1]).toHaveAttribute(
      'data-src',
      'http://127.0.0.1:3333/images/image_222',
    );

    expect(screen.getByText('3 - title1_img3')).toBeInTheDocument();
    expect(screen.getAllByRole('img')[2]).toHaveAttribute('alt', 'title1_img3');
    expect(screen.getAllByRole('img')[2]).toHaveAttribute(
      'data-src',
      'http://127.0.0.1:3333/images/image_333',
    );

    userEvent.click(screen.getByTestId('deleteStepButton-2'));

    expect(screen.queryByText('2 - title1_img2')).not.toBeInTheDocument();
  });

  it('should alternate steps', async () => {
    render(
      <MockApp>
        <CreatePostManagement
          breadcrumbs={[
            { url: navbarEnum.Dashboard, text: 'admin' },
            { url: navbarEnum.Dashboard, text: 'editar' },
          ]}
          mode="edit"
        />
      </MockApp>,
    );

    await waitByLoading();

    expect(screen.getByRole('heading', { name: 'Editar um post' })).toBeInTheDocument();

    expect(screen.getByText('1 - title1_img1')).toBeInTheDocument();
    expect(screen.getAllByRole('img')[0]).toHaveAttribute('alt', 'title1_img1');
    expect(screen.getAllByRole('img')[0]).toHaveAttribute(
      'data-src',
      'http://127.0.0.1:3333/images/image_111',
    );

    expect(screen.getByText('2 - title1_img2')).toBeInTheDocument();
    expect(screen.getAllByRole('img')[1]).toHaveAttribute('alt', 'title1_img2');
    expect(screen.getAllByRole('img')[1]).toHaveAttribute(
      'data-src',
      'http://127.0.0.1:3333/images/image_222',
    );

    expect(screen.getByText('3 - title1_img3')).toBeInTheDocument();
    expect(screen.getAllByRole('img')[2]).toHaveAttribute('alt', 'title1_img3');
    expect(screen.getAllByRole('img')[2]).toHaveAttribute(
      'data-src',
      'http://127.0.0.1:3333/images/image_333',
    );

    userEvent.click(screen.getByTestId('btn-top-2'));

    expect(screen.getByText('1 - title1_img2')).toBeInTheDocument();
    expect(screen.getAllByRole('img')[0]).toHaveAttribute('alt', 'title1_img2');
    expect(screen.getAllByRole('img')[0]).toHaveAttribute(
      'data-src',
      'http://127.0.0.1:3333/images/image_222',
    );

    expect(screen.getByText('2 - title1_img1')).toBeInTheDocument();
    expect(screen.getAllByRole('img')[1]).toHaveAttribute('alt', 'title1_img1');
    expect(screen.getAllByRole('img')[1]).toHaveAttribute(
      'data-src',
      'http://127.0.0.1:3333/images/image_111',
    );

    expect(screen.getByText('3 - title1_img3')).toBeInTheDocument();
    expect(screen.getAllByRole('img')[2]).toHaveAttribute('alt', 'title1_img3');
    expect(screen.getAllByRole('img')[2]).toHaveAttribute(
      'data-src',
      'http://127.0.0.1:3333/images/image_333',
    );

    userEvent.click(screen.getByTestId('btn-bottom-2'));

    expect(screen.getByText('1 - title1_img2')).toBeInTheDocument();
    expect(screen.getAllByRole('img')[0]).toHaveAttribute('alt', 'title1_img2');
    expect(screen.getAllByRole('img')[0]).toHaveAttribute(
      'data-src',
      'http://127.0.0.1:3333/images/image_222',
    );

    expect(screen.getByText('2 - title1_img3')).toBeInTheDocument();
    expect(screen.getAllByRole('img')[1]).toHaveAttribute('alt', 'title1_img3');
    expect(screen.getAllByRole('img')[1]).toHaveAttribute(
      'data-src',
      'http://127.0.0.1:3333/images/image_333',
    );

    expect(screen.getByText('3 - title1_img1')).toBeInTheDocument();
    expect(screen.getAllByRole('img')[2]).toHaveAttribute('alt', 'title1_img1');
    expect(screen.getAllByRole('img')[2]).toHaveAttribute(
      'data-src',
      'http://127.0.0.1:3333/images/image_111',
    );
  });

  it('should edit step', async () => {
    render(
      <MockApp>
        <CreatePostManagement
          breadcrumbs={[
            { url: navbarEnum.Dashboard, text: 'admin' },
            { url: navbarEnum.Dashboard, text: 'editar' },
          ]}
          mode="edit"
        />
      </MockApp>,
    );

    await waitByLoading();

    expect(screen.getByRole('heading', { name: 'Editar um post' })).toBeInTheDocument();

    expect(screen.getByText('1 - title1_img1')).toBeInTheDocument();
    expect(screen.getAllByRole('img')[0]).toHaveAttribute('alt', 'title1_img1');
    expect(screen.getAllByRole('img')[0]).toHaveAttribute(
      'data-src',
      'http://127.0.0.1:3333/images/image_111',
    );

    expect(screen.getByText('2 - title1_img2')).toBeInTheDocument();
    expect(screen.getAllByRole('img')[1]).toHaveAttribute('alt', 'title1_img2');
    expect(screen.getAllByRole('img')[1]).toHaveAttribute(
      'data-src',
      'http://127.0.0.1:3333/images/image_222',
    );

    expect(screen.getByText('3 - title1_img3')).toBeInTheDocument();
    expect(screen.getAllByRole('img')[2]).toHaveAttribute('alt', 'title1_img3');
    expect(screen.getAllByRole('img')[2]).toHaveAttribute(
      'data-src',
      'http://127.0.0.1:3333/images/image_333',
    );

    userEvent.click(screen.getByText('2 - title1_img2'));

    userEvent.type(screen.getByLabelText('Descrição post'), ' add in final');

    userEvent.click(screen.getByRole('button', { name: 'Adicionar' }));

    expect(screen.getByText('1 - title1_img1')).toBeInTheDocument();
    expect(screen.getByText('2 - title1_img2 add in final')).toBeInTheDocument();
    expect(screen.getByText('3 - title1_img3')).toBeInTheDocument();
  });
});

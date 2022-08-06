import { render, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import userEvent from '@testing-library/user-event';
import MockApp from '@/mock/App.Mock';
import { CreatePostManagement } from '@/widgets/managmentPost';
import { URL_GET_POST_EDITABLE } from '@/mock/ROUTES_API';
import { waitByLoading } from '@/utils/waitByLoading';
import { navbarEnum } from '@/enums/navbar';
import postBase from '@/mock/responseGetPostById.json';
import { DATA_ALT, DATA_SRC } from '@/helpers/variables';
import defaultListFromRender from '@/mock/defaultListFromRender.json';
import { verifyListRender } from '@/utils/verifyListRender';
import { expectTitlePost } from '@/utils/expectTitlePost';

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

const handlers = [rest.get(URL_GET_POST_EDITABLE, async (_req, res, ctx) => res(ctx.json(postBase)))];

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

    expectTitlePost();

    const listOfImages = screen.getAllByRole('img');
    const FIRST_POSITION = 0;
    const SECOND_POSITION = 1;
    const THIRD_POSITION = 2;

    expect(screen.getByText(defaultListFromRender[FIRST_POSITION].title)).toBeInTheDocument();
    expect(listOfImages[FIRST_POSITION]).toHaveAttribute(DATA_ALT, defaultListFromRender[FIRST_POSITION].alt);
    expect(listOfImages[FIRST_POSITION]).toHaveAttribute(DATA_SRC, defaultListFromRender[FIRST_POSITION].src);

    expect(screen.getByText(defaultListFromRender[SECOND_POSITION].title)).toBeInTheDocument();
    expect(listOfImages[SECOND_POSITION]).toHaveAttribute(DATA_ALT, defaultListFromRender[SECOND_POSITION].alt);
    expect(listOfImages[SECOND_POSITION]).toHaveAttribute(DATA_SRC, defaultListFromRender[SECOND_POSITION].src);

    expect(screen.getByText(defaultListFromRender[THIRD_POSITION].title)).toBeInTheDocument();
    expect(listOfImages[THIRD_POSITION]).toHaveAttribute(DATA_ALT, defaultListFromRender[THIRD_POSITION].alt);
    expect(listOfImages[THIRD_POSITION]).toHaveAttribute(DATA_SRC, defaultListFromRender[THIRD_POSITION].src);

    userEvent.click(screen.getByTestId('deleteStepButton-2'));

    await waitByLoading();

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

    expectTitlePost();

    verifyListRender();

    userEvent.click(screen.getByTestId('btn-top-2'));

    verifyListRender([
      { title: '1 - title1_img2', alt: 'title1_img2', src: '/image_222' },
      { title: '2 - title1_img1', alt: 'title1_img1', src: '/image_111' },
      { title: '3 - title1_img3', alt: 'title1_img3', src: '/image_333' },
    ]);

    userEvent.click(screen.getByTestId('btn-bottom-2'));

    verifyListRender([
      { title: '1 - title1_img2', alt: 'title1_img2', src: '/image_222' },
      { title: '2 - title1_img3', alt: 'title1_img3', src: '/image_333' },
      { title: '3 - title1_img1', alt: 'title1_img1', src: '/image_111' },
    ]);
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

    expectTitlePost();
    verifyListRender();

    userEvent.click(screen.getByText('2 - title1_img2'));

    userEvent.type(screen.getByLabelText(/Descrição post/i), 'add in final');

    userEvent.click(screen.getByRole('button', { name: 'Adicionar' }));

    expect(screen.getByText('1 - title1_img1')).toBeInTheDocument();
    await screen.findByText('2 - title1_img2add in final');
    expect(screen.getByText('3 - title1_img3')).toBeInTheDocument();
  });
});

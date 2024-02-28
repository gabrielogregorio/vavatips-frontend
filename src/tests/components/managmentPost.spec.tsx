import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockApp } from '@/mock/App.Mock';
import { CreatePostManagement } from '@/widgets/managmentPost';
import { waitByLoading } from '@/utils/waitByLoading';
import { navbarEnum } from '@/enums/navbar';
import postBase from '@/mock/responseGetPostById.json';
import { DATA_ALT, DATA_SRC } from '@/helpers/variables';
import defaultListFromRender from '@/mock/defaultListFromRender.json';
import { verifyListRender } from '@/utils/verifyListRender';
import { expectTitlePost } from '@/utils/expectTitlePost';
import { Api } from '@/services/api';
import { createResponseMock } from '@/mock/createResponseMock';

jest.mock('next/router', () => ({
  push: jest.fn(),
  useRouter: () => ({
    asPath: '',
    isReady: true,
    pathname: '/admin/post-edit',
    query: { agent: 'Sova', id: '6159c92b1775570b9c40612a', map: 'Ascent' },
    route: '',
  }),
}));

const spyOn = jest.spyOn(Api, 'get');

spyOn.mockImplementation(() => createResponseMock(postBase, 200));

describe('<CreatePostManagement />', () => {
  it('should delete step', async () => {
    render(
      <MockApp>
        <CreatePostManagement
          breadcrumbs={[
            { text: 'admin', url: navbarEnum.Dashboard },
            { text: 'editar', url: navbarEnum.Dashboard },
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

    await userEvent.click(screen.getByTestId('deleteStepButton-2'));

    await waitByLoading();

    expect(screen.queryByText('2 - title1_img2')).not.toBeInTheDocument();
  });

  it('should alternate steps', async () => {
    render(
      <MockApp>
        <CreatePostManagement
          breadcrumbs={[
            { text: 'admin', url: navbarEnum.Dashboard },
            { text: 'editar', url: navbarEnum.Dashboard },
          ]}
          mode="edit"
        />
      </MockApp>,
    );

    await waitByLoading();

    expectTitlePost();

    verifyListRender();

    await userEvent.click(screen.getByTestId('btn-top-2'));

    verifyListRender([
      { alt: 'title1_img2', src: '/image_222', title: '1 - title1_img2' },
      { alt: 'title1_img1', src: '/image_111', title: '2 - title1_img1' },
      { alt: 'title1_img3', src: '/image_333', title: '3 - title1_img3' },
    ]);

    await userEvent.click(screen.getByTestId('btn-bottom-2'));

    verifyListRender([
      { alt: 'title1_img2', src: '/image_222', title: '1 - title1_img2' },
      { alt: 'title1_img3', src: '/image_333', title: '2 - title1_img3' },
      { alt: 'title1_img1', src: '/image_111', title: '3 - title1_img1' },
    ]);
  });

  it('should edit step', async () => {
    render(
      <MockApp>
        <CreatePostManagement
          breadcrumbs={[
            { text: 'admin', url: navbarEnum.Dashboard },
            { text: 'editar', url: navbarEnum.Dashboard },
          ]}
          mode="edit"
        />
      </MockApp>,
    );

    await waitByLoading();

    expectTitlePost();
    verifyListRender();

    await userEvent.click(screen.getByText('2 - title1_img2'));

    await userEvent.type(screen.getByLabelText(/Descrição post/i), 'add in final');

    await userEvent.click(screen.getByRole('button', { name: 'Adicionar' }));

    expect(screen.getByText('1 - title1_img1')).toBeInTheDocument();
    await screen.findByText('2 - title1_img2add in final');
    expect(screen.getByText('3 - title1_img3')).toBeInTheDocument();
  });
});

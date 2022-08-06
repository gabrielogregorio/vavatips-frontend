import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Modal } from '@/widgets/modal';
import { URL_POST_UPLOAD_FILE } from '@/mock/ROUTES_API';
import { waitByLoading } from '@/utils/waitByLoading';
import { ReactNode } from 'react';
import { SUCCESS_HTTP_CODE } from '@/utils/statusCode';

const descriptionPost = 'Descrição post';
const textDescriptionPost = 'how test description';
const linkCloud = 'https://gcloud.com/123abc';

const NOT_CALLED = 0;
const CALLED_FIRST = 1;

jest.mock('next/router', () => ({
  useRouter: () => ({
    asPath: '',
    pathname: '',
    query: { map: 'Ascent32' },
    route: '/',
  }),
}));

jest.mock(
  'next/link',
  () =>
    ({ children }: { children: ReactNode }) =>
      children,
);

const handlers = [
  rest.post(URL_POST_UPLOAD_FILE, async (req, res, ctx) =>
    res(ctx.status(SUCCESS_HTTP_CODE), ctx.json({ filename: linkCloud })),
  ),
];

const server = setupServer(...handlers);

describe('<Modal />', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('should render agent screen and write description', async () => {
    const closeModal = jest.fn();
    const saveModal = jest.fn();

    render(
      <Modal
        title="Adicionar Post"
        id="123"
        description=""
        image=""
        closeModal={() => closeModal()}
        saveModal={() => saveModal}
      />,
    );

    userEvent.type(screen.getByLabelText(descriptionPost), textDescriptionPost);
    const textArea: HTMLInputElement = screen.getByLabelText(descriptionPost);
    expect(textArea.value).toEqual(textDescriptionPost);
  });

  it('should test close Modal', async () => {
    const closeModal = jest.fn();
    const saveModal = jest.fn();

    render(
      <Modal
        title="Adicionar Post"
        id="123"
        description=""
        image=""
        closeModal={() => closeModal()}
        saveModal={() => saveModal}
      />,
    );

    expect(closeModal).toHaveBeenCalledTimes(NOT_CALLED);
    userEvent.click(screen.getByTestId('closeModal'));
    expect(closeModal).toHaveBeenCalledTimes(CALLED_FIRST);
  });

  it('should test close Modal', async () => {
    const closeModal = jest.fn();
    const saveModal = jest.fn();

    render(
      <Modal
        title="Adicionar Post"
        id="123"
        description=""
        image=""
        closeModal={() => closeModal()}
        saveModal={() => saveModal}
      />,
    );

    expect(closeModal).toHaveBeenCalledTimes(NOT_CALLED);
    userEvent.click(screen.getByRole('button', { name: 'Cancelar' }));
    expect(closeModal).toHaveBeenCalledTimes(CALLED_FIRST);
  });

  it('should render agent screen, write description, add upload and save', async () => {
    const closeModal = jest.fn();
    const saveModal = jest.fn();

    render(
      <Modal
        title="Adicionar Post"
        id="123"
        description=""
        image=""
        closeModal={() => closeModal()}
        saveModal={saveModal}
      />,
    );
    userEvent.type(screen.getByLabelText(descriptionPost), textDescriptionPost);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();

    const file = new File(['hello'], 'hello.png', { type: 'image/png' });
    const inputFIle: HTMLInputElement = screen.getByLabelText('Adicionar Imagem');

    userEvent.upload(inputFIle, file);
    await waitByLoading();

    const FIRST_POSITION = 0;
    expect(inputFIle.files[FIRST_POSITION]).toStrictEqual(file);

    userEvent.click(screen.getByRole('button', { name: 'Adicionar' }));

    expect(screen.getByRole('img')).toHaveAttribute('data-src', linkCloud);

    await waitFor(() => expect(saveModal).toHaveBeenCalledWith('123', textDescriptionPost, linkCloud));
  });

  it('should view Image and description and overwrite description with same image', async () => {
    const closeModal = jest.fn();
    const saveModal = jest.fn();

    render(
      <Modal
        title="Adicionar Post"
        id="123"
        description="myDescription"
        image="https://uploads/file1"
        closeModal={() => closeModal()}
        saveModal={saveModal}
      />,
    );

    const inputDescription: HTMLInputElement = screen.getByLabelText(descriptionPost);
    expect(screen.getByRole('img')).toHaveAttribute('data-src', 'https://uploads/file1');
    expect(inputDescription.value).toEqual('myDescription');

    userEvent.type(screen.getByLabelText(descriptionPost), ' how contatenate description');

    userEvent.click(screen.getByRole('button', { name: 'Adicionar' }));

    await waitFor(() =>
      expect(saveModal).toHaveBeenCalledWith(
        '123',
        'myDescription how contatenate description',
        'https://uploads/file1',
      ),
    );
  });
});

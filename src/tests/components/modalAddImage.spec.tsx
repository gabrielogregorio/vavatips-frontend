import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Modal } from '@/widgets/modal';
import { URL_POST_UPLOAD_FILE } from '@/mock/ROUTES_API';
import { waitByLoading } from '@/utils/waitByLoading';
import { ReactNode } from 'react';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: { map: 'Ascent32' },
      asPath: '',
    };
  },
}));

jest.mock(
  'next/link',
  () =>
    function Link({ children }: { children: ReactNode }) {
      return children;
    },
);

const handlers = [
  rest.post(URL_POST_UPLOAD_FILE, async (req, res, ctx) =>
    res(ctx.status(200), ctx.json({ filename: 'https://gcloud.com/123abc' })),
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

    userEvent.type(screen.getByLabelText('Descrição post'), 'how test description');
    const textArea: HTMLInputElement = screen.getByLabelText('Descrição post');
    expect(textArea.value).toEqual('how test description');
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

    expect(closeModal).toHaveBeenCalledTimes(0);
    userEvent.click(screen.getByTestId('closeModal'));
    expect(closeModal).toHaveBeenCalledTimes(1);
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

    expect(closeModal).toHaveBeenCalledTimes(0);
    userEvent.click(screen.getByRole('button', { name: 'Cancelar' }));
    expect(closeModal).toHaveBeenCalledTimes(1);
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
    userEvent.type(screen.getByLabelText('Descrição post'), 'how test description');
    expect(screen.queryByRole('img')).not.toBeInTheDocument();

    const file = new File(['hello'], 'hello.png', { type: 'image/png' });
    const inputFIle: HTMLInputElement = screen.getByLabelText('Adicionar Imagem');

    userEvent.upload(inputFIle, file);
    await waitByLoading();

    expect(inputFIle.files[0]).toStrictEqual(file);

    userEvent.click(screen.getByRole('button', { name: 'Adicionar' }));

    expect(screen.getByRole('img')).toHaveAttribute('data-src', 'https://gcloud.com/123abc');

    expect(saveModal).toHaveBeenCalledWith(
      '123',
      'how test description',
      'https://gcloud.com/123abc',
    );
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

    const inputDescription: HTMLInputElement = screen.getByLabelText('Descrição post');
    expect(screen.getByRole('img')).toHaveAttribute('data-src', 'https://uploads/file1');
    expect(inputDescription.value).toEqual('myDescription');

    userEvent.type(screen.getByLabelText('Descrição post'), ' how contatenate description');

    userEvent.click(screen.getByRole('button', { name: 'Adicionar' }));

    expect(saveModal).toHaveBeenCalledWith(
      '123',
      'myDescription how contatenate description',
      'https://uploads/file1',
    );
  });
});

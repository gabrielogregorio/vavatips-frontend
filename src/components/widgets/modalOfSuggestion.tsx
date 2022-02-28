import { useEffect, useState } from 'react';
import { useModalMessage } from '@/contexts/modalMessage';
import { useModalContext, initializeModalSuggestion } from '@/contexts/modalSuggestion';
import { api } from '@/services/api';
import { Button } from '@/base/button';
import { Input } from '@/base/input';
import { TextArea } from '@/base/textArea';
import { modalType } from '@/interfaces/modal';
import { Loader } from '@/base/loader';
import { ErrorMsg } from '@/base/errorMsg';
import { Form } from '@/base/Form';
import { ModalRef } from './modalRef';

interface ModalProps {
  title: string;
}

export const ModalOfSuggestion = ({ title }: ModalProps) => {
  const [email, setEmail] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [postTitle, setPostTitle] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { modalSuggestion, setModalSuggestion } = useModalContext();
  const { setModalMessage } = useModalMessage();

  useEffect(() => {
    setPostTitle(modalSuggestion.post?.title ?? '');
  }, [modalSuggestion]);

  async function saveModal() {
    setLoading(true);
    const idPost = modalSuggestion.post?.id ?? '';

    if (description === '' || description.trim() === '') {
      setErrorMsg('Você precisa preencher o campo Descrição com as informações');
    } else if (description.trim().length < 10) {
      setErrorMsg('Você precisa de uma descrição mais detalhada');
    } else {
      let type: modalType = 'error';
      let msg = '';

      api
        .post('/suggestion', { idPost, email, description })
        .then(() => {
          msg = 'Sugestão enviada com sucesso, muito obrigado!';
          type = 'success';
        })
        .catch(() => {
          msg = 'Erro ao enviar a Sugestão. Você poderia reportar o problema aos desenvolvedores';
          type = 'error';
        })
        .finally(() => {
          setModalSuggestion(initializeModalSuggestion);
          setModalMessage({ active: true, message: { type, msg } });
        });
    }
    setLoading(false);
  }
  const handleCloseModal = () => {
    setModalSuggestion(initializeModalSuggestion);
  };

  return modalSuggestion.active ? (
    <ModalRef title={title} closeModal={handleCloseModal}>
      <Form>
        <ErrorMsg msg={errorMsg} />
        <Loader active={loading} />
        <Input
          name="tip"
          disabled
          type="text"
          text="Dica"
          value={postTitle}
          setValue={setPostTitle}
        />

        <Input
          name="email"
          type="email"
          text="Email para contato (Opcional)"
          value={email}
          setValue={setEmail}
        />

        <TextArea
          name="description"
          title="Descrição"
          value={description}
          setValue={setDescription}
        />

        <div className="flex justify-end w-full">
          <Button
            className="p-1 px-2 mx-1 rounded-xl bg-skin-secondary-light text-skin-white"
            onClick={() => setModalSuggestion(initializeModalSuggestion)}>
            Cancelar
          </Button>
          <Button
            className="p-1 px-2 mx-1 rounded-xl bg-skin-primary-light text-skin-white"
            onClick={() => saveModal()}>
            Adicionar
          </Button>
        </div>
      </Form>
    </ModalRef>
  ) : null;
};

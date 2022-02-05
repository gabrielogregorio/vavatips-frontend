import React, { useEffect, useState } from 'react';
import { useModalMessage } from '@/contexts/modalMessage';
import { useModalContext, initializeModalSuggestion } from '@/contexts/modalSuggestion';
import api from '@/services/api';
import Button from '@/base/button';
import Input from '@/base/input';
import ButtonCloseModal from '@/base/modalCloseButton';
import TextArea from '@/base/textArea';
import { modalType } from '../../interfaces/modal';
import LoaderComponent from '../base/loader';
import ErrorMsg from '../base/errorMsg';
import FormComponent from '../base/Form';

interface ModalProps {
  title: string;
}

export default function ModalOfSuggestion({ title }: ModalProps) {
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
          msg = 'Sugestão enviado com sucesso, muito obrigado!';
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

  return modalSuggestion.active ? (
    <div className="fixed top-0 left-0 h-screen w-full z-40 flex justify-center items-center">
      <div className="bg-skin-backgroundSecondary p-5 rounded-2xl w-full">
        <div className="flex items-center justify-center">
          <h1 className="flex-1 text-skin-textColorBold">{title}</h1>
          <ButtonCloseModal onClick={() => setModalSuggestion(initializeModalSuggestion)} />
        </div>
        <hr />

        <FormComponent>
          <ErrorMsg msg={errorMsg} />
          <LoaderComponent active={loading} />
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

          <div className="modalActions">
            <Button onClick={() => setModalSuggestion(initializeModalSuggestion)}>Cancelar</Button>
            <Button onClick={() => saveModal()}>Adicionar</Button>
          </div>
        </FormComponent>
      </div>
    </div>
  ) : null;
}

import { useEffect, useState } from 'react';
import { useModalMessage } from '@/contexts/modalMessage';
import { useModalContext, initializeModalSuggestion } from '@/contexts/modalSuggestion';
import { Api } from '@/services/api';
import { Button } from '@/base/button';
import { Input } from '@/base/input';
import { TextArea } from '@/base/textArea';
import { Loader } from '@/base/loader';
import { Form } from '@/base/Form';
import { schemaSendSuggestion } from '@/handlers/forms';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { ModalRef } from './modalRef';

type ModalProps = {
  title: string;
};

export type registrationFormFields = {
  tip: string;
  email: string;
  description: string;
};

export const ModalOfSuggestion = ({ title }: ModalProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { modalSuggestion, setModalSuggestion } = useModalContext();
  const { setModalMessage } = useModalMessage();
  const titlePostToSendSuggestion = modalSuggestion?.post?.title;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<registrationFormFields>({
    resolver: yupResolver(schemaSendSuggestion),
    defaultValues: {},
  });

  const handleCloseModal = () => {
    setModalSuggestion(initializeModalSuggestion);
  };

  const onSubmit = async ({ email, description }) => {
    const idPost = modalSuggestion.post?.id ?? '';
    setLoading(true);

    Api.post('/suggestion', { idPost, email, description })
      .then(() => {
        setModalMessage({
          active: true,
          message: { type: 'success', msg: 'Sugestão enviada com sucesso, muito obrigado!' },
        });
      })
      .catch(() => {
        setModalMessage({
          active: true,
          message: {
            type: 'error',
            msg: 'Erro ao enviar a Sugestão. Você poderia reportar o problema aos desenvolvedores',
          },
        });
      })
      .finally(() => {
        setModalSuggestion(initializeModalSuggestion);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (titlePostToSendSuggestion) {
      const formToReset = {
        tip: titlePostToSendSuggestion,
      };

      reset(formToReset);
    }
  }, [titlePostToSendSuggestion, reset]);

  return modalSuggestion.active ? (
    <ModalRef title={title} closeModal={handleCloseModal}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Loader active={loading} />
        <Input
          placeholder="Post com a sugestão"
          name="tip"
          disabled
          type="text"
          label="Dica"
          register={register}
          errors={errors}
        />

        <Input
          placeholder="Digite seu e-mail"
          name="email"
          type="email"
          label="Email para retorno (Opcional)"
          register={register}
          errors={errors}
        />

        <TextArea name="description" title="Descrição" register={register} errors={errors} />

        <div className="flex justify-end w-full mt-4">
          <Button
            className="py-2 px-3.5 mx-1 rounded-md bg-skin-secondary-light text-gray-100 text-xs"
            onClick={() => setModalSuggestion(initializeModalSuggestion)}>
            Cancelar
          </Button>
          <Button type="submit" className="py-2 px-3.5 mx-1 rounded-md bg-skin-primary-light text-gray-100 text-xs">
            Adicionar
          </Button>
        </div>
      </Form>
    </ModalRef>
  ) : null;
};

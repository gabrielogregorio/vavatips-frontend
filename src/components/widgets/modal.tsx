import { ChangeEvent, MouseEventHandler, ReactElement, useEffect, useState } from 'react';
import { Api } from '@/services/api';
import { formatImage } from '@/services/formatEnvironment';
import { Button } from '@/base/button';
import { Loader } from '@/base/loader';
import { Form } from '@/base/Form';
import { TextArea } from '@/base/textArea';
import { InputFile } from '@/base/inputFile';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaModalNewSep } from '@/handlers/forms';
import { Input } from '@/base/input';
import { ModalRef } from '@/widgets/modalRef';

type ModalPropsBase = {
  title: string;
  id: string;
  description: string;
  image: string;
  closeModal: MouseEventHandler<HTMLButtonElement>;
  saveModal: (id: string, title: string, image: string) => void;
};

type registrationFormFields = {
  descriptionImage: string;
  id: string;
};

export const Modal = ({
  id: idModal,
  description: descriptionModal,
  image,
  closeModal,
  saveModal,
  title,
}: ModalPropsBase): ReactElement => {
  const [LinkImg, setLinkImg] = useState<string>('');
  const [activeLoader, setActiveLoader] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<registrationFormFields>({ resolver: yupResolver(schemaModalNewSep) });

  useEffect(() => {
    const formToReset = {
      descriptionImage: descriptionModal ?? '',
      id: idModal ?? '',
    };

    reset(formToReset);

    if (image) {
      setLinkImg(image);
    }
  }, [idModal, descriptionModal, image, reset]);

  const loadImage = (event: ChangeEvent<HTMLInputElement>): void => {
    setActiveLoader(true);
    const formData = new FormData();
    const FIRST_POSITION = 0;

    formData.append('image', event.target.files[FIRST_POSITION]);

    const sendImageFromApi = (): void => {
      Api.post(`/postLoadFile`, formData)
        .then((res) => {
          const urlImg = `${res.data.filename}`;
          setLinkImg(urlImg);
          setActiveLoader(false);
          return res;
        })
        .catch((error) => error);
    };
    sendImageFromApi();
  };

  const closeModalItem = (): void => {
    closeModal(null);
  };

  const onSubmit = ({ descriptionImage, id }): void => {
    saveModal(id, descriptionImage, LinkImg);
  };

  return (
    <ModalRef title={title} closeModal={closeModalItem}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input name="id" label="" type="hidden" placeholder="" register={register('id')} errors={errors} />

        <TextArea
          name="descriptionImage"
          title="Descrição post"
          register={register('descriptionImage')}
          errors={errors}
        />

        <InputFile text="Adicionar Imagem" type="file" name="image" onChange={loadImage} />

        <Loader active={activeLoader} />

        {LinkImg !== '' ? (
          <div className="relative w-full my-2 h-52">
            <Image
              width={50}
              height={50}
              data-src={formatImage(LinkImg)}
              src={formatImage(LinkImg)}
              alt=""
              className="object-cover h-52"
            />
          </div>
        ) : null}

        <div className="flex justify-end w-full">
          <Button
            className="p-1 px-2 mx-1 rounded-md bg-skin-secondary-light text-skin-white"
            onClick={(): void => closeModalItem()}>
            Cancelar
          </Button>
          <Button className="p-1 px-2 mx-1 rounded-md bg-skin-primary-light text-skin-white" type="submit">
            Adicionar
          </Button>
        </div>
      </Form>
    </ModalRef>
  );
};

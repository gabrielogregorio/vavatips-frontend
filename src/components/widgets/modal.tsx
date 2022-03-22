import { ChangeEvent, MouseEventHandler, useEffect, useState } from 'react';
import { api } from '@/services/api';
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

export type ModalPropsBase = {
  title: string;
  id: string;
  description: string;
  image: string;
  closeModal: MouseEventHandler<HTMLButtonElement>;
  saveModal: (id: string, title: string, image: string) => void;
};

export type registrationFormFields = {
  id: string;
  descriptionImage: string;
};

export const Modal = ({
  id: idModal,
  description: descriptionModal,
  image,
  closeModal,
  saveModal,
  title,
}: ModalPropsBase) => {
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

  const loadImage = (event: ChangeEvent<HTMLInputElement>) => {
    setActiveLoader(true);
    const formData = new FormData();
    formData.append('image', event.target.files[0]);

    function sendImageFromApi() {
      api.post(`/postLoadFile`, formData).then((res) => {
        const urlImg = `${res.data.filename}`;
        setLinkImg(urlImg);
        setActiveLoader(false);
      });
    }
    sendImageFromApi();
  };

  const closeModalItem = () => {
    closeModal(null);
  };

  const onSubmit = async ({ descriptionImage, id }) => {
    saveModal(id, descriptionImage, LinkImg);
  };

  return (
    <ModalRef title={title} closeModal={closeModalItem}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input name="id" label="" type="hidden" placeholder="" register={register} errors={errors} />

        <TextArea name="descriptionImage" title="Descrição post" register={register} errors={errors} />

        <InputFile text="Adicionar Imagem" type="file" name="image" onChange={loadImage} />

        <Loader active={activeLoader} />

        {LinkImg !== '' ? (
          <div className="relative w-full my-2 h-52">
            <Image
              layout="fill"
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
            onClick={() => closeModalItem()}>
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

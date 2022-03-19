import { ChangeEvent, MouseEventHandler, useEffect, useState } from 'react';
import { api } from '@/services/api';
import { formatImage } from '@/services/formatEnvironment';
import { Button } from '@/base/button';
import { Loader } from '@/base/loader';
import { Form } from '@/base/Form';
import { TextArea } from '@/base/textArea';
import { InputFile } from '@/base/inputFile';
import Image from 'next/image';
import { ModalRef } from './modalRef';

export type ModalPropsBase = {
  title: string;
  id: string;
  description: string;
  image: string;
  closeModal: MouseEventHandler<HTMLButtonElement>;
  saveModal: (id: string, title: string, image: string) => void;
};

export const Modal = ({
  id: idModal,
  description: descriptionModal,
  image,
  closeModal,
  saveModal,
  title,
}: ModalPropsBase) => {
  const [id, setId] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [LinkImg, setLinkImg] = useState<string>('');
  const [activeLoader, setActiveLoader] = useState<boolean>(false);

  useEffect(() => {
    if (idModal) {
      setId(idModal);
    }

    if (descriptionModal) {
      setDescription(descriptionModal);
    }

    if (image) {
      setLinkImg(image);
    }
  }, [idModal, descriptionModal, image]);

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

  return (
    <ModalRef title={title} closeModal={closeModalItem}>
      <Form>
        <TextArea
          name="description"
          title="Descrição post"
          value={description}
          setValue={setDescription}
        />

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
          <Button
            className="p-1 px-2 mx-1 rounded-md bg-skin-primary-light text-skin-white"
            onClick={() => saveModal(id, description, LinkImg)}>
            Adicionar
          </Button>
        </div>
      </Form>
    </ModalRef>
  );
};

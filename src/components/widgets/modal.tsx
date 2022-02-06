import React, { useEffect, useState } from 'react';
import api from '@/services/api';
import formatImage from '@/services/formatEnvironment';
import Button from '@/base/button';
import LoaderComponent from '@/base/loader';
import { ModalPropsBase } from '@/interfaces/modal';
import FormComponent from '@/base/Form';
import TextArea from '@/base/textArea';
import InputFile from '@/base/inputFile';
import ModalRef from './modalRef';

export default function ModalComponent({
  id: idModal,
  description: descriptionModal,
  image,
  closeModal,
  saveModal,
  title,
}: ModalPropsBase) {
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

  const loadImage = (event: any) => {
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
      <FormComponent>
        <TextArea
          name="description"
          title="Descrição post"
          value={description}
          setValue={setDescription}
        />

        <InputFile
          text="Adicionar Imagem"
          type="file"
          name="image"
          disabled={false}
          onChange={loadImage}
        />

        <LoaderComponent active={activeLoader} />

        <div>{LinkImg ? <img src={formatImage(LinkImg)} alt="" /> : null}</div>

        <div className="flex justify-end w-full">
          <Button
            className="p-1 px-2 mx-1 rounded-xl bg-skin-btnActionsSave text-skin-textColorINVERSE"
            onClick={() => closeModalItem()}>
            Cancelar
          </Button>
          <Button
            className="p-1 px-2 mx-1 rounded-xl bg-skin-btnActionsTested text-skin-textColorINVERSE"
            onClick={() => saveModal(id, description, LinkImg)}>
            Adicionar
          </Button>
        </div>
      </FormComponent>
    </ModalRef>
  );
}

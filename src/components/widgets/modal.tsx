import React, { useEffect, useState } from 'react';
import api from '@/services/api';
import formatImage from '@/services/formatEnvironment';
import Button from '@/base/button';
import LoaderComponent from '@/base/loader';
import ButtonCloseModal from '@/base/modalCloseButton';
import { ModalPropsBase } from '@/interfaces/modal';
import GroupInput from '@/base/groupInput';
import FormComponent from '../base/Form';

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

  function loadImage(event: any) {
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
  }

  function closeModalItem() {
    closeModal(null);
  }

  return (
    <div className="modal" data-testid="modal">
      <div className="modalItem">
        <div className="modalTitle">
          <h1>{title}</h1>
          <ButtonCloseModal onClick={() => closeModalItem()} />
        </div>

        <hr />

        <FormComponent>
          <GroupInput>
            <div className="groupInputSelect">
              <label htmlFor="descriptionNewPost">
                Descrição post
                <textarea
                  id="descriptionNewPost"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </label>
            </div>
          </GroupInput>

          <GroupInput>
            <div className="groupInputSelect">
              <label htmlFor="custom-file-upload" className="customFileUpload">
                Adicionar Imagem
                <input id="custom-file-upload" type="file" name="image" onChange={loadImage} />
              </label>
            </div>
          </GroupInput>
          <LoaderComponent active={activeLoader} />
          <div className="instructionImage">
            {LinkImg ? <img src={formatImage(LinkImg)} alt="" /> : null}
          </div>

          <div className="modalActions">
            <Button onClick={() => closeModalItem()}>Cancelar</Button>

            <Button onClick={() => saveModal(id, description, LinkImg)}>Adicionar</Button>
          </div>
        </FormComponent>
      </div>
    </div>
  );
}

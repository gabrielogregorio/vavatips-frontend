import React, { useEffect, useState } from 'react';
import api from '@/services/api';
import formatImage from '@/services/formatEnvironment';
import Button from '@/base/button';
import LoaderComponent from '@/base/loader';
import ButtonCloseModal from '@/base/modalCloseButton';

interface ModalProps {
  title: string;
  _id: string;
  description: string;
  image: string;
  closeModal: () => {};
  saveModal: (_id: string, title: string, image: string) => {};
}

export default function ModalComponent({
  _id: idModal,
  description: descriptionModal,
  image,
  closeModal,
  saveModal,
  title,
}: ModalProps) {
  const [_id, setId] = useState<string>('');
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
  }, [idModal, description, image]);

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

  return (
    <div className="modal" data-testid="modal">
      <div className="modalItem">
        <div className="modalTitle">
          <h1>{title}</h1>
          <ButtonCloseModal onClick={() => closeModal()} />
        </div>

        <hr />

        <div className="form">
          <div className="groupInput">
            <div className="groupInputSelect">
              <label aria-label="Descreva a sugestão" htmlFor="description">
                Descrição
              </label>
              <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
          </div>

          <div className="groupInput">
            <div className="groupInputSelect">
              <label className="customFileUpload">
                <input type="file" name="image" onChange={loadImage} />
                Adicionar Imagem
              </label>
            </div>
          </div>
          <LoaderComponent active={activeLoader} />
          <div className="instructionImage">{LinkImg ? <img src={formatImage(LinkImg)} alt="" /> : null}</div>

          <div className="modalActions">
            <Button onClick={() => closeModal()}>Cancelar</Button>

            <Button onClick={() => saveModal(_id, description, LinkImg)}>Adicionar</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import api from '../../core/services/api';
import { formatImage } from '../../core/services/formatEnvironment';
import { Button } from '../base/button';
import { LoaderComponent } from '../base/loader';
import { ButtonCloseModal } from '../base/modalCloseButton';

interface ModalProps {
  title: string;
  _id: string;
  description: string;
  image: string;
  closeModal: () => void;
  saveModal: (_id: string, title: string, image: string) => void;
}

export const ModalComponent = (props: ModalProps) => {
  const [_id, set_id] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [LinkImg, setLinkImg] = useState<string>('');
  const [activeLoader, setActiveLoader] = useState<boolean>(false);

  useEffect(() => {
    if (props._id) {
      set_id(props._id);
    }

    if (props.description) {
      setDescription(props.description);
    }

    if (props.image) {
      setLinkImg(props.image);
    }
  }, [props]);

  function loadImage(event: any) {
    setActiveLoader(true);
    console.log('inicio');
    const formData = new FormData();
    formData.append('image', event.target.files[0]);

    // Envia a imagem para o backend e coleta o retorno
    api.post(`/postLoadFile`, formData).then((res) => {
      const urlImg = `${res.data.filename}`;
      setLinkImg(urlImg);
      console.log('fim');
      setActiveLoader(false);
    });
  }

  return (
    <div className="modal" data-testid="modal">
      <div className="modalItem">
        <div className="modalTitle">
          <h1>{props.title}</h1>
          <ButtonCloseModal onClick={() => props.closeModal()} />
        </div>

        <hr />

        <div className="form">
          <div className="groupInput">
            <div className="groupInputSelet">
              <label htmlFor="">Descrição</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>
          </div>

          <div className="groupInput">
            <div className="groupInputSelet">
              <label className="customFileUpload">
                <input type="file" name="image" onChange={loadImage} />
                Adicionar Imagem
              </label>
            </div>
          </div>
          <LoaderComponent active={activeLoader} />
          <div className="instructionImage">
            {LinkImg ? <img src={formatImage(LinkImg)} alt="" /> : null}
          </div>

          <div className="modalActions">
            <Button onClick={() => props.closeModal()}>Cancelar</Button>

            <Button onClick={() => props.saveModal(_id, description, LinkImg)}>
              Adicionar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

import { useEffect, useState } from 'react';
import * as uuid from 'uuid';
import Router, { useRouter } from 'next/router';
import NavbarComponent from '@/layout/navbar';
import api from '@/services/api';
import { agents, maps, difficult, moment, side } from '@/data/data-valorant';
import Input from '@/base/input';
import ModalComponent from '@/widgets/modal';
import formatImage from '@/services/formatEnvironment';
import FooterComponent from '@/layout/footer';
import Selected from '@/base/selected';
import BreadcrumbComponent from '@/widgets/breadcrumb';
import Button from '@/base/button';
import { FaTimes } from 'react-icons/fa';
import { BsChevronUp, BsChevronDown } from 'react-icons/bs';
import { agentInterface, mapInterface } from '@/interfaces/posts';
import { navbarEnum } from '@/interfaces/navbar';

const breadcrumbs = [
  { url: '/dashboard', text: 'administrativo' },
  { url: '/dashboard', text: 'editar' },
];

type actionType = 'top' | 'bottom';

interface imgInterface {
  description: string;
  image: string;
  id: string;
}

interface propsModalInterface {
  id: string;
  description: string;
  image: string;
}

export default function EditPostScreen() {
  const [redirect, setRedirect] = useState<boolean>(false);

  const { query } = useRouter();
  const id = `${query?.id || ''}`;

  const [imgAdded, setImgAdded] = useState<imgInterface[]>([]);

  const [formTitle, setFormTitle] = useState<string>('');
  const [formDescription, setFormDescription] = useState<string>('');
  const [formTagMoment, setFormTagMoment] = useState<string>('');
  const [formTagDifficult, setFormTagDifficult] = useState<string>('');
  const [formTagAbility, setFormTagAbility] = useState<string>('');
  const [formTagSide, setFormTagSide] = useState<string>('');
  const [formTagMap, setFormTagMap] = useState<string>('');
  const [formTagMapPosition, setFormTagMapPosition] = useState<string>('');
  const [formTagAgent, setFormTagAgent] = useState<string>('');

  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const [propsModal, setPropsModal] = useState<propsModalInterface>({
    id: '',
    description: '',
    image: '',
  });

  useEffect(() => {
    api
      .get(`/post/${id}`)
      .then((res) => {
        const postJson = res.data;
        setFormTitle(postJson.title);
        setFormDescription(postJson.description);
        setFormTagMoment(postJson.tags.moment);
        setFormTagDifficult(postJson.tags.difficult);
        setFormTagAbility(postJson.tags.ability);
        setFormTagSide(postJson.tags.side);
        setFormTagMap(postJson.tags.map);
        setFormTagMapPosition(postJson.tags.mapPosition);
        setFormTagAgent(postJson.tags.agent);
        setImgAdded(postJson.imgs);
      })
      .catch(() => {});
  }, [id]);

  async function handleSubmit() {
    const request = {
      title: formTitle,
      description: formDescription,
      user: '',
      tags: {
        moment: formTagMoment,
        difficult: formTagDifficult,
        ability: formTagAbility,
        side: formTagSide,
        map: formTagMap,
        mapPosition: formTagMapPosition,
        agent: formTagAgent,
      },
      imgs: imgAdded,
    };

    api
      .put(`/post/${id}`, { ...request })
      .then(() => {
        setRedirect(true);
      })
      .catch(() => {});
  }

  function deleteStep(id: string) {
    setImgAdded(imgAdded.filter((item) => item.id !== id));
  }

  function putPosition(id: string, action: actionType): boolean {
    console.log(imgAdded);
    // Obter a posição do item que será trocado
    const positionPut = imgAdded.findIndex((item) => item.id === id);

    // Copia o item que será trocado
    const copyListDelete = imgAdded[positionPut];

    // Cria uma cópia do imgAdded ( não pode ser alterado )
    const copyImgAdded = JSON.parse(JSON.stringify(imgAdded));

    let increment = 0;

    // Se for para decrementar e for maior que 0
    if (action === 'bottom' && positionPut > 0) {
      increment = -1;
    } else if (action === 'top' && positionPut < imgAdded.length) {
      increment = 1;
    } else {
      return null;
    }

    // Deleta o item que será trocadao
    copyImgAdded.splice(positionPut, 1);

    // Inserir o item na posição anterior
    copyImgAdded.splice(positionPut + increment, 0, copyListDelete);

    // Atualiza no state
    setImgAdded(copyImgAdded);
    return true;
  }

  function renderAgent() {
    return agents();
  }

  function renderSide() {
    return side();
  }

  function renderMaps() {
    return maps();
  }

  function renderDifficult() {
    return difficult();
  }

  function renderMoment() {
    return moment();
  }

  function renderHabilits() {
    const filterAbilities: agentInterface = agents().filter((agent) => agent.name === formTagAgent)?.[0];
    return filterAbilities?.habilits ?? [];
  }

  function renderPositionsMap() {
    const filterMapPositions: mapInterface = maps().filter((map) => map.name === formTagMap)?.[0];
    return filterMapPositions?.mapPosition ?? [];
  }

  function showModalWithItem(id: string) {
    const item = imgAdded.filter((item) => item.id === id)[0];
    setPropsModal(item);
    setVisibleModal(true);
  }

  function showModal() {
    setPropsModal({ id: '', description: '', image: '' });
    setVisibleModal(true);
  }

  function closeModal() {
    setPropsModal({ id: '', description: '', image: '' });
    setVisibleModal(false);
  }

  function renderSteps() {
    return imgAdded.map((instruction, key) => (
      <div key={instruction.id}>
        <div className="instructionTop">
          <p onClick={() => {}} onKeyDown={() => showModalWithItem(instruction.id)} role="presentation">
            {key + 1} - {instruction.description}
          </p>
          <Button onClick={() => deleteStep(instruction.id)}>
            <FaTimes />
          </Button>
        </div>

        <div className="instructionImage">
          <img src={formatImage(instruction.image)} alt={instruction.description} /> <br />
          <Button className="btn-bottom" onClick={() => putPosition(instruction.id, 'bottom')}>
            <BsChevronUp />
          </Button>
          <Button className="btn-top" onClick={() => putPosition(instruction.id, 'top')}>
            <BsChevronDown />
          </Button>
        </div>
        <hr />
      </div>
    ));
  }

  function saveModal(id: string, description: string, image: string) {
    if (id) {
      const copyImgAdded: imgInterface[] = JSON.parse(JSON.stringify(imgAdded));
      for (let x = 0; x < copyImgAdded.length; x += 1) {
        if (copyImgAdded[x].id === id) {
          copyImgAdded[x].description = description;
          copyImgAdded[x].image = image;
        }
      }
      setImgAdded(copyImgAdded);
      setVisibleModal(false);
    } else {
      setImgAdded([...imgAdded, { description, image, id: uuid.v4().toString() }]);
      setVisibleModal(false);
    }
  }

  async function deletePost(id: string) {
    // eslint-disable-next-line no-alert
    if (window.confirm('Deseja excluir permanentemente este post?')) {
      await api.delete(`/post/${id}`);
      setRedirect(true);
    }
  }

  useEffect(() => {
    if (redirect) {
      Router.push('/admin/view-posts');
    }
  }, [redirect]);

  return (
    <div className="container">
      <NavbarComponent selected={navbarEnum.EditScreen} />
      <BreadcrumbComponent admin breadcrumbs={breadcrumbs} />

      <div className="sub__container">
        {visibleModal ? (
          <ModalComponent
            title="Adicionar Post"
            id={propsModal.id}
            description={propsModal.description}
            image={propsModal.image}
            closeModal={() => closeModal()}
            saveModal={() => saveModal}
          />
        ) : null}

        <div className="form">
          <h1>Editar um post</h1>
          <Button className="btn-color-primary" onClick={() => deletePost(id)}>
            Excluir
          </Button>

          <Input name="title" type="text" text="Titulo" value={formTitle} setValue={setFormTitle} />
          <Input
            name="description"
            type="text"
            text="Descrição"
            value={formDescription}
            setValue={setFormDescription}
          />

          <hr />

          <div className="groupInput">
            <Selected text="Agente" value={formTagAgent} setValue={setFormTagAgent} render={renderAgent()} />
            <Selected text="Mapa" value={formTagMap} setValue={setFormTagMap} render={renderMaps()} />
            <Selected text="Habilidade" value={formTagAbility} setValue={setFormTagAbility} render={renderHabilits()} />
          </div>

          <div className="groupInput">
            <Selected
              text="Posição"
              value={formTagMapPosition}
              setValue={setFormTagMapPosition}
              render={renderPositionsMap()}
            />
            <Selected text="Momento" value={formTagMoment} setValue={setFormTagMoment} render={renderMoment()} />
            <Selected
              text="Dificuldade"
              value={formTagDifficult}
              setValue={setFormTagDifficult}
              render={renderDifficult()}
            />
          </div>

          <div className="groupInput">
            <Selected text="Lado" value={formTagSide} setValue={setFormTagSide} render={renderSide()} />
          </div>

          <hr />
          <p className="info">
            Passo a passo da dica. Lembre-se de usar Zoom, usar marcações claras, de forma que seja bem visível.
            <br />
            <br /> Clique nos titulos para EDITAR os itens
          </p>
          <hr />
          <div className="stepsPost">{renderSteps()}</div>

          <div className="groupInput">
            <div className="groupInputSelect">
              <Button className="btn-outline-secondary" onClick={() => showModal()}>
                Novo Passo
              </Button>
              <br />
            </div>
          </div>
          <div className="groupInput">
            <div className="groupInputSelect">
              <Button onClick={() => handleSubmit()} className="btn-secondary">
                Publicar Dica
              </Button>
            </div>
          </div>
        </div>
      </div>
      <FooterComponent color="secondary" />
    </div>
  );
}

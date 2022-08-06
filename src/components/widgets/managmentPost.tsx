import { useEffect, useState } from 'react';
import * as uuid from 'uuid';
import Router, { useRouter } from 'next/router';
import { Navbar } from '@/layout/navbar';
import {
  agents as renderAgents,
  maps as renderMaps,
  difficult as renderDifficult,
  moment as renderMoment,
  side as renderSide,
} from '@/data/data-valorant';
import { Input } from '@/base/input';
import { Modal } from '@/widgets/modal';
import { formatImage } from '@/services/formatEnvironment';
import { Selected } from '@/base/selected';
import { Breadcrumb } from '@/widgets/breadcrumb';
import { Title } from '@/base/title';
import { Button } from '@/base/button';
import { IAgent, IMap } from '@/types/posts';
import { FaTimes } from 'react-icons/fa';
import { BsChevronUp, BsChevronDown } from 'react-icons/bs';
import { navbarEnum } from '@/enums/navbar';
import { Loader } from '@/base/loader';
import { GroupInput } from '@/base/groupInput';
import { modelNavbarAdmin } from '@/schemas/navbar';
import { SubContainer } from '@/base/subContainer';
import { Form } from '@/base/Form';
import { GroupInputMultiple } from '@/base/groupInputMultiple';
import { Hr } from '@/base/hr';
import Image from 'next/image';
import { convertToSelectedRender } from '@/helpers/convertToSelectedData';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaManagementPosts } from '@/handlers/forms';
import { useManagementPosts } from '@/hooks/useManagementPosts';
import loadable from '@loadable/component';

const Footer = loadable(() => import(`@/layout/footer`));

type actionType = 'top' | 'bottom';

type imgType = {
  description: string;
  image: string;
  id: string;
};

type modalType = {
  id: string;
  description: string;
  image: string;
};

type ModelManagementType = {
  breadcrumbs: { url: navbarEnum; text: string }[];
  mode: 'create' | 'edit';
};

type registrationFormFields = {
  title: string;
  description: string;
  imgs: imgType[];
  moment: string;
  difficult: string;
  ability: string;
  side: string;
  map: string;
  position: string;
  agent: string;
};
const FIRST_POSITION = 0;
const SECOND_POSITION = 1;
export const CreatePostManagement = ({ breadcrumbs, mode }: ModelManagementType) => {
  const { query, isReady } = useRouter();
  const id = `${query?.id || ''}`;
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const [propsModal, setPropsModal] = useState<modalType>({
    id: '',
    description: '',
    image: '',
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<registrationFormFields>({ resolver: yupResolver(schemaManagementPosts) });

  const {
    getOnePost,
    redirect,
    initialPost,
    deleteThisPost,
    isLoading,
    imgAdded,
    setImgAdded,
    createNewPost,
    editOnePost,
  } = useManagementPosts();

  useEffect(() => {
    if (initialPost) {
      reset(initialPost);
    }
  }, [JSON.stringify(initialPost)]);

  useEffect(() => {
    const isEditModeReadyAndIdIsAvailable = mode === 'edit' && isReady && id;

    if (isEditModeReadyAndIdIsAvailable) {
      getOnePost(id);
    }
  }, [id, mode, isReady]);

  const deleteStep = (idPost: string) => {
    setImgAdded(imgAdded.filter((item) => item.id !== idPost));
  };

  const putPosition = (idPost: string, action: actionType) => {
    const positionPut = imgAdded.findIndex((item) => item.id === idPost);
    const copyListDelete = imgAdded[positionPut];
    const copyImgAdded = JSON.parse(JSON.stringify(imgAdded));

    let increment = 0;
    const DECREASE_BY = 1;

    if (action === 'bottom' && positionPut > FIRST_POSITION) {
      increment = -DECREASE_BY;
    } else if (action === 'top' && positionPut < imgAdded.length) {
      increment = 1;
    }

    copyImgAdded.splice(positionPut, SECOND_POSITION);
    copyImgAdded.splice(positionPut + increment, FIRST_POSITION, copyListDelete);
    setImgAdded(copyImgAdded);
  };

  const renderAbilities = () => {
    const agente = watch('agent');
    const filterAbilities: IAgent = renderAgents().filter((agent) => agent.name === agente)?.[FIRST_POSITION];
    return filterAbilities?.abilities ?? [];
  };

  const renderPositionsMap = () => {
    const mapa: string = watch('map');
    const filterMapPositions: IMap = renderMaps().filter((map) => map.name === mapa)?.[FIRST_POSITION];
    return filterMapPositions?.mapPosition ?? [];
  };

  const showModalWithItem = (idPost: string) => {
    const item = imgAdded.filter((itemLocal) => itemLocal.id === idPost)[FIRST_POSITION];
    setPropsModal(item);
    setVisibleModal(true);
  };

  const showModal = () => {
    setPropsModal({ id: '', description: '', image: '' });
    setVisibleModal(true);
  };

  const closeModal = () => {
    setPropsModal({ id: '', description: '', image: '' });
    setVisibleModal(false);
  };

  const renderSteps = () =>
    imgAdded.map((instruction, key) => (
      <div key={`${instruction.id} ${instruction.image}`} className="w-full">
        <div className="flex">
          <p
            className="flex-1 text-sm text-gray-600 dark:text-gray-200"
            onClick={() => showModalWithItem(instruction.id)}
            role="presentation">
            {key + 1} - {instruction.description}
          </p>
          <Button
            className="text-base ml-2 text-red-400"
            onClick={() => deleteStep(instruction.id)}
            dataTestid={`deleteStepButton-${key + 1}`}>
            <FaTimes />
          </Button>
        </div>

        <div className="relative flex-1 ">
          <div className="relative h-72 w-full ">
            {formatImage(instruction.image) !== '' ? (
              <Image
                layout="fill"
                className="object-cover"
                data-src={formatImage(instruction.image)}
                src={formatImage(instruction.image)}
                alt={instruction.description}
              />
            ) : null}
          </div>

          <br />
          <Button
            className="top-0 left-2/4 absolute z-btnPost"
            onClick={() => putPosition(instruction.id, 'bottom')}
            dataTestid={`btn-top-${key + 1}`}>
            <BsChevronUp className="text-3xl font-extrabold text-skin-white " />
          </Button>
          <Button
            className="bottom-5 left-2/4 absolute z-btnPost"
            onClick={() => putPosition(instruction.id, 'top')}
            dataTestid={`btn-bottom-${key + 1}`}>
            <BsChevronDown className="text-3xl font-extrabold text-skin-white" />
          </Button>
        </div>
        <Hr />
      </div>
    ));

  const saveModal = (idPost: string, description: string, image: string) => {
    if (idPost) {
      const copyImgAdded: imgType[] = JSON.parse(JSON.stringify(imgAdded));

      // eslint-disable-next-line no-loops/no-loops
      for (let count = 0; count < copyImgAdded.length; count += 1) {
        if (copyImgAdded[count].id === idPost) {
          copyImgAdded[count].description = description;
          copyImgAdded[count].image = image;
        }
      }
      setImgAdded(copyImgAdded);
      setVisibleModal(false);
    } else {
      setImgAdded([...imgAdded, { description, image, id: uuid.v4().toString() }]);
      setVisibleModal(false);
    }
  };

  const deletePost = async (idPost: string) => {
    deleteThisPost(idPost);
  };

  useEffect(() => {
    if (redirect) {
      Router.push('/admin/view-posts');
    }
  }, [redirect]);

  const onSubmit = async ({ title, description, agent, map, ability, difficult, position, moment, side }) => {
    const request = {
      title,
      description,
      user: '',
      tags: {
        moment,
        difficult,
        ability,
        side,
        map,
        mapPosition: position,
        agent,
      },
      imgs: imgAdded,
    };

    if (mode === 'create') {
      createNewPost(request);
    } else if (mode === 'edit') {
      editOnePost(id, request);
    }
  };

  return (
    <>
      {mode === 'create' ? (
        <Navbar selected={navbarEnum.PostCreate} modelNavbar={modelNavbarAdmin} />
      ) : (
        <Navbar selected={navbarEnum.EditScreen} modelNavbar={modelNavbarAdmin} />
      )}
      <Breadcrumb breadcrumbs={breadcrumbs} />
      <Loader active={isLoading} />

      <SubContainer>
        {visibleModal ? (
          <Modal
            title="Adicionar Post"
            id={propsModal.id}
            description={propsModal.description}
            image={propsModal.image}
            closeModal={() => closeModal()}
            saveModal={saveModal}
          />
        ) : null}

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Title>{mode === 'create' ? 'Criar um post' : 'Editar um post'}</Title>

          {mode === 'edit' ? (
            <Button className="text-skin-secondary-regular" onClick={() => deletePost(id)}>
              Excluir
            </Button>
          ) : null}

          <Input placeholder="" name="title" type="text" label="Titulo" register={register} errors={errors} />
          <Input placeholder="" name="description" type="text" label="Descrição" register={register} errors={errors} />

          <Hr />

          <GroupInputMultiple>
            <Selected
              name="agent"
              text="Agente"
              register={register}
              errors={errors}
              render={convertToSelectedRender(renderAgents())}
            />
            <Selected
              name="map"
              text="Mapa"
              register={register}
              errors={errors}
              render={convertToSelectedRender(renderMaps())}
            />
            <Selected name="ability" text="Habilidade" register={register} errors={errors} render={renderAbilities()} />
          </GroupInputMultiple>

          <GroupInputMultiple>
            <Selected
              name="position"
              text="Posição"
              register={register}
              errors={errors}
              render={renderPositionsMap()}
            />
            <Selected name="moment" text="Momento" register={register} errors={errors} render={renderMoment()} />
            <Selected
              name="difficult"
              text="Dificuldade"
              register={register}
              errors={errors}
              render={renderDifficult()}
            />
          </GroupInputMultiple>

          <GroupInputMultiple>
            <Selected name="side" text="Lado" register={register} errors={errors} render={renderSide()} />
          </GroupInputMultiple>

          <Hr />

          <p className="dark:text-skin-white text-gray-500 text-sm">
            Passo a passo da dica. Lembre-se de usar Zoom, usar marcações claras, de forma que seja bem visível.
            <br />
            <br /> Clique nos titulos para EDITAR os itens
          </p>

          <Hr />

          {renderSteps()}

          <div className="mt-5 w-full">
            <GroupInput>
              <Button className="border-red-400 text-red-400 px-3.5 py-2 text-sm" onClick={() => showModal()}>
                Novo Passo
              </Button>
            </GroupInput>

            <GroupInput>
              <Button type="submit" className="border-red-400 text-white bg-red-400 px-3.5 py-2 text-sm">
                Publicar Dica
              </Button>
            </GroupInput>
          </div>
        </Form>
      </SubContainer>
      <Footer />
    </>
  );
};

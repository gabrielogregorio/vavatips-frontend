/* eslint-disable react-hooks/exhaustive-deps */
import { ReactElement, useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import Router, { useRouter } from 'next/router';
import { Navbar } from '@/layout/navbar';
import {
  agents as renderAgents,
  difficult as renderDifficult,
  moment as renderMoment,
  side as renderSide,
} from '@/data/data-valorant';
import { maps as renderMaps } from '@/data/data-valorant-maps';
import { Input } from '@/base/input';
import { Modal } from '@/widgets/modal';
import { formatImage } from '@/services/formatEnvironment';
import { Selected } from '@/base/selected';
import { Breadcrumb } from '@/widgets/breadcrumb';
import { Title } from '@/base/title';
import { Button } from '@/base/button';
import { IAgent, IMap, TAbility, TPositionMap } from '@/types/posts';
import { FaTimes } from 'react-icons/fa';
import { BsChevronUp, BsChevronDown } from 'react-icons/bs';
import { navbarEnum } from '@/enums/navbar';
import { Loader } from '@/base/loader';
import { GroupInput } from '@/base/groupInput';
import { modelNavbarAdmin } from '@/schemas/navbar';
import { SubContainer } from '@/base/subContainer';
import { Form } from '@/base/Form';
import { GroupInputMultiple } from '@/base/groupInputMultiple';
import { HrComponent } from '@/base/hr';
import Image from 'next/image';
import { convertToSelectedRender } from '@/helpers/convertToSelectedData';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaManagementPosts } from '@/handlers/forms';
import { useManagementPosts } from '@/hooks/useManagementPosts';
import { Footer } from '@/layout/footer';
import { generateNumericList } from '@/helpers/generateArray';

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
const NORMALIZE_COUNTER_STARTING_IN_ONE = 1;
export const CreatePostManagement = ({ breadcrumbs, mode }: ModelManagementType): ReactElement => {
  const { query, isReady } = useRouter();
  const postId = `${query?.id || ''}`;
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const [propsModal, setPropsModal] = useState<modalType>({
    description: '',
    id: '',
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
    const isEditModeReadyAndIdIsAvailable = mode === 'edit' && isReady && postId;

    if (isEditModeReadyAndIdIsAvailable) {
      getOnePost(postId);
    }
  }, [postId, mode, isReady]);

  const deleteStep = (idPost: string): void => {
    setImgAdded(imgAdded.filter((item) => item.id !== idPost));
  };

  const putPosition = (idPost: string, action: actionType): void => {
    const positionPut = imgAdded.findIndex((item) => item.id === idPost);
    const copyListDelete = imgAdded[positionPut];
    const copyImgAdded = JSON.parse(JSON.stringify(imgAdded));

    let increment = 0;
    const DECREASE_BY = 1;
    const INITIAL_VALUE = 1;

    if (action === 'bottom' && positionPut > FIRST_POSITION) {
      increment = -DECREASE_BY;
    } else if (action === 'top' && positionPut < imgAdded.length) {
      increment = INITIAL_VALUE;
    }

    copyImgAdded.splice(positionPut, SECOND_POSITION);
    copyImgAdded.splice(positionPut + increment, FIRST_POSITION, copyListDelete);
    setImgAdded(copyImgAdded);
  };

  const renderAbilities = (): TAbility[] => {
    const agente = watch('agent');
    const filterAbilities: IAgent = renderAgents().filter((agent) => agent.name === agente)?.[FIRST_POSITION];
    return filterAbilities?.abilities ?? [];
  };

  const renderPositionsMap = (): TPositionMap[] => {
    const mapa: string = watch('map');
    const filterMapPositions: IMap = renderMaps().filter((map) => map.name === mapa)?.[FIRST_POSITION];
    return filterMapPositions?.mapPosition ?? [];
  };

  const showModalWithItem = (idPost: string): void => {
    const item = imgAdded.filter((itemLocal) => itemLocal.id === idPost)[FIRST_POSITION];
    setPropsModal(item);
    setVisibleModal(true);
  };

  const showModal = (): void => {
    setPropsModal({ description: '', id: '', image: '' });
    setVisibleModal(true);
  };

  const closeModal = (): void => {
    setPropsModal({ description: '', id: '', image: '' });
    setVisibleModal(false);
  };

  const renderSteps = (): ReactElement[] =>
    imgAdded.map((instruction, key) => (
      <div key={`${instruction.id} ${instruction.image}`} className="w-full">
        <div className="flex">
          <p
            className="flex-1 text-sm text-gray-600 dark:text-gray-200"
            onClick={(): void => showModalWithItem(instruction.id)}
            role="presentation">
            {key + NORMALIZE_COUNTER_STARTING_IN_ONE} - {instruction.description}
          </p>
          <Button
            className="text-base ml-2 text-red-400"
            onClick={(): void => deleteStep(instruction.id)}
            dataTestid={`deleteStepButton-${key + NORMALIZE_COUNTER_STARTING_IN_ONE}`}>
            <FaTimes />
          </Button>
        </div>

        <div className="relative flex-1 ">
          <div className="relative h-72 w-full ">
            {formatImage(instruction.image) !== '' ? (
              <Image
                width={50}
                height={50}
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
            onClick={(): void => putPosition(instruction.id, 'bottom')}
            dataTestid={`btn-top-${key + NORMALIZE_COUNTER_STARTING_IN_ONE}`}>
            <BsChevronUp className="text-3xl font-extrabold text-skin-white " />
          </Button>
          <Button
            className="bottom-5 left-2/4 absolute z-btnPost"
            onClick={(): void => putPosition(instruction.id, 'top')}
            dataTestid={`btn-bottom-${key + NORMALIZE_COUNTER_STARTING_IN_ONE}`}>
            <BsChevronDown className="text-3xl font-extrabold text-skin-white" />
          </Button>
        </div>
        <HrComponent />
      </div>
    ));

  const saveModal = (idPost: string, description: string, image: string): void => {
    if (idPost) {
      const copyImgAdded: imgType[] = JSON.parse(JSON.stringify(imgAdded));

      generateNumericList(copyImgAdded.length).forEach((_item, index) => {
        if (copyImgAdded[index].id === idPost) {
          copyImgAdded[index].description = description;
          copyImgAdded[index].image = image;
        }
      });

      setImgAdded(copyImgAdded);
      setVisibleModal(false);
    } else {
      setImgAdded([...imgAdded, { description, id: uuid().toString(), image }]);
      setVisibleModal(false);
    }
  };

  const deletePost = (idPost: string): void => {
    deleteThisPost(idPost);
  };

  useEffect(() => {
    if (redirect) {
      Router.push('/admin/view-posts');
    }
  }, [redirect]);

  const onSubmit = async ({
    title,
    description,
    agent,
    map,
    ability,
    difficult,
    position,
    moment,
    side,
  }): Promise<void> => {
    const request = {
      description,
      imgs: imgAdded,
      tags: {
        ability,
        agent,
        difficult,
        map,
        mapPosition: position,
        moment,
        side,
      },
      title,
      user: '',
    };

    if (mode === 'create') {
      createNewPost(request);
    } else if (mode === 'edit') {
      editOnePost(postId, request);
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
            closeModal={(): void => closeModal()}
            saveModal={saveModal}
          />
        ) : null}

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Title>{mode === 'create' ? 'Criar um post' : 'Editar um post'}</Title>

          {mode === 'edit' ? (
            <Button className="text-skin-secondary-regular" onClick={(): void => deletePost(postId)}>
              Excluir
            </Button>
          ) : null}

          <Input placeholder="" name="title" type="text" label="Titulo" register={register('title')} errors={errors} />
          <Input
            placeholder=""
            name="description"
            type="text"
            label="Descrição"
            register={register('description')}
            errors={errors}
          />

          <HrComponent />

          <GroupInputMultiple>
            <Selected
              name="agent"
              text="Agente"
              register={register('agent')}
              errors={errors}
              render={convertToSelectedRender(renderAgents())}
            />
            <Selected
              name="map"
              text="Mapa"
              register={register('map')}
              errors={errors}
              render={convertToSelectedRender(renderMaps())}
            />
            <Selected
              name="ability"
              text="Habilidade"
              register={register('ability')}
              errors={errors}
              render={renderAbilities()}
            />
          </GroupInputMultiple>

          <GroupInputMultiple>
            <Selected
              name="position"
              text="Posição"
              register={register('position')}
              errors={errors}
              render={renderPositionsMap()}
            />
            <Selected
              name="moment"
              text="Momento"
              register={register('moment')}
              errors={errors}
              render={renderMoment()}
            />
            <Selected
              name="difficult"
              text="Dificuldade"
              register={register('difficult')}
              errors={errors}
              render={renderDifficult()}
            />
          </GroupInputMultiple>

          <GroupInputMultiple>
            <Selected name="side" text="Lado" register={register('side')} errors={errors} render={renderSide()} />
          </GroupInputMultiple>

          <HrComponent />

          <p className="dark:text-skin-white text-gray-500 text-sm">
            Passo a passo da dica. Lembre-se de usar Zoom, usar marcações claras, de forma que seja bem visível.
            <br />
            <br /> Clique nos titulos para EDITAR os itens
          </p>

          <HrComponent />

          {renderSteps()}

          <div className="mt-5 w-full">
            <GroupInput>
              <Button className="border-red-400 text-red-400 px-3.5 py-2 text-sm" onClick={(): void => showModal()}>
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

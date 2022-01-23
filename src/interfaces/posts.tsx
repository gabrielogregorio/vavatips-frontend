/* eslint-disable no-unused-vars */
type styleType = 'testBtn' | 'likeBtn' | 'suggestionBtn';

export type momentType =
  | 'InicioPartida'
  | 'DuranteRush'
  | 'QualquerMomento'
  | 'AntesDoPlant'
  | 'DuranteOPlant'
  | 'DepoisDoPlant';

export type difficultType = 'Facil' | 'Medio' | 'Díficil';
export type sideType = 'Defensores' | 'Atacantes';
export type mapType = 'Split' | 'Ascent' | 'Haven' | 'Breeze' | 'Icebox' | 'Fracture' | 'Bind';
export type mapPositionType = 'Meio' | 'B' | 'A' | 'C';
export type positionMapType = 'A' | 'B' | 'C' | 'D' | 'BaseAtacante' | 'BaseDefensora' | 'Meio' | 'Outra';

export interface PositionMapInterface {
  id: string;
  name: positionMapType;
}

export interface PropsPostInterface {
  id: string;
  user: { id: string; username: string; image: string };
  description: string;
  title: string;
  imgs: [{ id: string; image: string; description: string }];
  tags: {
    map: mapType;
    agent: string;
    ability: string;
    moment: momentType;
    difficult: difficultType;
    side: sideType;
    mapPosition: string;
  };
}

export interface habilitsInterface {
  id: string;
  name: string;
  keyboard: string;
}

export interface sideInterface {
  id: string;
  name: sideType;
}

export interface momentInterface {
  id: string;
  name: momentType;
}

export interface difficultInterface {
  id: string;
  name: difficultType;
}

export interface agentInterface {
  id: number;
  name: string;
  img: string;
  habilits: habilitsInterface[];
}

export interface mapInterface {
  id: number;
  name: mapType;
  img: string;
  mapPosition: PositionMapInterface[];
}

export interface imgsInterface {
  title: string;
  img: string;
}

export interface postsProps {
  id: string;
  user: { id: string; username: string; image?: string };
  description: string;
  title: string;
  imgs: { id: string; image: string; description: string }[];
  tags: {
    map: string;
    agent: string;
    ability: string;
    moment: string;
    difficult: string;
    side: string;
    mapPosition: string;
  };
}

export interface propsInterfaceButtonLike {
  active: boolean;
  title: string;
  styleBtn: styleType;
  onClick: () => {};
}

export interface propsInterfaceContaienrPosts {
  queryUrl: any;
  activeLoader: boolean;
  posts: postsProps[];
}

export interface contextTagsInterface {
  tags: string[];
  filters: string[];
  setFilters: (filter: string[]) => void;
  setTags: (tags: string[]) => void;
}

export type actionTypesHandlePosts = 'save' | 'test';

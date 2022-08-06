type momentType =
  | 'InicioPartida'
  | 'DuranteRush'
  | 'QualquerMomento'
  | 'AntesDoPlant'
  | 'DuranteOPlant'
  | 'DepoisDoPlant';

type difficultType = 'Facil' | 'Medio' | 'Díficil';
type sideType = 'Defensores' | 'Atacantes';
type mapType = 'Split' | 'Ascent' | 'Haven' | 'Breeze' | 'Icebox' | 'Fracture' | 'Bind';
type positionMapType = 'A' | 'B' | 'C' | 'D' | 'BaseAtacante' | 'BaseDefensora' | 'Meio' | 'Outra';

type TPositionMap = {
  id: string;
  name: positionMapType;
};

type TAbility = {
  id: string;
  name: string;
  keyboard: string;
};

export type ISide = {
  id: string;
  name: sideType;
};

export type IMoment = {
  id: string;
  name: momentType;
};

export type IDifficult = {
  id: string;
  name: difficultType;
};

export type IAgent = {
  id: number;
  name: string;
  img: string;
  abilities: TAbility[];
};

export type IMap = {
  id: number;
  name: mapType;
  img: string;
  mapPosition: TPositionMap[];
};

export type TPostsProps = {
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
};

export type TContextTags = {
  filters: string[];
  setFilters: (filter: string[]) => void;
  setTags: (tags: string[]) => void;
  tags: string[];
};

export type actionTypesHandlePosts = 'save' | 'test';

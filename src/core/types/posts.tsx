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

type TPositionMap = {
  id: string;
  name: positionMapType;
};

export type TPropsPost = {
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
  tags: string[];
  filters: string[];
  setFilters: (filter: string[]) => void;
  setTags: (tags: string[]) => void;
};

export type actionTypesHandlePosts = 'save' | 'test';

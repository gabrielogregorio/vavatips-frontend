/// <reference types="react-scripts" />

type momentType = 'InicioPartida'| 'DuranteRush' | 'QualquerMomento' | 'DuranteOPlant' | 'DepoisDoPlant'
type difficultType = 'Facil' | 'Medio' | 'Díficil'
type abilityType = 'Spot' | 'BarreiraDeOrbe'
type sideType = 'Defensores' | 'Atacantes'
type mapType = 'Ascent' | 'Split' | 'Ascent'
type mapPositionType = 'Meio' | 'B' | 'A' | 'C'
type agentType  = 'Sova' | 'Vyper'
type positionMapType = 'A' | 'B'| 'C' | 'D' | 'BaseAtacante' | 'BaseDefensora' | 'Meio' | 'Outra'

interface PropsPostInterface {
  _id: string,
  user: { _id: string, username: string, image: string }
  description: string
  title: string

  imgs: [{ _id: string, image: string, description: string } ]
  tags: {
    map: string, // Pode ser qualquer mapa
    agent: string, // Pode ser qualque agente
    ability: string, // Depende do agente
    moment: momentType,
    difficult: difficultType,
    side: sideType,
    mapPosition: positionMapType
  },
  postActions: {
    save: [{_id: string}],
    tested: [{_id: string}]
  },
  toggleSave: (_id: string) => void
  toggleTested: (_id: string) => void
}

interface postActionsInterface {
  save: [ {_id: string} ],
  tested: [{_id: string} ]
}

interface habilitsInterface {
  name: string,
  keyboard: string
}

interface agentInterface {
  id: number,
  name: string,
  img: string,
  habilits: habilitsInterface[]
}

interface mapInterface {
  id: number,
  name: string,
  img: string,
  mapPosition: positionMapType[]
}

interface imgsInterface {
  title: string,
  img: string
}

interface tagProps {
  moment: momentType[],
  difficult: difficultType[],
  ability: abilityType[],
  side: sideType[],
  map: mapType[],
  mapPosition: positionMapType[],
  agent: agentType[],
}

interface postsProps {
  _id: string,
  title: string,
  description: string,
  imgs: imgsInterface[] ,
  tags: tagProps,
}

// Tipos de modal de mensagem
type modalType = 'success' | 'error'

/// <reference types="react-scripts" />

type momentType = 'QualquerMomento' | 'DepoisDoPlant'
type difficultType = 'Facil' | 'medio' | 'hardcore'
type abilityType = 'Spot' | 'BarreiraDeOrbe'
type sideType = 'Defensores' | 'Atacantes'
type mapType = 'Ascent' | 'Split' | 'Ascent'
type mapPositionType = 'Meio' | 'B' | 'A' | 'C'
type agentType  = 'Sova' | 'Vyper'


interface PropsPostInterface {
  _id: string,
  user: { _id: string, username: string, image: string }
  description: string
  title: string

  imgs: [{ _id: string, image: string, description: string } ]
  tags: {
    map: string,
    agent: string,
    ability: string,
    moment: string,
    difficult: string,
    side: string,
    mapPosition: string
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
  img: string
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
  mapPosition: mapPositionType[],
  agent: agentType[],
}

interface postsProps {
  _id: string,
  title: string,
  description: string,
  imgs: imgsInterface[] ,
  tags: tagProps,
}

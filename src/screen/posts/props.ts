type momentType = 'QualquerMomento' | 'DepoisDoPlant'
type difficultType = 'Facil' | 'medio' | 'hardcore'
type abilityType = 'Spot' | 'BarreiraDeOrbe'
type sideType = 'Defensores' | 'Atacantes'
type mapType = 'Ascent' | 'Split' | 'Ascent'
type mapPositionType = 'Meio' | 'B' | 'A' | 'C'
type agentType  = 'Sova' | 'Vyper'

interface imgsInterface {
  title: string,
  img: string
}

export interface tagProps {
  moment: momentType[],
  difficult: difficultType[],
  ability: abilityType[],
  side: sideType[],
  map: mapType[],
  mapPosition: mapPositionType[],
  agent: agentType[],
}

export interface postsProps {
  _id: string,
  title: string,
  description: string,
  imgs: imgsInterface[] ,
  tags: tagProps,
}

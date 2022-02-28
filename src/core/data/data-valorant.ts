import {
  AgentInterface,
  DifficultInterface,
  MapInterface,
  MomentInterface,
  SideInterface,
} from '@/interfaces/posts';

export const side = (): SideInterface[] => [
  {
    id: '1',
    name: 'Atacantes',
  },
  {
    id: '2',
    name: 'Defensores',
  },
];

export const moment = (): MomentInterface[] => [
  {
    id: '1',
    name: 'QualquerMomento',
  },
  {
    id: '2',
    name: 'InicioPartida',
  },
  {
    id: '3',
    name: 'DuranteRush',
  },
  {
    id: '4',
    name: 'AntesDoPlant',
  },
  {
    id: '5',
    name: 'DuranteOPlant',
  },
  {
    id: '6',
    name: 'DepoisDoPlant',
  },
];

export const difficult = (): DifficultInterface[] => [
  {
    id: '1',
    name: 'Facil',
  },
  {
    id: '2',
    name: 'Medio',
  },
  {
    id: '3',
    name: 'Díficil',
  },
];

export const agents = (): AgentInterface[] => [
  {
    id: 1,
    name: 'Cypher',
    img: '/images/agents/Cypher.webp',
    abilities: [
      { id: '_11_', keyboard: 'Q', name: 'JaulaCibernética' },
      { id: '_12_', keyboard: 'E', name: 'CâmeraDeVigilância' },
      { id: '_13_', keyboard: 'C', name: 'FioArmadilha' },
      { id: '_14_', keyboard: 'X', name: 'AssaltoNeural' },
    ],
  },
  {
    id: 2,
    name: 'Killjoy',
    img: '/images/agents/Killjoy.webp',
    abilities: [
      { id: '_15_', keyboard: 'Q', name: 'RobôDeAlarme' },
      { id: '_16_', keyboard: 'E', name: 'Torreta' },
      { id: '_17_', keyboard: 'C', name: 'Nanoenxame' },
      { id: '_18_', keyboard: 'X', name: 'Confinamento' },
    ],
  },
  {
    id: 3,
    name: 'Sova',
    img: '/images/agents/Sova.webp',
    abilities: [
      { id: '_19_', keyboard: 'Q', name: 'FlechaDeChoque' },
      { id: '_10_', keyboard: 'E', name: 'FlechaRastreadora' },
      { id: '_11_', keyboard: 'C', name: 'DroneCoruka' },
      { id: '_12_', keyboard: 'X', name: 'FúriaDoCaçador' },
    ],
  },
  {
    id: 4,
    name: 'Viper',
    img: '/images/agents/Viper.webp',
    abilities: [
      { id: '_13_', keyboard: 'Q', name: 'NuvemVenenosa' },
      { id: '_14_', keyboard: 'E', name: 'CortinaTóxica' },
      { id: '_15_', keyboard: 'C', name: 'VenenoDeCobra' },
      { id: '_16_', keyboard: 'X', name: 'PoçoPeçonhento' },
    ],
  },
  {
    id: 5,
    name: 'Sage',
    img: '/images/agents/Sage.webp',
    abilities: [
      { id: '_17_', keyboard: 'Q', name: 'OrdeDeLentidão' },
      { id: '_18_', keyboard: 'E', name: 'OrbeCurativo' },
      { id: '_19_', keyboard: 'C', name: 'OrbeDeBarreira' },
      { id: '_20_', keyboard: 'X', name: 'Ressureição' },
    ],
  },
  {
    id: 6,
    name: 'Astra',
    img: '/images/agents/Astra.webp',
    abilities: [
      { id: '_21_', keyboard: 'Q', name: 'PulsoNova' },
      { id: '_22_', keyboard: 'E', name: 'Nebulosa' },
      { id: '_23_', keyboard: 'C', name: 'PoçoGravitacional' },
      { id: '_24_', keyboard: 'X', name: 'DivisaCósmica' },
    ],
  },
  {
    id: 7,
    name: 'Skye',
    img: '/images/agents/Skye.webp',
    abilities: [
      { id: '_25_', keyboard: 'Q', name: 'PredadorExplosivo' },
      { id: '_26_', keyboard: 'E', name: 'LuzDesbravadora' },
      { id: '_27_', keyboard: 'C', name: 'Reflorescer' },
      { id: '_28_', keyboard: 'X', name: 'Rastreadores' },
    ],
  },
  {
    id: 8,
    name: 'Reyna',
    img: '/images/agents/Reyna.webp',
    abilities: [
      { id: '_29_', keyboard: 'Q', name: 'Devorar' },
      { id: '_30_', keyboard: 'E', name: 'Dispensar' },
      { id: '_31_', keyboard: 'C', name: 'OlharVoraz' },
      { id: '_32_', keyboard: 'X', name: 'Imperatriz' },
    ],
  },
  {
    id: 9,
    name: 'Yoru',
    img: '/images/agents/Yoru.webp',
    abilities: [
      { id: '_33_', keyboard: 'Q', name: 'PontoCego' },
      { id: '_34_', keyboard: 'E', name: 'PassagemDimensional' },
      { id: '_35_', keyboard: 'C', name: 'Falcatrua' },
      { id: '_36_', keyboard: 'X', name: 'EspionagemDimensional' },
    ],
  },
  {
    id: 10,
    name: 'Jett',
    img: '/images/agents/Jett.webp',
    abilities: [
      { id: '_37_', keyboard: 'Q', name: 'CorrenteAscendente' },
      { id: '_38_', keyboard: 'E', name: 'BrisaDeImpulso' },
      { id: '_39_', keyboard: 'C', name: 'ErupçãoDasBrumas' },
      { id: '_40_', keyboard: 'X', name: 'TormentaDeAço' },
    ],
  },
  {
    id: 11,
    name: 'Raze',
    img: '/images/agents/Raze.webp',
    abilities: [
      { id: '_41_', keyboard: 'Q', name: 'CargaDeExplosivos' },
      { id: '_42_', keyboard: 'E', name: 'CartuchosDeTintaGranada' },
      { id: '_43_', keyboard: 'C', name: 'Bumba' },
      { id: '_44_', keyboard: 'X', name: 'EstragaPrazeres' },
    ],
  },
  {
    id: 12,
    name: 'Phoenix',
    img: '/images/agents/Phoenix.webp',
    abilities: [
      { id: '_45_', keyboard: 'Q', name: 'BolaCurva' },
      { id: '_46_', keyboard: 'E', name: 'MãosQuentes' },
      { id: '_47_', keyboard: 'C', name: 'Labareda' },
      { id: '_48_', keyboard: 'X', name: 'Renascimento' },
    ],
  },
  {
    id: 13,
    name: 'Kay/0',
    img: '/images/agents/Kay0.webp',
    abilities: [
      { id: '_49_', keyboard: 'Q', name: 'Clarão' },
      { id: '_50_', keyboard: 'E', name: 'PontoZeroSpot' },
      { id: '_51_', keyboard: 'C', name: 'Fragmento' },
      { id: '_52_', keyboard: 'X', name: 'Anular' },
    ],
  },
  {
    id: 14,
    name: 'Breach',
    img: '/images/agents/Breach.webp',
    abilities: [
      { id: '_53_', keyboard: 'Q', name: 'EstopimBang' },
      { id: '_54_', keyboard: 'E', name: 'FalhaTectônica' },
      { id: '_55_', keyboard: 'C', name: 'PósChoque' },
      { id: '_56_', keyboard: 'X', name: 'OndaTrovejante' },
    ],
  },
  {
    id: 15,
    name: 'Omen',
    img: '/images/agents/Omen.webp',
    abilities: [
      { id: '_57_', keyboard: 'Q', name: 'Paranoia' },
      { id: '_58_', keyboard: 'E', name: 'MantoSombrio' },
      { id: '_59_', keyboard: 'C', name: 'PassosTenebrosos' },
      { id: '_60_', keyboard: 'X', name: 'SaltoDasSombras' },
    ],
  },
  {
    id: 16,
    name: 'Brimstone',
    img: '/images/agents/Brimstone.webp',
    abilities: [
      { id: '_61_', keyboard: 'Q', name: 'Incendiário' },
      { id: '_62_', keyboard: 'E', name: 'FumaçaCeleste' },
      { id: '_63_', keyboard: 'C', name: 'SinalizadorEstimulante' },
      { id: '_64_', keyboard: 'X', name: 'AtaqueOrbital' },
    ],
  },
];

export const maps = (): MapInterface[] => [
  {
    id: 1,
    name: 'Ascent',
    img: '/images/maps/Ascent.webp',
    mapPosition: [
      { id: 'Ascent_1', name: 'A' },
      { id: 'Ascent_2', name: 'B' },
      { id: 'Ascent_3', name: 'BaseAtacante' },
      { id: 'Ascent_4', name: 'BaseDefensora' },
      { id: 'Ascent_5', name: 'Meio' },
      { id: 'Ascent_6', name: 'Outra' },
    ],
  },
  {
    id: 2,
    name: 'Bind',
    img: '/images/maps/Bind.webp',
    mapPosition: [
      { id: 'Bind_1', name: 'A' },
      { id: 'Bind_2', name: 'B' },
      { id: 'Bind_3', name: 'BaseAtacante' },
      { id: 'Bind_4', name: 'BaseDefensora' },
      { id: 'Bind_5', name: 'Meio' },
      { id: 'Bind_6', name: 'Outra' },
    ],
  },
  {
    id: 3,
    name: 'Haven',
    img: '/images/maps/Haven.webp',
    mapPosition: [
      { id: 'Haven_1', name: 'A' },
      { id: 'Haven_2', name: 'B' },
      { id: 'Haven_3', name: 'C' },
      { id: 'Haven_4', name: 'BaseAtacante' },
      { id: 'Haven_5', name: 'BaseDefensora' },
      { id: 'Haven_6', name: 'Meio' },
      { id: 'Haven_7', name: 'Outra' },
    ],
  },
  {
    id: 4,
    name: 'Split',
    img: '/images/maps/Split.webp',
    mapPosition: [
      { id: 'Split_1', name: 'A' },
      { id: 'Split_2', name: 'B' },
      { id: 'Split_3', name: 'BaseAtacante' },
      { id: 'Split_4', name: 'BaseDefensora' },
      { id: 'Split_5', name: 'Meio' },
      { id: 'Split_6', name: 'Outra' },
    ],
  },
  {
    id: 5,
    name: 'Breeze',
    img: '/images/maps/Breeze.webp',
    mapPosition: [
      { id: 'Breeze_1', name: 'A' },
      { id: 'Breeze_2', name: 'B' },
      { id: 'Breeze_3', name: 'BaseAtacante' },
      { id: 'Breeze_4', name: 'BaseDefensora' },
      { id: 'Breeze_5', name: 'Meio' },
      { id: 'Breeze_6', name: 'Outra' },
    ],
  },
  {
    id: 6,
    name: 'Fracture',
    img: '/images/maps/Fracture.webp',
    mapPosition: [
      { id: 'Fracture_1', name: 'A' },
      { id: 'Fracture_2', name: 'B' },
      { id: 'Fracture_3', name: 'BaseAtacante' },
      { id: 'Fracture_4', name: 'BaseDefensora' },
      { id: 'Fracture_5', name: 'Meio' },
      { id: 'Fracture_6', name: 'Outra' },
    ],
  },
  {
    id: 7,
    name: 'Icebox',
    img: '/images/maps/Icebox.webp',
    mapPosition: [
      { id: 'Icebox_1', name: 'A' },
      { id: 'Icebox_2', name: 'B' },
      { id: 'Icebox_3', name: 'BaseAtacante' },
      { id: 'Icebox_4', name: 'BaseDefensora' },
      { id: 'Icebox_5', name: 'Meio' },
      { id: 'Icebox_6', name: 'Outra' },
    ],
  },
];

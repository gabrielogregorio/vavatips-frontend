import { IAgent, IDifficult, IMoment, ISide } from '@/types/posts';

export const side = (): ISide[] => [
  {
    id: '1',
    name: 'Atacantes',
  },
  {
    id: '2',
    name: 'Defensores',
  },
];

export const moment = (): IMoment[] => [
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

export const difficult = (): IDifficult[] => [
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

export const agents = (): IAgent[] => [
  {
    abilities: [
      { id: '_11_', keyboard: 'Q', name: 'JaulaCibernética' },
      { id: '_12_', keyboard: 'E', name: 'CâmeraDeVigilância' },
      { id: '_13_', keyboard: 'C', name: 'FioArmadilha' },
      { id: '_14_', keyboard: 'X', name: 'AssaltoNeural' },
    ],
    id: 1,
    img: '/images/agents/Cypher.webp',
    name: 'Cypher',
  },
  {
    abilities: [
      { id: '_15_', keyboard: 'Q', name: 'RobôDeAlarme' },
      { id: '_16_', keyboard: 'E', name: 'Torreta' },
      { id: '_17_', keyboard: 'C', name: 'Nanoenxame' },
      { id: '_18_', keyboard: 'X', name: 'Confinamento' },
    ],
    id: 2,
    img: '/images/agents/Killjoy.webp',
    name: 'Killjoy',
  },
  {
    abilities: [
      { id: '_19_', keyboard: 'Q', name: 'FlechaDeChoque' },
      { id: '_10_', keyboard: 'E', name: 'FlechaRastreadora' },
      { id: '_11_', keyboard: 'C', name: 'DroneCoruka' },
      { id: '_12_', keyboard: 'X', name: 'FúriaDoCaçador' },
    ],
    id: 3,
    img: '/images/agents/Sova.webp',
    name: 'Sova',
  },
  {
    abilities: [
      { id: '_13_', keyboard: 'Q', name: 'NuvemVenenosa' },
      { id: '_14_', keyboard: 'E', name: 'CortinaTóxica' },
      { id: '_15_', keyboard: 'C', name: 'VenenoDeCobra' },
      { id: '_16_', keyboard: 'X', name: 'PoçoPeçonhento' },
    ],
    id: 4,
    img: '/images/agents/Viper.webp',
    name: 'Viper',
  },
  {
    abilities: [
      { id: '_17_', keyboard: 'Q', name: 'OrdeDeLentidão' },
      { id: '_18_', keyboard: 'E', name: 'OrbeCurativo' },
      { id: '_19_', keyboard: 'C', name: 'OrbeDeBarreira' },
      { id: '_20_', keyboard: 'X', name: 'Ressureição' },
    ],
    id: 5,
    img: '/images/agents/Sage.webp',
    name: 'Sage',
  },
  {
    abilities: [
      { id: '_21_', keyboard: 'Q', name: 'PulsoNova' },
      { id: '_22_', keyboard: 'E', name: 'Nebulosa' },
      { id: '_23_', keyboard: 'C', name: 'PoçoGravitacional' },
      { id: '_24_', keyboard: 'X', name: 'DivisaCósmica' },
    ],
    id: 6,
    img: '/images/agents/Astra.webp',
    name: 'Astra',
  },
  {
    abilities: [
      { id: '_25_', keyboard: 'Q', name: 'PredadorExplosivo' },
      { id: '_26_', keyboard: 'E', name: 'LuzDesbravadora' },
      { id: '_27_', keyboard: 'C', name: 'Reflorescer' },
      { id: '_28_', keyboard: 'X', name: 'Rastreadores' },
    ],
    id: 7,
    img: '/images/agents/Skye.webp',
    name: 'Skye',
  },
  {
    abilities: [
      { id: '_29_', keyboard: 'Q', name: 'Devorar' },
      { id: '_30_', keyboard: 'E', name: 'Dispensar' },
      { id: '_31_', keyboard: 'C', name: 'OlharVoraz' },
      { id: '_32_', keyboard: 'X', name: 'Imperatriz' },
    ],
    id: 8,
    img: '/images/agents/Reyna.webp',
    name: 'Reyna',
  },
  {
    abilities: [
      { id: '_33_', keyboard: 'Q', name: 'PontoCego' },
      { id: '_34_', keyboard: 'E', name: 'PassagemDimensional' },
      { id: '_35_', keyboard: 'C', name: 'Falcatrua' },
      { id: '_36_', keyboard: 'X', name: 'EspionagemDimensional' },
    ],
    id: 9,
    img: '/images/agents/Yoru.webp',
    name: 'Yoru',
  },
  {
    abilities: [
      { id: '_37_', keyboard: 'Q', name: 'CorrenteAscendente' },
      { id: '_38_', keyboard: 'E', name: 'BrisaDeImpulso' },
      { id: '_39_', keyboard: 'C', name: 'ErupçãoDasBrumas' },
      { id: '_40_', keyboard: 'X', name: 'TormentaDeAço' },
    ],
    id: 10,
    img: '/images/agents/Jett.webp',
    name: 'Jett',
  },
  {
    abilities: [
      { id: '_41_', keyboard: 'Q', name: 'CargaDeExplosivos' },
      { id: '_42_', keyboard: 'E', name: 'CartuchosDeTintaGranada' },
      { id: '_43_', keyboard: 'C', name: 'Bumba' },
      { id: '_44_', keyboard: 'X', name: 'EstragaPrazeres' },
    ],
    id: 11,
    img: '/images/agents/Raze.webp',
    name: 'Raze',
  },
  {
    abilities: [
      { id: '_45_', keyboard: 'Q', name: 'BolaCurva' },
      { id: '_46_', keyboard: 'E', name: 'MãosQuentes' },
      { id: '_47_', keyboard: 'C', name: 'Labareda' },
      { id: '_48_', keyboard: 'X', name: 'Renascimento' },
    ],
    id: 12,
    img: '/images/agents/Phoenix.webp',
    name: 'Phoenix',
  },
  {
    abilities: [
      { id: '_49_', keyboard: 'Q', name: 'Clarão' },
      { id: '_50_', keyboard: 'E', name: 'PontoZeroSpot' },
      { id: '_51_', keyboard: 'C', name: 'Fragmento' },
      { id: '_52_', keyboard: 'X', name: 'Anular' },
    ],
    id: 13,
    img: '/images/agents/Kay0.webp',
    name: 'Kay0',
  },
  {
    abilities: [
      { id: '_53_', keyboard: 'Q', name: 'EstopimBang' },
      { id: '_54_', keyboard: 'E', name: 'FalhaTectônica' },
      { id: '_55_', keyboard: 'C', name: 'PósChoque' },
      { id: '_56_', keyboard: 'X', name: 'OndaTrovejante' },
    ],
    id: 14,
    img: '/images/agents/Breach.webp',
    name: 'Breach',
  },
  {
    abilities: [
      { id: '_57_', keyboard: 'Q', name: 'Paranoia' },
      { id: '_58_', keyboard: 'E', name: 'MantoSombrio' },
      { id: '_59_', keyboard: 'C', name: 'PassosTenebrosos' },
      { id: '_60_', keyboard: 'X', name: 'SaltoDasSombras' },
    ],
    id: 15,
    img: '/images/agents/Omen.webp',
    name: 'Omen',
  },
  {
    abilities: [
      { id: '_61_', keyboard: 'Q', name: 'Incendiário' },
      { id: '_62_', keyboard: 'E', name: 'FumaçaCeleste' },
      { id: '_63_', keyboard: 'C', name: 'SinalizadorEstimulante' },
      { id: '_64_', keyboard: 'X', name: 'AtaqueOrbital' },
    ],
    id: 16,
    img: '/images/agents/Brimstone.webp',
    name: 'Brimstone',
  },
  {
    abilities: [
      { id: '_65_', keyboard: 'Q', name: 'Sheriff' },
      { id: '_66_', keyboard: 'E', name: 'Teleporte' },
      { id: '_67_', keyboard: 'C', name: 'Armadilha' },
      { id: '_68_', keyboard: 'X', name: 'Operator' },
    ],
    id: 17,
    img: '/images/agents/Chamber.webp',
    name: 'Chamber',
  },
];

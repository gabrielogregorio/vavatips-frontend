export const agents = (): agentInterface[] => {
  return [
    {
      id: 1,
      name: 'Cypher',
      img: '/images/agents/Cypher.webp',
      habilits: [
        { keyboard: 'Q', name: 'JaulaCibernética'},
        { keyboard: 'E', name: 'CâmeraDeVigilância'},
        { keyboard: 'C', name: 'FioArmadilha'},
        { keyboard: 'X', name: 'AssaltoNeural'},
      ]
    },
    {
      id: 2,
      name: 'Killjoy',
      img: '/images/agents/Killjoy.webp',
      habilits: [
        { keyboard: 'Q', name: 'RobôDeAlarme'},
        { keyboard: 'E', name: 'Torreta'},
        { keyboard: 'C', name: 'Nanoenxame'},
        { keyboard: 'X', name: 'Confinamento'},
      ]
    },
    {
      id: 3,
      name: 'Sova',
      img: '/images/agents/Sova.webp',
      habilits: [
        { keyboard: 'Q', name: 'FlechaDeChoque'},
        { keyboard: 'E', name: 'FlechaRastreadora'},
        { keyboard: 'C', name: 'DroneCoruka'},
        { keyboard: 'X', name: 'FúriaDoCaçador'},
      ]
    },
    {
      id: 4,
      name: 'Viper',
      img: '/images/agents/Viper.webp',
      habilits: [
        { keyboard: 'Q', name: 'NuvemVenenosa'},
        { keyboard: 'E', name: 'CortinaTóxica'},
        { keyboard: 'C', name: 'VenenoDeCobra'},
        { keyboard: 'X', name: 'PoçoPeçonhento'},
      ]
    },
    {
      id: 5,
      name: 'Sage',
      img: '/images/agents/Sage.webp',
      habilits: [
        { keyboard: 'Q', name: 'OrdeDeLentidão'},
        { keyboard: 'E', name: 'OrbeCurativo'},
        { keyboard: 'C', name: 'OrbeDeBarreira'},
        { keyboard: 'X', name: 'Ressureição'},
      ]
    },
    {
      id: 6,
      name: 'Astra',
      img: '/images/agents/Astra.webp',
      habilits: [
        { keyboard: 'Q', name: 'PulsoNova'},
        { keyboard: 'E', name: 'Nebulosa'},
        { keyboard: 'C', name: 'PoçoGravitacional'},
        { keyboard: 'X', name: 'DivisaCósmica'},
      ]
    },
    {
      id: 7,
      name: 'Skye',
      img: '/images/agents/Skye.webp',
      habilits: [
        { keyboard: 'Q', name: 'PredadorExplosivo'},
        { keyboard: 'E', name: 'LuzDesbravadora'},
        { keyboard: 'C', name: 'Reflorescer'},
        { keyboard: 'X', name: 'Rastreadores'},
      ]
    },
    {
      id: 8,
      name: 'Reyna',
      img: '/images/agents/Reyna.webp',
      habilits: [
        { keyboard: 'Q', name: 'Devorar'},
        { keyboard: 'E', name: 'Dispensar'},
        { keyboard: 'C', name: 'OlharVoraz'},
        { keyboard: 'X', name: 'Imperatriz'},
      ]
    },
    {
      id: 9,
      name: 'Yoru',
      img: '/images/agents/Yoru.webp',
      habilits: [
        { keyboard: 'Q', name: 'PontoCego'},
        { keyboard: 'E', name: 'PassagemDimensional'},
        { keyboard: 'C', name: 'Falcatrua'},
        { keyboard: 'X', name: 'EspionagemDimensional'},
      ]
    },
    {
      id: 10,
      name: 'Jett',
      img: '/images/agents/Jett.webp',
      habilits: [
        { keyboard: 'Q', name: 'CorrenteAscendente'},
        { keyboard: 'E', name: 'BrisaDeImpulso'},
        { keyboard: 'C', name: 'ErupçãoDasBrumas'},
        { keyboard: 'X', name: 'TormentaDeAço'},
      ]
    },
    {
      id: 11,
      name: 'Raze',
      img: '/images/agents/Raze.webp',
      habilits: [
        { keyboard: 'Q', name: 'CargaDeExplosivos'},
        { keyboard: 'E', name: 'CartuchosDeTintaGranada'},
        { keyboard: 'C', name: 'Bumba'},
        { keyboard: 'X', name: 'EstragaPrazeres'},
      ]
    },
    {
      id: 12,
      name: 'Phoenix',
      img: '/images/agents/Phoenix.webp',
      habilits: [
        { keyboard: 'Q', name: 'BolaCurva'},
        { keyboard: 'E', name: 'MãosQuentes'},
        { keyboard: 'C', name: 'Labareda'},
        { keyboard: 'X', name: 'Renascimento'},
      ]
    },
    {
      id: 13,
      name: 'Kay/0',
      img: '/images/agents/Kay0.webp',
      habilits: [
        { keyboard: 'Q', name: 'Clarão'},
        { keyboard: 'E', name: 'PontoZeroSpot'},
        { keyboard: 'C', name: 'Fragmento'},
        { keyboard: 'X', name: 'Anular'},
      ]
    },
    {
      id: 14,
      name: 'Breach',
      img: '/images/agents/Breach.webp',
      habilits: [
        { keyboard: 'Q', name: 'EstopimBang'},
        { keyboard: 'E', name: 'FalhaTectônica'},
        { keyboard: 'C', name: 'PósChoque'},
        { keyboard: 'X', name: 'OndaTrovejante'},
      ]
    },
    {
      id: 15,
      name: 'Omen',
      img: '/images/agents/Omen.webp',
      habilits: [
        { keyboard: 'Q', name: 'Paranoia'},
        { keyboard: 'E', name: 'MantoSombrio'},
        { keyboard: 'C', name: 'PassosTenebrosos'},
        { keyboard: 'X', name: 'SaltoDasSombras'},
      ]
    },
    {
      id: 16,
      name: 'Brimstone',
      img: '/images/agents/Brimstone.webp',
      habilits: [
        { keyboard: 'Q', name: 'Incendiário'},
        { keyboard: 'E', name: 'FumaçaCeleste'},
        { keyboard: 'C', name: 'SinalizadorEstimulante'},
        { keyboard: 'X', name: 'AtaqueOrbital'},
      ]
    }
  ]
}

export const maps = (): mapInterface[] => {
  return [
    {
      id: 1,
      name: 'Ascent',
      img: '/images/maps/Ascent.webp',
      mapPosition: [ 'A', 'B', 'BaseAtacante', 'BaseDefensora', 'Meio', 'Outra' ]
    },
    {
      id: 2,
      name: 'Bind',
      img: '/images/maps/Bind.webp',
      mapPosition: [ 'A', 'B', 'BaseAtacante', 'BaseDefensora', 'Meio', 'Outra' ]
    },
    {
      id: 3,
      name: 'Haven',
      img: '/images/maps/Haven.webp',
      mapPosition: [ 'A', 'B', 'C', 'BaseAtacante', 'BaseDefensora', 'Meio', 'Outra' ]
    },
    {
      id: 4,
      name: 'Split',
      img: '/images/maps/Split.webp',
      mapPosition: [ 'A', 'B', 'BaseAtacante', 'BaseDefensora', 'Meio', 'Outra' ]
    },
    {
      id: 5,
      name: 'Breeze',
      img: '/images/maps/Breeze.webp',
      mapPosition: [ 'A', 'B', 'BaseAtacante', 'BaseDefensora', 'Meio', 'Outra' ]
    },
    {
      id: 6,
      name: 'Fracture',
      img: '/images/maps/Fracture.webp',
      mapPosition: [ 'A', 'B', 'BaseAtacante', 'BaseDefensora', 'Meio', 'Outra' ]
    },
    {
      id: 7,
      name: 'Icebox',
      img: '/images/maps/Icebox.webp',
      mapPosition: [ 'A', 'B', 'BaseAtacante', 'BaseDefensora', 'Meio', 'Outra' ]
    },
  ]
}

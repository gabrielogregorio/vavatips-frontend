export const agents = (): agentInterface[] => {
  return [
    {
      id: 1,
      name: 'Phoenix',
      img: '/images/agents/Phoenix.png',
      habilits: [
        { keyboard: 'Q', name: 'BolaCurva'},
        { keyboard: 'E', name: 'MãosQuentes'},
        { keyboard: 'C', name: 'Labareda'},
        { keyboard: 'X', name: 'Renascimento'},
      ]
    },
    {
      id: 2,
      name: 'Sage',
      img: '/images/agents/Sage.png',
      habilits: [
        { keyboard: 'Q', name: 'OrdeDeLentidão'},
        { keyboard: 'E', name: 'OrbeCurativo'},
        { keyboard: 'C', name: 'OrbeDeBarreira'},
        { keyboard: 'X', name: 'Ressureição'},
      ]
    },
    {
      id: 3,
      name: 'Sova',
      img: '/images/agents/Sova.png',
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
      img: '/images/agents/Viper.png',
      habilits: [
        { keyboard: 'Q', name: 'NuvemVenenosa'},
        { keyboard: 'E', name: 'CortinaTóxica'},
        { keyboard: 'C', name: 'VenenoDeCobra'},
        { keyboard: 'X', name: 'PoçoPeçonhento'},
      ]
    },
    {
      id: 5,
      name: 'Cypher',
      img: '/images/agents/Cypher.png',
      habilits: [
        { keyboard: 'Q', name: 'JaulaCibernética'},
        { keyboard: 'E', name: 'CâmeraDeVigilância'},
        { keyboard: 'C', name: 'FioArmadilha'},
        { keyboard: 'X', name: 'AssaltoNeural'},
      ]
    },
    {
      id: 6,
      name: 'Reyna',
      img: '/images/agents/Reyna.png',
      habilits: [
        { keyboard: 'Q', name: 'Devorar'},
        { keyboard: 'E', name: 'Dispensar'},
        { keyboard: 'C', name: 'OlharVoraz'},
        { keyboard: 'X', name: 'Imperatriz'},
      ]
    },
    {
      id: 7,
      name: 'Killjoy',
      img: '/images/agents/Killjoy.png',
      habilits: [
        { keyboard: 'Q', name: 'RobôDeAlarme'},
        { keyboard: 'E', name: 'Torreta'},
        { keyboard: 'C', name: 'Nanoenxame'},
        { keyboard: 'X', name: 'Confinamento'},
      ]
    },
    {
      id: 8,
      name: 'Skye',
      img: '/images/agents/Skye.png',
      habilits: [
        { keyboard: 'Q', name: 'PredadorExplosivo'},
        { keyboard: 'E', name: 'LuzDesbravadora'},
        { keyboard: 'C', name: 'Reflorescer'},
        { keyboard: 'X', name: 'Rastreadores'},
      ]
    },
    {
      id: 9,
      name: 'Yoru',
      img: '/images/agents/Yoru.png',
      habilits: [
        { keyboard: 'Q', name: 'PontoCego'},
        { keyboard: 'E', name: 'PassagemDimensional'},
        { keyboard: 'C', name: 'Falcatrua'},
        { keyboard: 'X', name: 'EspionagemDimensional'},
      ]
    },
    {
      id: 10,
      name: 'Astra',
      img: '/images/agents/Astra.png',
      habilits: [
        { keyboard: 'Q', name: 'PulsoNova'},
        { keyboard: 'E', name: 'Nebulosa'},
        { keyboard: 'C', name: 'PoçoGravitacional'},
        { keyboard: 'X', name: 'DivisaCósmica'},
      ]
    },
    {
      id: 11,
      name: 'Kay/0',
      img: '/images/agents/Kay0.png',
      habilits: [
        { keyboard: 'Q', name: 'Clarão'},
        { keyboard: 'E', name: 'PontoZeroSpot'},
        { keyboard: 'C', name: 'Fragmento'},
        { keyboard: 'X', name: 'Anular'},
      ]
    },
    {
      id: 12,
      name: 'Jett',
      img: '/images/agents/Jett.png',
      habilits: [
        { keyboard: 'Q', name: 'CorrenteAscendente'},
        { keyboard: 'E', name: 'BrisaDeImpulso'},
        { keyboard: 'C', name: 'ErupçãoDasBrumas'},
        { keyboard: 'X', name: 'TormentaDeAço'},
      ]
    },
    {
      id: 13,
      name: 'Raze',
      img: '/images/agents/Raze.png',
      habilits: [
        { keyboard: 'Q', name: 'CargaDeExplosivos'},
        { keyboard: 'E', name: 'CartuchosDeTintaGranada'},
        { keyboard: 'C', name: 'Bumba'},
        { keyboard: 'X', name: 'EstragaPrazeres'},
      ]
    },
    {
      id: 14,
      name: 'Breach',
      img: '/images/agents/Breach.png',
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
      img: '/images/agents/Omen.png',
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
      img: '/images/agents/Brimstone.png',
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
      img: '/images/maps/Ascent.png',
      mapPosition: [ 'A', 'B', 'BaseAtacante', 'BaseDefensora', 'Meio', 'Outra' ]
    },
    {
      id: 2,
      name: 'Bind',
      img: '/images/maps/Bind.png',
      mapPosition: [ 'A', 'B', 'BaseAtacante', 'BaseDefensora', 'Meio', 'Outra' ]
    },
    {
      id: 3,
      name: 'Breeze',
      img: '/images/maps/Breeze.jpg',
      mapPosition: [ 'A', 'B', 'BaseAtacante', 'BaseDefensora', 'Meio', 'Outra' ]
    },
    {
      id: 4,
      name: 'Fracture',
      img: '/images/maps/Fracture.jpg',
      mapPosition: [ 'A', 'B', 'BaseAtacante', 'BaseDefensora', 'Meio', 'Outra' ]
    },
    {
      id: 5,
      name: 'Haven',
      img: '/images/maps/Haven.png',
      mapPosition: [ 'A', 'B', 'C', 'BaseAtacante', 'BaseDefensora', 'Meio', 'Outra' ]
    },
    {
      id: 6,
      name: 'Icebox',
      img: '/images/maps/Icebox.png',
      mapPosition: [ 'A', 'B', 'BaseAtacante', 'BaseDefensora', 'Meio', 'Outra' ]
    },
    {
      id: 7,
      name: 'Split',
      img: '/images/maps/Split.jpg',
      mapPosition: [ 'A', 'B', 'BaseAtacante', 'BaseDefensora', 'Meio', 'Outra' ]
    },
  ]
}

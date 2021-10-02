export const agents = (): agentInterface[] => {
  return [
    {
      id: 1,
      name: 'Phoenix',
      img: '/images/agents/Phoenix.png',
      habilits: []
    },
    {
      id: 2,
      name: 'Sage',
      img: '/images/agents/Sage.png',
      habilits: []
    },
    {
      id: 3,
      name: 'Sova',
      img: '/images/agents/Sova.png',
      habilits: [
        { keyboard: 'Q', name: 'FLECHA DE CHOQUE'},
        { keyboard: 'E', name: 'FLECHA RASTREADORA'},
        { keyboard: 'C', name: 'DRONE CORUJA'},
        { keyboard: 'X', name: 'FÚRIA DO CAÇADOR'},
      ]
    },
    {
      id: 4,
      name: 'Viper',
      img: '/images/agents/Viper.png',
      habilits: [
        { keyboard: 'Q', name: 'NUVEM VENENOSA'},
        { keyboard: 'E', name: 'CORTINA TÓXICA'},
        { keyboard: 'C', name: 'VENENO DE COBRA'},
        { keyboard: 'X', name: 'POÇO PEÇONHENTO'},
      ]
    },
    {
      id: 5,
      name: 'Cypher',
      img: '/images/agents/Cypher.png',
      habilits: []
    },
    {
      id: 6,
      name: 'Reyna',
      img: '/images/agents/Reyna.png',
      habilits: []
    },
    {
      id: 7,
      name: 'Killjoy',
      img: '/images/agents/Killjoy.png',
      habilits: []
    },
    {
      id: 8,
      name: 'Skye',
      img: '/images/agents/Skye.png',
      habilits: []
    },
    {
      id: 9,
      name: 'Yoru',
      img: '/images/agents/Yoru.png',
      habilits: []
    },
    {
      id: 10,
      name: 'Astra',
      img: '/images/agents/Astra.png',
      habilits: []
    },
    {
      id: 11,
      name: 'Kay/0',
      img: '/images/agents/Kay0.png',
      habilits: []
    },
    {
      id: 12,
      name: 'Jett',
      img: '/images/agents/Jett.png',
      habilits: []
    },
    {
      id: 13,
      name: 'Raze',
      img: '/images/agents/Raze.png',
      habilits: []
    },
    {
      id: 14,
      name: 'Breach',
      img: '/images/agents/Breach.png',
      habilits: []
    },
    {
      id: 15,
      name: 'Omen',
      img: '/images/agents/Omen.png',
      habilits: []
    },
    {
      id: 16,
      name: 'Brimstone',
      img: '/images/agents/Brimstone.png',
      habilits: []
    }
  ]
}

export const maps = (): mapInterface[] => {
  return [
    {
      id: 1,
      name: 'Ascent',
      img: '/images/maps/Ascent.png'
    },
    {
      id: 2,
      name: 'Bind',
      img: '/images/maps/Bind.png'
    },
    {
      id: 3,
      name: 'Breeze',
      img: '/images/maps/Breeze.jpg'
    },
    {
      id: 4,
      name: 'Fracture',
      img: '/images/maps/Fracture.jpg'
    },
    {
      id: 5,
      name: 'Haven',
      img: '/images/maps/Haven.png'
    },
    {
      id: 6,
      name: 'Icebox',
      img: '/images/maps/Icebox.png'
    },
    {
      id: 7,
      name: 'Split',
      img: '/images/maps/Split.jpg'
    },
  ]
}

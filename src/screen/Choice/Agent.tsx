import React from "react";
import { Link } from "react-router-dom";
import './cards.css'
import { useLocation } from 'react-router-dom'
import query from "query-string";
import { Navbar } from '../../components/NavbarTop/NavbarTop'

interface agentInterface {
  id: number,
  name: string,
  img: string,
}

export const AgentChoiceComponent = () => {
  let item = useLocation()
  let mapSelected = query.parse(item?.search)

  let agents: agentInterface[] = [
    {
      id: 1,
      name: 'Phoenix',
      img: '/images/agents/Phoenix.png'
    },
    {
      id: 2,
      name: 'Yoru',
      img: '/images/agents/Yoru.png'
    },
    {
      id: 3,
      name: 'Sova',
      img: '/images/agents/Sova.png'
    },
    {
      id: 4,
      name: 'Skye',
      img: '/images/agents/skye.png'
    },
    {
      id: 5,
      name: 'Raze',
      img: '/images/agents/Raze.png'
    },
    {
      id: 6,
      name: 'Cypher',
      img: '/images/agents/Cypher.png'
    },
    {
      id: 7,
      name: 'Sova',
      img: '/images/agents/Sova.png'
    },
    {
      id: 8,
      name: 'Skye',
      img: '/images/agents/skye.png'
    },
    {
      id: 9,
      name: 'Raze',
      img: '/images/agents/Raze.png'
    },
    {
      id: 10,
      name: 'Cypher',
      img: '/images/agents/Cypher.png'
    },
  ]

  function renderAgent() {
    return agents.map(agent => (
      <Link to={`/Posts?map=${mapSelected.map}&agent=${agent.name}`} className="gridItem" key={agent.id}>
        <img src={agent.img} alt={agent.name} />
        <p>{agent.name}</p>
      </Link>
    ))
  }

  return (
    <div className="container">
      <Navbar />
      <h1>Escolha um Agente</h1>
      <div>
        {renderAgent()}
      </div>
    </div>
  )
}

import React from "react";
import { Link } from "react-router-dom";
import './cards.css'
import { useLocation } from 'react-router-dom'
import query from "query-string";
import { Navbar } from '../../components/NavbarTop/NavbarTop'
import { agents } from '../../data/data-valorant'

export const AgentChoiceComponent = () => {
  let item = useLocation()
  let mapSelected = query.parse(item?.search)

  function renderAgent() {
    return agents().map(agent => (
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

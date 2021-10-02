import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom'
import query from "query-string";
import { agents } from '../../data/data-valorant'
import { NavbarComponentPublic, navbarEnumPublic } from "../../components/navbar_public/navbar";


export const AgentScreen = () => {
  let item = useLocation()
  let mapSelected = query.parse(item?.search)

  function renderAgent() {
    return agents().map(agent => (
      <Link to={`/Posts?map=${mapSelected.map}&agent=${agent.name}`} className="grid" key={agent.id}>
        <img src={agent.img} alt={agent.name} />
        <p>{agent.name}</p>
      </Link>
    ))
  }

  return (
    <div className="container">
      <div>
      <NavbarComponentPublic selected={navbarEnumPublic.Inicio} />

        <h1>Escolha um Agente</h1>
        <div>
          {renderAgent()}
        </div>
      </div>
    </div>
  )
}

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom'
import query from "query-string";
import { agents } from '../../data/data-valorant'
import { NavbarComponentPublic, navbarEnumPublic } from "../../components/navbar_public/navbar";
import api from "../../services/api";


export const AgentScreen = () => {
  let item = useLocation()
  let mapSelected = query.parse(item?.search)
  const [ agentsApi, setAgentsApi ] = useState<string[]>([])


  useEffect(() => {
    api.get(`/agents/${mapSelected.map}`).then(res => {
      setAgentsApi(res.data.agents)
    })
  }, [])


  function renderAgent() {
    if (agentsApi.length === 0) {
      return null
    }

    return agents().map(agent => {
      return agentsApi.includes(agent.name) ? (
        <Link to={`/Posts?map=${mapSelected.map}&agent=${agent.name}`} className="grid" key={agent.id}>
          <img src={agent.img} alt={agent.name} />
          <p>{agent.name}</p>
        </Link>
      ) : null
    })
  }

  return (
    <div className="container">
      <div>
      <NavbarComponentPublic selected={navbarEnumPublic.Inicio} />

        <h1>Escolha um Agente</h1>
        <div className="gridFull">
          {renderAgent()}
        </div>
      </div>
    </div>
  )
}

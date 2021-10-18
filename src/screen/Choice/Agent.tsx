import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom'
import query from "query-string";
import { agents } from '../../data/data-valorant'
import { NavbarComponentPublic, navbarEnumPublic } from "../../components/Navbar_public";
import api from "../../services/api";
import { LoaderComponent } from "../../components/Loader";
import { FooterComponent } from "../../components/Footer";
import { BreadcrumbComponent } from "../../components/Breadcrumb";
import { Container } from '../../components/Container'
import { Subcontainer } from '../../components/Subcontainer'
import { H1 } from "../../components/H1";
import { ErrorMsg } from "../../components/ErrorMsg";
import { Img } from "../../components/Img";

let breadcrumbs = [
  { url: '/', text: 'inicio'},
  { url: '/Maps', text: 'mapas'},
  { url: '/Maps', text: 'agentes'},
]


export const AgentScreen = () => {
  let item = useLocation()
  let mapSelected = query.parse(item?.search)
  const [ agentsApi, setAgentsApi ] = useState<string[]>([])
  const [ activeLoader, setActiveLoader ] = useState<boolean>(true)
  const [ errorMsg, setErrorMsg ] = useState<string>('')

  useEffect(() => {
    loadAgents()
  }, [mapSelected.map])

  async function loadAgents() {
    console.log('request to agent')
    const agentsResponse = api.get(`/agents/${mapSelected.map}`)

    try {
      const [ agents ] = await Promise.all([ agentsResponse ])
      const agentsJson = agents.data.agents
      setAgentsApi(agentsJson)
      setActiveLoader(false)
    } catch(error) {
      setErrorMsg('Erro desconhecido no servidor')
      setActiveLoader(false)
    }
  }

  function renderAgent() {
    if (agentsApi.length === 0) {
      return null
    }

    return agents().map(agent => {
      return agentsApi.includes(agent.name) ? (
        <Link to={`/Posts?map=${mapSelected.map}&agent=${agent.name}`} className="grid" key={agent.id}>
          <Img src={agent.img} alt={agent.name} />
          <p>{agent.name}</p>
        </Link>
      ) : null
    })
  }

  return (
    <Container>
      <NavbarComponentPublic selected={navbarEnumPublic.Mistic} />
      <BreadcrumbComponent breadcrumbs={breadcrumbs}/>

      <Subcontainer>
        <H1 title="Escolha um Agente" />
        <LoaderComponent active={activeLoader} />
        <ErrorMsg msg={errorMsg} />
        <div className="gridFull">
          {renderAgent()}
        </div>
      </Subcontainer>
      <FooterComponent color="primary" />
    </Container>
  )
}

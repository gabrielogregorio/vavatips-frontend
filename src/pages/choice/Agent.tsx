import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom'
import query from "query-string";
import { agents } from '../../core/data/data-valorant'
import { NavbarComponentPublic, navbarEnumPublic } from "../../components/layout/navbar_public";
import api from "../../core/services/api";
import { LoaderComponent } from "../../components/base/loader";
import { FooterComponent } from "../../components/layout/footer";
import { BreadcrumbComponent } from "../../components/widgets/breadcrumb";
import { ErrorMsg } from "../../components/base/errorMsg";
import { Img } from "../../components/base/img";
import { LINKS } from '../../core/data/links'

const breadcrumbs = [ LINKS.Home, LINKS.Maps, LINKS.Agents]

export const AgentScreen = () => {
  const item = useLocation()
  const mapSelected = query.parse(item?.search)
  const [ agentsApi, setAgentsApi ] = useState<string[]>([])
  const [ activeLoader, setActiveLoader ] = useState<boolean>(true)
  const [ errorMsg, setErrorMsg ] = useState<string>('')

  useEffect(() => {
    api.get(`/agents/${mapSelected.map}`).then(agents => {
      const agentsJson = agents.data.agents
      setAgentsApi(agentsJson)
      setActiveLoader(false)
    }).catch(() => {
      setErrorMsg('Erro desconhecido no servidor')
      setActiveLoader(false)
    })
  }, [mapSelected.map])

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
    <div className="container">
      <NavbarComponentPublic selected={navbarEnumPublic.Mistic} />
      <BreadcrumbComponent breadcrumbs={breadcrumbs}/>

      <div className="subcontainer">
        <h1>Escolha um Agente</h1>
        <LoaderComponent active={activeLoader} />
        {activeLoader ? <p>Buscando Agentes...</p> : ''}
        <ErrorMsg msg={errorMsg} />
        <div className="gridFull">
          {renderAgent()}
        </div>
      </div>
      <FooterComponent color="primary" />
    </div>
  )
}

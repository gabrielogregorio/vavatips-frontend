import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { agents } from '../core/data/data-valorant';
import {
  NavbarComponentPublic,
  navbarEnumPublic,
} from '../components/layout/navbar_public';
import { LoaderComponent } from '../components/base/loader';
import { FooterComponent } from '../components/layout/footer';
import { BreadcrumbComponent } from '../components/widgets/breadcrumb';
import { ErrorMsg } from '../components/base/errorMsg';
import { Img } from '../components/base/img';
import { LINKS } from '../core/data/links';
import { useAgents } from '../core/hooks/useAgents';
import { Title } from '../components/base/title';

const breadcrumbs = [LINKS.Home, LINKS.Maps, LINKS.Agents];

export const AgentScreen = () => {
  const item = useLocation();

  const { mapSelected, agentsApi, activeLoader, errorMsg } = useAgents(item);

  function renderAgent() {
    if (agentsApi.length === 0) {
      return null;
    }
    return agents().map((agent) => {
      return agentsApi.includes(agent.name) ? (
        <Link
          to={`/Posts?map=${mapSelected.map}&agent=${agent.name}`}
          className="grid"
          key={agent.id}>
          <Img src={agent.img} alt={agent.name} />
          <p>{agent.name}</p>
        </Link>
      ) : null;
    });
  }

  return (
    <div className="container">
      <NavbarComponentPublic selected={navbarEnumPublic.Mistic} />
      <BreadcrumbComponent breadcrumbs={breadcrumbs} />

      <div className="subcontainer">
        <Title>Escolha um Agente</Title>
        <LoaderComponent active={activeLoader} />
        {activeLoader ? <p>Buscando Agentes...</p> : ''}
        <ErrorMsg msg={errorMsg} />
        <div className="gridFull">{renderAgent()}</div>
      </div>
      <FooterComponent color="primary" />
    </div>
  );
};

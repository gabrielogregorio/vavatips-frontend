import { useRouter } from 'next/router';
import Link from 'next/link';
import { agents } from '../core/data/data-valorant';
import NavbarComponentPublic from '../components/layout/navbar_public';
import LoaderComponent from '../components/base/loader';
import FooterComponent from '../components/layout/footer';
import BreadcrumbComponent from '../components/widgets/breadcrumb';
import ErrorMsg from '../components/base/errorMsg';
import useAgents from '../core/hooks/useAgents';
import Title from '../components/base/title';
import { LINKS } from '../core/data/links';
import { navbarEnumPublic } from '../interfaces/navbar';

const breadcrumbs = [LINKS.inicio, LINKS.Maps, LINKS.Agents];

export default function AgentScreen() {
  const item = useRouter();

  const { mapSelected, agentsApi, activeLoader, errorMsg } = useAgents(item);

  function renderAgent() {
    if (agentsApi.length === 0) {
      return null;
    }
    return agents().map((agent) =>
      agentsApi.includes(agent.name) ? (
        <Link href={`/posts?map=${mapSelected.map}&agent=${agent.name}`} key={agent.id}>
          <a className="grid">
            <img src={agent.img} alt={agent.name} />
            <p>{agent.name}</p>
          </a>
        </Link>
      ) : null,
    );
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
}

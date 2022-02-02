import { useRouter } from 'next/router';
import Link from 'next/link';
import { agents } from '@/data/data-valorant';
import NavbarComponentPublic from '@/layout/navbar_public';
import LoaderComponent from '@/base/loader';
import FooterComponent from '@/layout/footer';
import BreadcrumbComponent from '@/widgets/breadcrumb';
import ErrorMsg from '@/base/errorMsg';
import useAgents from '@/hooks/useAgents';
import Title from '@/base/title';
import LINKS from '@/data/links';
import { navbarEnumPublic } from '@/interfaces/navbar';
import LayoutComponent from '../components/layout/layout';

const breadcrumbs = [LINKS.inicio, LINKS.Maps, LINKS.Agents];

export default function AgentScreen() {
  const item = useRouter();

  const { mapSelected, agentsApi, isLoading, error } = useAgents(item);

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
    <LayoutComponent>
      <div className="container">
        <NavbarComponentPublic selected={navbarEnumPublic.Mistic} />
        <BreadcrumbComponent breadcrumbs={breadcrumbs} />

        <div className="sub__container">
          <Title>Escolha um Agente</Title>
          <LoaderComponent active={isLoading} />
          {isLoading ? <p>Buscando Agentes...</p> : ''}
          <ErrorMsg msg={error} />
          <div className="gridFull">{renderAgent()}</div>
        </div>
        <FooterComponent />
      </div>
    </LayoutComponent>
  );
}

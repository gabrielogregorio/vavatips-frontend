import { useRouter } from 'next/router';
import { agents } from '@/data/data-valorant';
import LoaderComponent from '@/base/loader';
import FooterComponent from '@/layout/footer';
import BreadcrumbComponent from '@/widgets/breadcrumb';
import ErrorMsg from '@/base/errorMsg';
import useAgents from '@/hooks/useAgents';
import Title from '@/base/title';
import LINKS from '@/data/links';
import LayoutComponent from '@/layout/layout';
import navbarEnum from '@/interfaces/navbar';
import { modelNavbarPublic } from '@/schemas/navbar';
import NavbarComponent from '@/layout/navbar';
import ImageCard from '@/widgets/imageCard';
import SubContainer from '@/base/subContainer';

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
        <div key={agent.id} className="flex flex-col">
          <ImageCard
            href={`/posts?map=${mapSelected.map}&agent=${agent.name}`}
            srcImage={agent.img}
            heightImage="h-64"
            titleImage={agent.name}
          />
        </div>
      ) : null,
    );
  }

  return (
    <LayoutComponent>
      <NavbarComponent selected={navbarEnum.Mistic} modelNavbar={modelNavbarPublic} />
      <BreadcrumbComponent breadcrumbs={breadcrumbs} admin={false} />

      <SubContainer>
        <Title>Escolha um Agente</Title>
        <LoaderComponent active={isLoading} />
        <ErrorMsg msg={error} />
        <div className="grid grid-cols-2 gap-6 p-10 sm:grid-cols-4 w-full">{renderAgent()}</div>
      </SubContainer>
      <FooterComponent />
    </LayoutComponent>
  );
}

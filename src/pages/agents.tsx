import { useRouter } from 'next/router';
import { agents } from '@/data/data-valorant';
import { Loader } from '@/base/loader';
import { Footer } from '@/layout/footer';
import { Breadcrumb } from '@/widgets/breadcrumb';
import { ErrorMsg } from '@/base/errorMsg';
import { useAgents } from '@/hooks/useAgents';
import { Title } from '@/base/title';
import { LINKS } from '@/data/links';
import { Layout } from '@/layout/layout';
import { navbarEnum } from '@/enums/navbar';
import { modelNavbarPublic } from '@/schemas/navbar';
import { Navbar } from '@/layout/navbar';
import { ImageCard } from '@/widgets/imageCard';
import { SubContainer } from '@/base/subContainer';

const breadcrumbs = [LINKS.inicio, LINKS.Maps, LINKS.Agents];

const Agents = () => {
  const location = useRouter();

  const { mapSelected, agentsApi, isLoading, error } = useAgents(location);

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
    <Layout>
      <Navbar selected={navbarEnum.Mistic} modelNavbar={modelNavbarPublic} />
      <Breadcrumb breadcrumbs={breadcrumbs} />

      <SubContainer>
        <Title>Escolha um Agente</Title>
        <Loader active={isLoading} />
        <ErrorMsg msg={error} />
        <div className="grid grid-cols-2 gap-6 p-10 sm:grid-cols-4 w-full">{renderAgent()}</div>
      </SubContainer>
      <Footer />
    </Layout>
  );
};
export default Agents;

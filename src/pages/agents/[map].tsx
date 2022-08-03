import { useRouter } from 'next/router';
import { agents } from '@/data/data-valorant';
import { Breadcrumb } from '@/widgets/breadcrumb';
import { Title } from '@/base/title';
import LINKS from '@/data/links.json';
import { Layout } from '@/layout/layout';
import { navbarEnum } from '@/enums/navbar';
import { modelNavbarPublic } from '@/schemas/navbar';
import { Navbar } from '@/layout/navbar';
import { ImageCard } from '@/widgets/imageCard';
import { SubContainer } from '@/base/subContainer';
import { Api } from '@/services/api';
import loadable from '@loadable/component';

const Footer = loadable(() => import(`@/layout/footer`));

const breadcrumbs = [LINKS.inicio, LINKS.Maps, LINKS.Agents];

export async function getStaticPaths() {
  const resp = await Api.get('/maps');
  const { maps } = await resp.data;

  return {
    paths: maps.map((map) => ({
      params: {
        map,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const response = await Api.get(`/agents/${params.map}`);
  const agentsData = await response.data;
  return {
    props: {
      agentsApi: agentsData.agents,
    },
  };
}

const Agents = ({ agentsApi }: { agentsApi: string[] }) => {
  const location = useRouter();

  function renderAgent() {
    const mapSelected = location?.query?.map;
    return agents().map((agent) =>
      agentsApi.includes(agent.name) ? (
        <div key={agent.id} className="flex flex-col">
          <ImageCard
            href={`/posts/${mapSelected}/${agent.name}`}
            srcImage={agent.img}
            heightImage="h-72 w-32"
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
        <div className="grid grid-cols-1 gap-6 p-10 sm:grid-cols-4 w-full">{renderAgent()}</div>
      </SubContainer>
      <Footer />
    </Layout>
  );
};
export default Agents;

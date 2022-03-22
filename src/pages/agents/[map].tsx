import { useRouter } from 'next/router';
import { agents } from '@/data/data-valorant';
import { Footer } from '@/layout/footer';
import { Breadcrumb } from '@/widgets/breadcrumb';
import { Title } from '@/base/title';
import LINKS from '@/data/links.json';
import { Layout } from '@/layout/layout';
import { navbarEnum } from '@/enums/navbar';
import { modelNavbarPublic } from '@/schemas/navbar';
import { Navbar } from '@/layout/navbar';
import { ImageCard } from '@/widgets/imageCard';
import { SubContainer } from '@/base/subContainer';

const breadcrumbs = [LINKS.inicio, LINKS.Maps, LINKS.Agents];

export async function getStaticPaths() {
  const resp = await fetch('https://backend-valorant.herokuapp.com/maps');
  const { maps } = await resp.json();

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
  const response = await fetch(`https://backend-valorant.herokuapp.com/agents/${params.map}`);
  const post = await response.json();
  return {
    props: {
      agentsApi: post.agents,
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
            href={`/posts?map=${mapSelected}&agent=${agent.name}`}
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

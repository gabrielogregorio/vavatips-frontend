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
import { Footer } from '@/layout/footer';
import { ReactElement } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';

const breadcrumbs = [LINKS.inicio, LINKS.Maps, LINKS.Agents];

export const getStaticPaths: GetStaticPaths = async () => {
  const resp = await Api.get('/maps');
  const { maps } = await resp.data;

  return {
    fallback: false,
    paths: maps.map((map) => ({
      params: {
        map,
      },
    })),
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const response = await Api.get(`/agents/${params.map}`);
  const agentsData = await response.data;
  return {
    props: {
      agentsApi: agentsData.agents,
    },
  };
};

const Agents = ({ agentsApi }: { agentsApi: string[] }): ReactElement => {
  const location = useRouter();

  const renderAgent = (): ReactElement[] => {
    const mapSelected = location?.query?.map;
    return agents().map((agent) =>
      agentsApi.includes(agent.name) ? (
        <ImageCard
          width={587}
          height={900}
          key={agent.id}
          href={`/posts/${mapSelected}/${agent.name}`}
          srcImage={agent.img}
          heightImage="h-[18rem] w-[11.74rem]"
          titleImage={agent.name}
        />
      ) : null,
    );
  };

  return (
    <Layout>
      <Navbar selected={navbarEnum.Mistic} modelNavbar={modelNavbarPublic} />
      <Breadcrumb breadcrumbs={breadcrumbs} />

      <SubContainer>
        <Title>Escolha um Agente</Title>
        <div className="flex flex-wrap w-full">{renderAgent()}</div>
      </SubContainer>
      <Footer />
    </Layout>
  );
};
export default Agents;

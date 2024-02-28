import { Breadcrumb } from '@/widgets/breadcrumb';
import { maps } from '@/data/data-valorant-maps';
import LINKS from '@/data/links.json';
import { Title } from '@/base/title';
import { Layout } from '@/layout/layout';
import { Navbar } from '@/layout/navbar';
import { navbarEnum } from '@/enums/navbar';
import { ImageCard } from '@/widgets/imageCard';
import { SubContainer } from '@/base/subContainer';
import { modelNavbarPublic } from '@/schemas/navbar';
import { Api } from '@/services/api';
import { Footer } from '@/layout/footer';
import { ReactElement } from 'react';
import { GetStaticProps } from 'next';

const breadcrumbs = [LINKS.inicio, LINKS.Maps];

export const getStaticProps: GetStaticProps = async () => {
  const resp = await Api.get('/maps');
  const mapsApi = await resp.data;

  return {
    props: {
      mapsApi: mapsApi.maps,
    },
  };
};

const Index = ({ mapsApi }: { mapsApi: string[] }): ReactElement => {
  const renderMap = (): ReactElement[] =>
    maps().map((map) =>
      mapsApi.includes(map.name) ? (
        <div key={map.id} className="flex flex-col">
          <ImageCard
            width={1200}
            height={707}
            heightImage="h-64 sm:h-40"
            href={`/agents/${map.name}`}
            srcImage={map.img}
            titleImage={map.name}
          />
        </div>
      ) : null,
    );

  return (
    <Layout>
      <Navbar selected={navbarEnum.Inicio} modelNavbar={modelNavbarPublic} />
      <Breadcrumb breadcrumbs={breadcrumbs} />

      <SubContainer>
        <Title>Escolha um mapa ai parça </Title>

        <div className="grid grid-cols-1 gap-6 pl-1 pr-1 mb-2 sm:grid-cols-3 w-full">{renderMap()}</div>
      </SubContainer>

      <Footer />
    </Layout>
  );
};
export default Index;

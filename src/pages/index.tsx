import { Breadcrumb } from '@/widgets/breadcrumb';
import { Footer } from '@/layout/footer';
import { maps } from '@/data/data-valorant';
import LINKS from '@/data/links.json';
import { Title } from '@/base/title';
import { Layout } from '@/layout/layout';
import { Navbar } from '@/layout/navbar';
import { navbarEnum } from '@/enums/navbar';
import { ImageCard } from '@/widgets/imageCard';
import { SubContainer } from '@/base/subContainer';
import { modelNavbarPublic } from '@/schemas/navbar';

const breadcrumbs = [LINKS.inicio, LINKS.Maps];

const Index = ({ mapsApi }: { mapsApi: string[] }) => {
  function renderMap() {
    return maps().map((map) =>
      mapsApi.includes(map.name) ? (
        <div key={map.id} className="flex flex-col">
          <ImageCard heightImage="h-40" href={`/agents/${map.name}`} srcImage={map.img} titleImage={map.name} />
        </div>
      ) : null,
    );
  }

  return (
    <Layout>
      <Navbar selected={navbarEnum.Inicio} modelNavbar={modelNavbarPublic} />
      <Breadcrumb breadcrumbs={breadcrumbs} />

      <SubContainer>
        <Title>Escolha um mapa ai parça </Title>

        <div className="grid grid-cols-1 gap-6 pl-1 pr-1 mb-2 sm:grid-cols-4 w-full">{renderMap()}</div>
      </SubContainer>

      <Footer />
    </Layout>
  );
};
export default Index;

export async function getStaticProps() {
  const resp = await fetch('https://backend-valorant.herokuapp.com/maps');
  const mapsApi = await resp.json();

  return {
    props: {
      mapsApi: mapsApi.maps,
    },
  };
}

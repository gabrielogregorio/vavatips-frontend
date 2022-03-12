import { Breadcrumb } from '@/widgets/breadcrumb';
import { ErrorMsg } from '@/base/errorMsg';
import { Footer } from '@/layout/footer';
import { Loader } from '@/base/loader';
import { maps } from '@/data/data-valorant';
import LINKS from '@/data/links.json';
import { useMaps } from '@/hooks/useMaps';
import { Title } from '@/base/title';
import { Layout } from '@/layout/layout';
import { Navbar } from '@/layout/navbar';
import { navbarEnum } from '@/enums/navbar';
import { ImageCard } from '@/widgets/imageCard';
import { SubContainer } from '@/base/subContainer';
import { modelNavbarPublic } from '@/schemas/navbar';

const breadcrumbs = [LINKS.inicio, LINKS.Maps];

const Index = () => {
  const { mapsApi, isLoading, error } = useMaps();

  function renderMap() {
    if (mapsApi.length === 0) {
      return null;
    }

    return maps().map((map) =>
      mapsApi.includes(map.name) ? (
        <div key={map.id} className="flex flex-col">
          <ImageCard
            heightImage="h-40"
            href={`/agents?map=${map.name}`}
            srcImage={map.img}
            titleImage={map.name}
          />
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
        <ErrorMsg msg={error} />
        <Loader active={isLoading} />
        <div className="grid grid-cols-1 gap-6 pl-1 pr-1 mb-2 sm:grid-cols-4 w-full">
          {renderMap()}
        </div>
      </SubContainer>

      <Footer />
    </Layout>
  );
};
export default Index;

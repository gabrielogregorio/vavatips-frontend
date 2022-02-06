import BreadcrumbComponent from '@/widgets/breadcrumb';
import ErrorMsg from '@/base/errorMsg';
import FooterComponent from '@/layout/footer';
import LoaderComponent from '@/base/loader';
import { maps } from '@/data/data-valorant';
import LINKS from '@/data/links';
import useMaps from '@/hooks/useMaps';
import Title from '@/base/title';
import LayoutComponent from '@/layout/layout';
import NavbarComponent from '@/layout/navbar';
import navbarEnum from '@/interfaces/navbar';
import ImageCard from '@/widgets/imageCard';
import SubContainer from '@/base/subContainer';
import { modelNavbarPublic } from '@/schemas/navbar';

const breadcrumbs = [LINKS.inicio, LINKS.Maps];

export default function MapScreen() {
  const { mapsApi, isLoading, error } = useMaps();

  function renderMap() {
    if (mapsApi.length === 0) {
      return null;
    }

    return maps().map((map) =>
      mapsApi.includes(map.name) ? (
        <div key={map.id} className="flex flex-col">
          <ImageCard href={`/agents?map=${map.name}`} srcImage={map.img} titleImage={map.name} />
        </div>
      ) : null,
    );
  }

  return (
    <LayoutComponent>
      <NavbarComponent selected={navbarEnum.Inicio} modelNavbar={modelNavbarPublic} />
      <BreadcrumbComponent breadcrumbs={breadcrumbs} admin={false} />

      <SubContainer>
        <Title>Escolha um mapa ai parça </Title>
        <ErrorMsg msg={error} />
        <LoaderComponent active={isLoading} />
        <div className="grid grid-cols-4 gap-6 pl-1 pr-1 mb-2 ">{renderMap()}</div>
      </SubContainer>

      <FooterComponent />
    </LayoutComponent>
  );
}

import Link from 'next/link';
import BreadcrumbComponent from '@/widgets/breadcrumb';
import ErrorMsg from '@/base/errorMsg';
import FooterComponent from '@/layout/footer';
import LoaderComponent from '@/base/loader';
import NavbarComponentPublic from '@/layout/navbar_public';
import { maps } from '@/data/data-valorant';
import LINKS from '@/data/links';
import useMaps from '@/hooks/useMaps';
import Title from '@/base/title';
import { navbarEnumPublic } from '@/interfaces/navbar';
import LayoutComponent from '../components/layout/layout';

const breadcrumbs = [LINKS.inicio, LINKS.Maps];

export default function MapScreen() {
  const { mapsApi, isLoading, error } = useMaps();

  function renderMap() {
    if (mapsApi.length === 0) {
      return null;
    }

    return maps().map((map) =>
      mapsApi.includes(map.name) ? (
        <Link href={`/agents?map=${map.name}`} key={map.id}>
          <a className="grid">
            <img src={map.img} alt={map.name} />
            <p>{map.name}</p>
          </a>
        </Link>
      ) : null,
    );
  }

  return (
    <LayoutComponent>
      <div className="container">
        <NavbarComponentPublic selected={navbarEnumPublic.Inicio} />
        <BreadcrumbComponent breadcrumbs={breadcrumbs} />

        <div className="sub__container">
          <Title>Escolha um mapa ai parça </Title>
          <ErrorMsg msg={error} />
          {isLoading ? <p>Buscando Mapas...</p> : ''}
          <LoaderComponent active={isLoading} />
          <div className="gridFull">{renderMap()}</div>
        </div>
        <FooterComponent />
      </div>
    </LayoutComponent>
  );
}

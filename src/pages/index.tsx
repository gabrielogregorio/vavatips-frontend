import Link from 'next/link';
import BreadcrumbComponent from '@/widgets/breadcrumb';
import FooterComponent from '@/layout/footer';
import NavbarComponentPublic from '@/layout/navbar_public';
import { maps } from '@/data/data-valorant';
import LINKS from '@/data/links';
import Title from '@/base/title';
import { navbarEnumPublic } from '@/interfaces/navbar';
import api from '../core/services/api';

const breadcrumbs = [LINKS.inicio, LINKS.Maps];

export default function MapScreen({ mapsApi }: any) {
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
    <div className="container">
      <NavbarComponentPublic selected={navbarEnumPublic.Inicio} />
      <BreadcrumbComponent breadcrumbs={breadcrumbs} />

      <div className="sub__container">
        <Title>Escolha um mapa ai parça </Title>
        <div className="gridFull">{renderMap()}</div>
      </div>
      <FooterComponent color="primary" />
    </div>
  );
}

export async function getStaticProps() {
  const maps = await api.get('/maps');
  const mapsAAvailable = maps.data.maps;

  return {
    props: {
      mapsApi: mapsAAvailable,
    },
  };
}

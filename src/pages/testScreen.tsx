import { useLocation } from 'react-router-dom';
import {
  NavbarComponentPublic,
  navbarEnumPublic,
} from '../components/layout/navbar_public';
import { ModalOfSuggestion } from '../components/widgets/modalOfSuggestion';
import { ModalMessage } from '../components/widgets/modalMessage';
import { FooterComponent } from '../components/layout/footer';
import { BreadcrumbComponent } from '../components/widgets/breadcrumb';
import { PaginationComponent } from '../components/widgets/pagination';
import { ErrorMsg } from '../components/base/errorMsg';
import { ContainerPosts } from '../components/widgets/containerPosts';
import { LINKS } from '../core/data/links';
import { usePosts } from '../core/hooks/usePosts';
import { Title } from '../components/base/title';

const breadcrumbs = [LINKS.Home, LINKS.Tested];

export const TestScreen = () => {
  const location = useLocation();

  const { queryUrl, activeLoader, errorMsg, finishPage, posts } = usePosts(
    location,
    'tested',
  );

  return (
    <div className="container">
      <NavbarComponentPublic
        selected={navbarEnumPublic.Tested}
        agent={queryUrl.agent}
        map={queryUrl.map}
      />

      <BreadcrumbComponent breadcrumbs={breadcrumbs} />

      <div className="subcontainer">
        <ModalOfSuggestion title="fazer sugestão" />

        <ModalMessage />

        <Title>Posts Testados</Title>
        <ErrorMsg msg={errorMsg} />

        <ContainerPosts
          activeLoader={activeLoader}
          queryUrl={queryUrl}
          posts={posts}
        />

        <PaginationComponent
          urlBase="Tested"
          initial={1}
          finish={finishPage}
          selected={parseInt(queryUrl.page)}
          agent={queryUrl.agent}
          map={queryUrl.map}
        />
      </div>
      <FooterComponent color="primary" />
    </div>
  );
};

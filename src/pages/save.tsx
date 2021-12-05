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

const breadcrumbs = [LINKS.Home, LINKS.Save];

export const SaveScreen = () => {
  const location = useLocation();

  const { queryUrl, activeLoader, errorMsg, finishPage, posts } = usePosts(
    location,
    'save',
  );

  return (
    <div className="container">
      <NavbarComponentPublic
        selected={navbarEnumPublic.Save}
        agent={queryUrl.agent}
        map={queryUrl.map}
      />

      <BreadcrumbComponent breadcrumbs={breadcrumbs} />

      <div className="subcontainer">
        <ModalOfSuggestion title="fazer sugestão" />

        <ModalMessage />

        <h1>Posts Salvos</h1>
        <ErrorMsg msg={errorMsg} />

        <ContainerPosts
          activeLoader={activeLoader}
          queryUrl={queryUrl}
          posts={posts}
        />

        <PaginationComponent
          urlBase="Save"
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

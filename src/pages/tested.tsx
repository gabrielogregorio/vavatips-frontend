import { useRouter } from 'next/router';
import NavbarComponentPublic from '../components/layout/navbar_public';
import ModalOfSuggestion from '../components/widgets/modalOfSuggestion';
import ModalMessage from '../components/widgets/modalMessage';
import FooterComponent from '../components/layout/footer';
import BreadcrumbComponent from '../components/widgets/breadcrumb';
import PaginationComponent from '../components/widgets/pagination';
import ErrorMsg from '../components/base/errorMsg';
import ContainerPosts from '../components/widgets/containerPosts';
import { LINKS } from '../core/data/links';
import usePosts from '../core/hooks/usePosts';
import Title from '../components/base/title';
import { navbarEnumPublic } from '../interfaces/navbar';

const breadcrumbs = [LINKS.inicio, LINKS.Tested];

export default function TestScreen() {
  const location = useRouter();

  const { queryUrl, activeLoader, errorMsg, finishPage, posts } = usePosts(location, 'tested');
  const numberSelected = parseInt(queryUrl?.page || '1', 10);

  return (
    <div className="container">
      <NavbarComponentPublic selected={navbarEnumPublic.Tested} />

      <BreadcrumbComponent breadcrumbs={breadcrumbs} />

      <div className="subcontainer">
        <ModalOfSuggestion title="fazer sugestão" />

        <ModalMessage />

        <Title>Posts Testados</Title>
        <ErrorMsg msg={errorMsg} />

        <ContainerPosts activeLoader={activeLoader} queryUrl={queryUrl} posts={posts} />

        <PaginationComponent
          urlBase="tested"
          initial={1}
          finish={finishPage}
          selected={numberSelected}
          agent={queryUrl.agent}
          map={queryUrl.map}
        />
      </div>
      <FooterComponent color="primary" />
    </div>
  );
}

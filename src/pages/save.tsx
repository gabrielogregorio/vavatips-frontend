import { useRouter } from 'next/router';
import NavbarComponentPublic from '@/layout/navbar_public';
import ModalOfSuggestion from '@/widgets/modalOfSuggestion';
import ModalMessage from '@/widgets/modalMessage';
import FooterComponent from '@/layout/footer';
import BreadcrumbComponent from '@/widgets/breadcrumb';
import PaginationComponent from '@/widgets/pagination';
import ErrorMsg from '@/base/errorMsg';
import ContainerPosts from '@/widgets/containerPosts';
import { LINKS } from '@/data/links';
import usePosts from '@/hooks/usePosts';
import Title from '@/base/title';
import { navbarEnumPublic } from '@/interfaces/navbar';

const breadcrumbs = [LINKS.inicio, LINKS.Save];

export default function SaveScreen() {
  const location = useRouter();

  const { queryUrl, activeLoader, errorMsg, finishPage, posts } = usePosts(location, 'save');
  const numberSelected = parseInt(queryUrl?.page || '1', 10);

  return (
    <div className="container">
      <NavbarComponentPublic selected={navbarEnumPublic.Save} />

      <BreadcrumbComponent breadcrumbs={breadcrumbs} />

      <div className="subcontainer">
        <ModalOfSuggestion title="fazer sugestão" />

        <ModalMessage />

        <Title>Posts Salvos</Title>
        <ErrorMsg msg={errorMsg} />

        <ContainerPosts activeLoader={activeLoader} queryUrl={queryUrl} posts={posts} />

        <PaginationComponent
          urlBase="save"
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

import { useRouter } from 'next/router';
import NavbarComponentPublic from '@/layout/navbar_public';
import ModalOfSuggestion from '@/widgets/modalOfSuggestion';
import ModalMessage from '@/widgets/modalMessage';
import FooterComponent from '@/layout/footer';
import BreadcrumbComponent from '@/widgets/breadcrumb';
import PaginationComponent from '@/widgets/pagination';
import ErrorMsg from '@/base/errorMsg';
import ContainerPosts from '@/widgets/containerPosts';
import LINKS from '@/data/links';
import usePosts from '@/hooks/usePosts';
import Title from '@/base/title';
import { navbarEnumPublic } from '@/interfaces/navbar';

const breadcrumbs = [LINKS.inicio, LINKS.Maps, LINKS.Agents, LINKS.Posts];

export default function HomeScreen() {
  const location = useRouter();
  const { posts, activeLoader, errorMsg, finishPage, queryUrl } = usePosts(location, '');

  const numberSelected = parseInt(queryUrl?.page || '1', 10);

  return (
    <div className="container">
      <NavbarComponentPublic selected={navbarEnumPublic.Posts} />

      <BreadcrumbComponent breadcrumbs={breadcrumbs} />
      <div className="sub__container">
        <ModalOfSuggestion title="fazer sugestão" />

        <ModalMessage />

        <Title>As melhores dicas de Valorant</Title>
        <ErrorMsg msg={errorMsg} />

        <ContainerPosts activeLoader={activeLoader} queryUrl={queryUrl} posts={posts} />

        {activeLoader ? <p>Carregando posts...</p> : null}

        <PaginationComponent
          urlBase="Posts"
          initial={1}
          finish={finishPage}
          selected={numberSelected}
          map={queryUrl.map}
          agent={queryUrl.agent}
        />
      </div>

      <FooterComponent color="primary" />
    </div>
  );
}

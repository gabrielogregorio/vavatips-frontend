import { useRouter } from 'next/router';
import { ModalOfSuggestion } from '@/widgets/modalOfSuggestion';
import { ModalMessage } from '@/widgets/modalMessage';
import { Footer } from '@/layout/footer';
import { Breadcrumb } from '@/widgets/breadcrumb';
import { Pagination } from '@/widgets/pagination';
import { ErrorMsg } from '@/base/errorMsg';
import { usePosts } from '@/hooks/usePosts';
import { Title } from '@/base/title';
import { Navbar } from '@/layout/navbar';
import { Loader } from '@/base/loader';
import { SubContainer } from '@/base/subContainer';
import { navbarEnum } from '@/enums/navbar';
import { modelNavbarAdmin, modelNavbarPublic } from '@/schemas/navbar';
import { TagsFixFilters } from '@/widgets/tagsFixFilters';
import { Tags } from '@/widgets/tags';
import { Posts } from '@/widgets/postsItem';

type containerPosts = {
  breadcrumbs: { url: string; text: string }[];
  type: '' | 'save' | 'tested';
  typeSelected: navbarEnum;
  mode: 'public' | 'admin';
  title: string;
};

export const ContainerPosts = ({
  breadcrumbs,
  type,
  mode,
  typeSelected,
  title,
}: containerPosts) => {
  const location = useRouter();
  const { posts, isLoading, errorMsg, finishPage, queryUrl } = usePosts(location, type);
  const numberSelected = parseInt(queryUrl?.page || '1', 10);

  return (
    <>
      {mode === 'admin' ? (
        <Navbar selected={typeSelected} modelNavbar={modelNavbarAdmin} />
      ) : (
        <Navbar selected={typeSelected} modelNavbar={modelNavbarPublic} />
      )}

      <Breadcrumb breadcrumbs={breadcrumbs} />
      <SubContainer>
        <ModalOfSuggestion title="fazer sugestão" />

        <ModalMessage />

        <Title>{title}</Title>
        <ErrorMsg msg={errorMsg ? 'Erro desconhecido' : ''} />

        <div>
          <TagsFixFilters queryUrl={queryUrl} />
          <Tags />
          <Loader active={isLoading} />
          <Posts posts={posts} />
        </div>

        <Pagination
          urlBase={type === '' ? 'posts' : type}
          finish={finishPage}
          selected={numberSelected}
          map={queryUrl.map}
          agent={queryUrl.agent}
        />
      </SubContainer>

      <Footer />
    </>
  );
};

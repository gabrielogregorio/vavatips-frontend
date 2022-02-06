import { useRouter } from 'next/router';
import ModalOfSuggestion from '@/widgets/modalOfSuggestion';
import ModalMessage from '@/widgets/modalMessage';
import FooterComponent from '@/layout/footer';
import BreadcrumbComponent from '@/widgets/breadcrumb';
import PaginationComponent from '@/widgets/pagination';
import ErrorMsg from '@/base/errorMsg';
import usePosts from '@/hooks/usePosts';
import Title from '@/base/title';
import NavbarComponent from '@/layout/navbar';
import LoaderComponent from '@/base/loader';
import SubContainer from '@/base/subContainer';
import navbarEnum from '@/interfaces/navbar';
import { modelNavbarAdmin, modelNavbarPublic } from '@/schemas/navbar';
import TagsFixFilters from '@/widgets/tagsFixFilters';
import PostTags from '@/widgets/tags';
import Posts from '@/widgets/postsItem';

interface containerPosts {
  breadcrumbs: { url: string; text: string }[];
  type: '' | 'save' | 'tested';
  typeSelected: navbarEnum;
  mode: 'public' | 'admin';
  title: string;
}

export default function ContainerPosts({
  breadcrumbs,
  type,
  mode,
  typeSelected,
  title,
}: containerPosts) {
  const location = useRouter();
  const { posts, isLoading, errorMsg, finishPage, queryUrl } = usePosts(location, type);
  const numberSelected = parseInt(queryUrl?.page || '1', 10);

  return (
    <>
      {mode === 'admin' ? (
        <NavbarComponent selected={typeSelected} modelNavbar={modelNavbarAdmin} />
      ) : (
        <NavbarComponent selected={typeSelected} modelNavbar={modelNavbarPublic} />
      )}

      <BreadcrumbComponent breadcrumbs={breadcrumbs} admin={false} />
      <SubContainer>
        <ModalOfSuggestion title="fazer sugestão" />

        <ModalMessage />

        <Title>{title}</Title>
        <ErrorMsg msg={errorMsg} />

        <div>
          <TagsFixFilters queryUrl={queryUrl} />
          <PostTags />
          <LoaderComponent active={isLoading} />
          <Posts posts={posts} />
        </div>

        <PaginationComponent
          urlBase={type === '' ? 'posts' : type}
          initial={1}
          finish={finishPage}
          selected={numberSelected}
          map={queryUrl.map}
          agent={queryUrl.agent}
        />
      </SubContainer>

      <FooterComponent />
    </>
  );
}

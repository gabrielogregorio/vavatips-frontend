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
import TagsFixFilters from './tagsFixFilters';
import PostTags from './tags';
import Posts from './postsItem';
import navbarEnum from '../../interfaces/navbar';
import { modelNavbarAdmin, modelNavbarPublic } from '../../core/schemas/navbar';

interface containerPosts {
  breadcrumbs: { url: string; text: string }[];
  type: '' | 'save' | 'tested';
  typeSelected: navbarEnum;
  typeSelectedAdmin: navbarEnum;
  title: string;
}

export default function ContainerPosts({
  breadcrumbs,
  type,
  typeSelected,
  title,
  typeSelectedAdmin,
}: containerPosts) {
  const location = useRouter();

  const { posts, isLoading, errorMsg, finishPage, queryUrl } = usePosts(location, type);
  const numberSelected = parseInt(queryUrl?.page || '1', 10);

  return (
    <>
      {typeSelectedAdmin !== navbarEnum.None ? (
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

        <div className="containerPost">
          <TagsFixFilters queryUrl={queryUrl} />
          <PostTags />
          <LoaderComponent active={isLoading} />
          <Posts posts={posts} />
        </div>

        {isLoading ? <p>Carregando posts...</p> : null}

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

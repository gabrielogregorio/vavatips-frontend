import { useRouter } from 'next/router';
import NavbarComponentPublic from '@/layout/navbar_public';
import ModalOfSuggestion from '@/widgets/modalOfSuggestion';
import ModalMessage from '@/widgets/modalMessage';
import FooterComponent from '@/layout/footer';
import BreadcrumbComponent from '@/widgets/breadcrumb';
import PaginationComponent from '@/widgets/pagination';
import ErrorMsg from '@/base/errorMsg';
import usePosts from '@/hooks/usePosts';
import Title from '@/base/title';
import { navbarEnum, navbarEnumPublic } from '@/interfaces/navbar';
import NavbarComponent from '../layout/navbar';
import TagsFixFilters from './tagsFixFilters';
import PostTags from './tags';
import LoaderComponent from '../base/loader';
import Posts from './postsItem';

interface containerPosts {
  breadcrumbs: { url: string; text: string }[];
  type: '' | 'save' | 'tested' | 'ViewPosts';
  typeSelected: navbarEnumPublic;
  typeSelectedAdmin: navbarEnum;
  title: string;
}

export default function ContainerPosts({ breadcrumbs, type, typeSelected, title, typeSelectedAdmin }: containerPosts) {
  const location = useRouter();

  const { posts, activeLoader, errorMsg, finishPage, queryUrl } = usePosts(location, type);
  const numberSelected = parseInt(queryUrl?.page || '1', 10);

  return (
    <div className="container">
      {typeSelectedAdmin !== navbarEnum.None ? (
        <NavbarComponent selected={typeSelectedAdmin} />
      ) : (
        <NavbarComponentPublic selected={typeSelected} />
      )}

      <BreadcrumbComponent breadcrumbs={breadcrumbs} />
      <div className="sub__container">
        <ModalOfSuggestion title="fazer sugestão" />

        <ModalMessage />

        <Title>{title}</Title>
        <ErrorMsg msg={errorMsg} />

        <div className="containerPost">
          <TagsFixFilters queryUrl={queryUrl} />
          <PostTags />
          <LoaderComponent active={activeLoader} />
          <Posts posts={posts} />
        </div>

        {activeLoader ? <p>Carregando posts...</p> : null}

        <PaginationComponent
          urlBase={type === '' ? 'posts' : type}
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

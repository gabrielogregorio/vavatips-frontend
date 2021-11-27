import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../core/services/api';
import {
  NavbarComponentPublic,
  navbarEnumPublic,
} from '../components/layout/navbar_public';
import { ModalOfSuggestion } from '../components/widgets/modalOfSuggestion';
import { ModalMessage } from '../components/widgets/modalMessage';
import { FooterComponent } from '../components/layout/footer';
import { BreadcrumbComponent } from '../components/widgets/breadcrumb';
import { PaginationComponent } from '../components/widgets/pagination';
import resolveQuery from '../core/helpers/resolveQuery';
import { ErrorMsg } from '../components/base/errorMsg';
import { ContainerPosts } from '../components/widgets/containerPosts';
import { LINKS } from '../core/data/links';
import { useFilters } from '../core/contexts/filters';

interface filterUrlInterface {
  agent: string;
  map: string;
  type: string;
  page: string;
}

const breadcrumbs = [LINKS.Home, LINKS.Maps, LINKS.Agents, LINKS.Posts];

function getUrl(location: any): filterUrlInterface {
  const agent: string = new URLSearchParams(location || {}).get('agent') || '';
  const map: string = new URLSearchParams(location || {}).get('map') || '';
  const type: string = new URLSearchParams(location || {}).get('type') || '';
  const page: string = new URLSearchParams(location || {}).get('page') || '1';

  return { agent, map, type, page };
}

export const HomeScreen = () => {
  const location = useLocation();

  const [queryUrl, setQueryUrl] = useState<filterUrlInterface>(
    getUrl(location.search),
  );
  const [activeLoader, setActiveLoader] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [finishPage, setFinishPage] = useState<number>(1);
  const [posts, setPosts] = useState<PropsPostInterface[]>([]);
  const { filters, setTags, setFilters } = useFilters();

  useEffect(() => {
    // clean up
    return () => {
      setTags([]);
      setFilters([]);
    };
  }, [setFilters, setTags]);

  // monitora o QueryUrl para atualizar os dados em cada mudança
  useEffect(() => {
    setActiveLoader(true);
    setErrorMsg('');

    const { agent, map, type, page } = getUrl(location.search);
    setQueryUrl({ agent, map, type, page });

    // Busca no banco de dados os posts gerais ou relacionados a um agente
    // e a um mapa. Ao passar parametros vazios, serão retornados todos os posts
    api
      .get(resolveQuery('/Posts', { agent, map, page, filters }))
      .then((res) => {
        const postsFiltered = res.data.posts;
        setFinishPage(res.data.count);
        setTags(res.data.tags);
        setPosts(postsFiltered);
        setActiveLoader(false);
      })
      .catch((error) => {
        setErrorMsg(error.message);
        setActiveLoader(false);
      });
  }, [location.search, filters, setTags, setFilters]);

  return (
    <div className="container">
      <NavbarComponentPublic
        selected={navbarEnumPublic.Posts}
        agent={queryUrl.agent}
        map={queryUrl.map}
      />

      <BreadcrumbComponent breadcrumbs={breadcrumbs} />

      <div className="subcontainer">
        <ModalOfSuggestion title="fazer sugestão" />

        <ModalMessage />

        <h1>As melhores dicas de Valorant</h1>
        <ErrorMsg msg={errorMsg} />
        {activeLoader ? <p>Carregando posts...</p> : null}

        <ContainerPosts
          activeLoader={activeLoader}
          queryUrl={queryUrl}
          posts={posts}
        />

        <PaginationComponent
          urlBase="Posts"
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

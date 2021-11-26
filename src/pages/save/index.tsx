import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import query from 'query-string';
import api from '../../core/services/api';
import {
  NavbarComponentPublic,
  navbarEnumPublic,
} from '../../components/layout/navbar_public';
import { ModalOfSuggestion } from '../../components/widgets/modalOfSuggestion';
import { ModalMessage } from '../../components/widgets/modalMessage';
import { FooterComponent } from '../../components/layout/footer';
import { BreadcrumbComponent } from '../../components/widgets/breadcrumb';
import { PaginationComponent } from '../../components/widgets/pagination';
import resolveQuery from '../../core/helpers/resolveQuery';
import { ErrorMsg } from '../../components/base/errorMsg';
import { ContainerPosts } from '../../components/widgets/containerPosts';
import { LINKS } from '../../core/data/links';
import { getPostsSave } from '../../core/services/handlePosts';
import { useFilters } from '../../core/contexts/filters';

interface filterUrlInterface {
  agent: string;
  map: string;
  type: string;
  page: string;
}

const breadcrumbs = [LINKS.Home, LINKS.Save];

export const SaveScreen = () => {
  const location = useLocation();

  const [queryUrl, setQueryUrl] = useState<filterUrlInterface>({
    agent: '',
    map: '',
    type: '',
    page: '',
  });
  const [activeLoader, setActiveLoader] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [finishPage, setFinishPage] = useState<number>(1);
  const [posts, setPosts] = useState<PropsPostInterface[]>([]);
  const { setTags, filters } = useFilters();

  // monitora o QueryUrl para atualizar os dados em cada mudança
  useEffect(() => {
    setActiveLoader(true);
    setErrorMsg('');

    let type = `${query.parse(location?.search).type}`;
    let page = `${query.parse(location?.search).page}`;

    if (type === 'undefined') {
      type = '';
    }
    if (page === 'undefined') {
      page = '1';
    }

    const data: filterUrlInterface = { agent: '', map: '', type, page };
    setQueryUrl(data);

    // Busca no banco de dados os posts gerais ou relacionados a um agente
    // e a um mapa. Ao passar parametros vazios, serão retornados todos os posts
    api
      .get(
        resolveQuery('/Posts', {
          idPosts: getPostsSave(),
          page,
          filters: filters.toString(),
        }),
      )
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
  }, [location.search, filters, setTags]);

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

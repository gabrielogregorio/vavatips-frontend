import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { NavbarComponent, navbarEnum } from '../../../components/layout/navbar';
import api from '../../../core/services/api';
import query from 'query-string';
import { useState } from 'react';
import { FooterComponent } from '../../../components/layout/footer';
import { BreadcrumbComponent } from '../../../components/widgets/breadcrumb';
import { PaginationComponent } from '../../../components/widgets/pagination';
import { ContainerPosts } from '../../../components/widgets/containerPosts';

const breadcrumbs = [
  { url: '/Dashboard', text: 'administrativo' },
  { url: '/ViewPosts', text: 'posts' },
];

export const ViewPostsScreen = () => {
  const location = useLocation();
  const [posts, setPosts] = useState<postsProps[]>([]);
  const [finishPage, setFinishPage] = useState<number>(1);
  const [queryParseUrl, setQueryParseUrl] = useState({
    agent: '',
    map: '',
    page: '',
  });

  useEffect(() => {
    let agent = `${query.parse(location?.search).agent}`;
    let map = `${query.parse(location?.search).map}`;
    let page = `${query.parse(location?.search).page}`;

    if (agent === 'undefined') {
      agent = '';
    }
    if (map === 'undefined') {
      map = '';
    }
    if (page === 'undefined') {
      page = '1';
    }

    setQueryParseUrl({ agent, map, page });
  }, [location.search]);

  useEffect(() => {
    api
      .get(
        `/Posts?agent=${queryParseUrl.agent}&map=${queryParseUrl.map}&page=${queryParseUrl.page}`,
      )
      .then((postsJson) => {
        setFinishPage(postsJson.data.count);
        setPosts(postsJson.data.posts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [queryParseUrl]);

  return (
    <div className="container">
      <NavbarComponent selected={navbarEnum.ViewPosts} />
      <BreadcrumbComponent admin breadcrumbs={breadcrumbs} />

      <div className="subcontainer">
        <ContainerPosts
          activeLoader={false}
          queryUrl={queryParseUrl}
          posts={posts}
        />
        <PaginationComponent
          urlBase="ViewPosts"
          initial={1}
          finish={finishPage}
          selected={parseInt(queryParseUrl.page)}
          agent={queryParseUrl.agent}
          map={queryParseUrl.map}
        />
      </div>
      <FooterComponent color="secundary" />
    </div>
  );
};

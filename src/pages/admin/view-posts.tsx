import React, { useEffect } from 'react';
import { NavbarComponent, navbarEnum } from '../../components/layout/navbar';
import api from '../../core/services/api';
import query from 'query-string';
import { useState } from 'react';
import { FooterComponent } from '../../components/layout/footer';
import { BreadcrumbComponent } from '../../components/widgets/breadcrumb';
import { PaginationComponent } from '../../components/widgets/pagination';
import { ContainerPosts } from '../../components/widgets/containerPosts';
import { useRouter } from 'next/router';

const breadcrumbs = [
  { url: '/Dashboard', text: 'administrativo' },
  { url: '/ViewPosts', text: 'posts' },
];

export default function ViewPostsScreen() {
  const location = useRouter();
  const [posts, setPosts] = useState<postsProps[]>([]);
  const [finishPage, setFinishPage] = useState<number>(1);
  const [queryParseUrl, setQueryParseUrl] = useState({
    agent: '',
    map: '',
    page: '',
  });

  useEffect(() => {
    let agent = `${location?.query?.agent || ''}`;
    let map = `${location?.query?.map || ''}`;
    let page = `${location?.query?.page || '1'}`;

    setQueryParseUrl({ agent, map, page });
  }, [`${location.query}`]);

  useEffect(() => {
    api
      .get(`/posts?agent=${queryParseUrl.agent}&map=${queryParseUrl.map}&page=${queryParseUrl.page}`)
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
        <ContainerPosts activeLoader={false} queryUrl={queryParseUrl} posts={posts} />
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
}

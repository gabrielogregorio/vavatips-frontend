import LINKS from '@/data/links.json';
import { Layout } from '@/layout/layout';
import { ContainerPosts } from '@/widgets/containerPosts';
import { navbarEnum } from '@/enums/navbar';
import { Api } from '@/services/api';
import { ReactElement } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { TPostsProps } from '@/types/posts';

const breadcrumbs = [LINKS.inicio, LINKS.Maps, LINKS.Agents, LINKS.Posts];

export const getStaticPaths: GetStaticPaths = async () => {
  const resp = await Api.get('/posts/maps');
  const { maps } = await resp.data;

  const mapAndAgent = maps.map(async (map) =>
    Api.get(`/posts/agents/${map}`)
      .then((res) => res.data)
      .then((data) => ({
        agents: data.agents,
        map,
      })),
  );

  const allPromises = await Promise.all(mapAndAgent);

  const flatAgentsAndMaps = [];
  allPromises.forEach((oneResponse) =>
    oneResponse.agents.forEach((agentName) => flatAgentsAndMaps.push({ agents: agentName, map: oneResponse.map })),
  );
  return {
    fallback: false,
    paths: flatAgentsAndMaps.map((item) => ({
      params: {
        agent: item.agents,
        map: item.map,
      },
    })),
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const response = await Api.get(`/posts/${params.map}/${params.agent}`);
  const posts = await response.data;

  return {
    props: {
      posts: posts.posts,
    },
  };
};

const Posts = ({ posts }: { posts: TPostsProps[] }): ReactElement => (
  <Layout>
    <ContainerPosts
      posts={posts}
      breadcrumbs={breadcrumbs}
      mode="public"
      typeSelected={navbarEnum.Posts}
      title="As melhores dicas de Valorant"
    />
  </Layout>
);
export default Posts;

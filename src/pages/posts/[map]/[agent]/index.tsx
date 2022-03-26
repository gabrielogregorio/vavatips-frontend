import LINKS from '@/data/links.json';
import { Layout } from '@/layout/layout';
import { ContainerPosts } from '@/widgets/containerPosts';
import { navbarEnum } from '@/enums/navbar';
import { api } from '@/services/api';

const breadcrumbs = [LINKS.inicio, LINKS.Maps, LINKS.Agents, LINKS.Posts];

export async function getStaticPaths() {
  const resp = await api('/maps');
  const { maps } = await resp.data;

  const mapAndAgent = maps.map(async (map) =>
    api(`/agents/${map}`)
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
    paths: flatAgentsAndMaps.map((item) => ({
      params: {
        map: item.map,
        agent: item.agents,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params: { map, agent } }) {
  const response = await api(`/posts/${map}/${agent}`);
  const posts = await response.data;
  return {
    props: {
      posts: posts.posts,
    },
  };
}

const Posts = ({ posts }: { posts: any[] }) => (
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

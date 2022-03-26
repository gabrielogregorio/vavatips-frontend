import { useRouter } from 'next/router';
import { ModalOfSuggestion } from '@/widgets/modalOfSuggestion';
import { ModalMessage } from '@/widgets/modalMessage';
import { Footer } from '@/layout/footer';
import { Breadcrumb } from '@/widgets/breadcrumb';
import { Title } from '@/base/title';
import { Navbar } from '@/layout/navbar';
import { SubContainer } from '@/base/subContainer';
import { navbarEnum } from '@/enums/navbar';
import { modelNavbarAdmin, modelNavbarPublic } from '@/schemas/navbar';
import { TagsFixFilters } from '@/widgets/tagsFixFilters';
import { Tags } from '@/widgets/tags';
import { Posts } from '@/widgets/postsItem';
import { useEffect, useState } from 'react';

type containerPosts = {
  breadcrumbs: { url: string; text: string }[];
  typeSelected: navbarEnum;
  mode: 'public' | 'admin';
  title: string;
  posts: any[];
  showTags?: boolean;
};

const skip = 10;

function getAllTags(posts, agent, map): string[] {
  const tags = new Set();
  posts.forEach((post) => {
    const values = Object.values(post.tags);

    values.forEach((value) => {
      if (value !== agent && value !== map) {
        tags.add(value);
      }
    });
  });

  return [...tags] as string[];
}

function applyFilters(posts, filteredActives) {
  function existsFilterActiveInPost(tags) {
    let existsFilter = 0;

    filteredActives.forEach((filter) => {
      if (Object.values(tags).includes(filter)) {
        existsFilter += 1;
      }
    });

    return existsFilter === filteredActives.length;
  }
  return posts.filter((post) => existsFilterActiveInPost(post.tags));
}

export const ContainerPosts = ({ breadcrumbs, mode, typeSelected, title, posts, showTags }: containerPosts) => {
  const { query } = useRouter();
  const { agent, map } = query;
  const [filteredActives, setFilteredsActive] = useState<string[]>([]);
  const [final, setFinal] = useState<number>(skip);
  const tags = getAllTags(posts, agent, map);

  const data = applyFilters(posts, filteredActives);

  const dataItem = JSON.stringify(data);
  useEffect(() => {
    setFinal(skip);
  }, [dataItem]);

  return (
    <>
      {mode === 'admin' ? (
        <Navbar selected={typeSelected} modelNavbar={modelNavbarAdmin} />
      ) : (
        <Navbar selected={typeSelected} modelNavbar={modelNavbarPublic} />
      )}

      <Breadcrumb breadcrumbs={breadcrumbs} />
      <SubContainer>
        <ModalOfSuggestion title="Fazer sugestão" />

        <ModalMessage />

        <Title>{title}</Title>
        <div>
          {showTags ? (
            <>
              <TagsFixFilters agent={agent?.toString()} map={map?.toString()} />
              <Tags tags={tags} setFilteredsActive={setFilteredsActive} filteredActives={filteredActives} />
            </>
          ) : null}
          <Posts posts={data.slice(0, final)} />
        </div>

        <button
          type="button"
          onClick={() => setFinal((prev) => prev + skip)}
          className=" bg-secondary text-white rounded-sm w-full py-2 px-3.5 hover:bg-red-400 transition duration-150">
          Load more
        </button>
      </SubContainer>

      <Footer />
    </>
  );
};

ContainerPosts.defaultProps = {
  showTags: true,
};

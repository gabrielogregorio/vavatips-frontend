import { useRouter } from 'next/router';
import { Breadcrumb } from '@/widgets/breadcrumb';
import { Title } from '@/base/title';
import { Navbar } from '@/layout/navbar';
import { SubContainer } from '@/base/subContainer';
import { navbarEnum } from '@/enums/navbar';
import { modelNavbarAdmin, modelNavbarPublic } from '@/schemas/navbar';
import { TagsFixFilters } from '@/widgets/tagsFixFilters';
import { Tags } from '@/widgets/tags';
import { Posts } from '@/widgets/postsItem';
import { ReactElement, useEffect, useState } from 'react';
import { InfiniteScroll } from '@/widgets/infiniteScroll';
import { TPostsProps, TPostTags } from '@/types/posts';
import { ModalOfSuggestion } from '@/widgets/modalOfSuggestion';
import { ModalMessage } from '@/widgets/modalMessage';
import { Footer } from '@/layout/footer';

type containerPosts = {
  breadcrumbs: { url: string; text: string }[];
  typeSelected: navbarEnum;
  mode: 'public' | 'admin';
  title: string;
  posts: TPostsProps[];
  showTags?: boolean;
};

const skip = 10;
const START_POSITION = 0;

const getAllTags = (posts: TPostsProps[], agent, map): string[] => {
  const tags = new Set();
  posts.forEach((post: TPostsProps) => {
    const values = Object.values(post.tags);

    values.forEach((value) => {
      if (value !== agent && value !== map) {
        tags.add(value);
      }
    });
  });

  return [...tags] as string[];
};

const applyFilters = (posts: TPostsProps[], filteredActives: string[]): TPostsProps[] => {
  const filterIncrementBy = 1;
  const existsFilterActiveInPost = (tags: TPostTags): boolean => {
    let existsFilter = 0;

    filteredActives.forEach((filter) => {
      if (Object.values(tags).includes(filter)) {
        existsFilter += filterIncrementBy;
      }
    });

    return existsFilter === filteredActives.length;
  };
  return posts.filter((post) => existsFilterActiveInPost(post.tags));
};

export const ContainerPosts = ({
  breadcrumbs,
  mode,
  typeSelected,
  title,
  posts,
  showTags,
}: containerPosts): ReactElement => {
  const { query } = useRouter();
  const { agent, map } = query;
  const [filteredActives, setFilteredActive] = useState<string[]>([]);
  const [final, setFinal] = useState<number>(skip);
  const tags = getAllTags(posts, agent, map);
  const [isFirstLoading, setIsFirstLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsFirstLoading(true);
  }, []);

  const data = applyFilters(posts, filteredActives);

  const dataItem = JSON.stringify(data);
  useEffect(() => {
    setFinal(skip);
  }, [dataItem]);

  const handleAddedMore = (): void => {
    setFinal(final + skip);
  };

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
              <Tags tags={tags} setFilteredActive={setFilteredActive} filteredActives={filteredActives} />
            </>
          ) : null}

          {isFirstLoading ? (
            <InfiniteScroll length={final} LoadMore={(): void => handleAddedMore()} hasMore={data.length > final}>
              <Posts posts={data.slice(START_POSITION, final)} />
            </InfiniteScroll>
          ) : null}
        </div>
      </SubContainer>

      <Footer />
    </>
  );
};

ContainerPosts.defaultProps = {
  showTags: true,
};

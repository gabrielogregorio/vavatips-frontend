import React from "react";
import { LoaderComponent } from "../loader";
import { Posts } from "../postsItem";
import { PostTags } from "../tags";
import { TagsFixFilters } from "../tagsFixFilters";

interface propsInterface {
  queryUrl: any,
  activeLoader: boolean,
  activeFilters: string[]
  posts: postsProps[],
  tags: string[],
  toggleTag: (tag: string) => void,
  showModalSuggestionFunction: (posts: postsProps) => void
}

export const ContainerPosts = ( {
    queryUrl,
    toggleTag,
    tags,
    activeFilters,
    activeLoader,
    posts,
    showModalSuggestionFunction
}: propsInterface) => {
  return (
    <div className="containerPost">
        <TagsFixFilters queryUrl={queryUrl} />

        <PostTags toggleTag={toggleTag} tags={tags} activeFilters={activeFilters} />

        <LoaderComponent active={activeLoader} />

        <Posts
          posts={posts}
          toggleTag={toggleTag}
          showModalSuggestionFunction={showModalSuggestionFunction} />
      </div>
  )
}

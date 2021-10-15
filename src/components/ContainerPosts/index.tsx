import React from "react";
import { LoaderComponent } from "../loader";
import { Posts } from "../Posts";
import { PostTags } from "../Tags";
import { TagsFixFilters } from "../TagsFixFilters";

interface propsInterface {
  queryUrl: any,
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
    posts,
    showModalSuggestionFunction
}: propsInterface) => {
  return (
    <div className="containerPost">
        <TagsFixFilters queryUrl={queryUrl} />

       <PostTags toggleTag={toggleTag} tags={tags} activeFilters={activeFilters} />

        <Posts
          posts={posts}
          toggleTag={toggleTag}
          showModalSuggestionFunction={showModalSuggestionFunction} />
      </div>
  )
}

import React from 'react'
import { PostCard } from '../PostCard'

interface postPropsInterface {
  posts: postsProps[],
  toggleTag: (tag: string) => void,
  showModalSuggestionFunction: (post: any) => void
}

export const Posts = ({ posts, toggleTag, showModalSuggestionFunction }: postPropsInterface) => {
  function renderPost() {
    return posts.map((post) => {
      return (
        <div key={post._id}>
         <PostCard
           post={post}
           toggleTag={toggleTag}
           showModalSuggestion={showModalSuggestionFunction}/>
        </div>
      )
    })
  }

  return (
    <div className="postItems">
      {renderPost()}
    </div>
  )
}

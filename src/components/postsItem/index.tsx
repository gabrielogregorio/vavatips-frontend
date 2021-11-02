import React from 'react'
import { PostCard } from '../postCard'

interface postPropsInterface {
  posts: postsProps[],
  toggleTag: (tag: string) => void,
}

export const Posts = ({ posts, toggleTag }: postPropsInterface) => {
  function renderPost() {
    return posts.map((post) => {
      return (
        <div key={post._id}>
         <PostCard
           post={post}
           toggleTag={toggleTag}/>
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

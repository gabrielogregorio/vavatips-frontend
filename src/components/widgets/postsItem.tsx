import { PostCard } from './postCard'

interface postPropsInterface {
  posts: postsProps[]
}

export const Posts = ({ posts }: postPropsInterface) => {
  function renderPost() {
    return posts.map((post) => {
      return (
        <div key={post._id}>
         <PostCard post={post}/>
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

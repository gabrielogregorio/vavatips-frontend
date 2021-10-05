import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { NavbarComponent, navbarEnum } from '../../../components/navbar/navbar'
import api from '../../../services/api'
import { useState } from 'react'
import styles from './view.module.css'
import { formatImage } from '../../../services/formatEnvieroment'
import { FooterComponent } from '../../../components/Footer/footer'
import { BreadcrumbComponent } from '../../../components/Breadcrumb/Breadcrumb'

let breadcrumbs = [
  { url: '/Profile', text: 'administrativo'},
  { url: '/ViewPosts', text: 'posts'}
]

export const ViewPostsScreen = () => {
  let [ posts, setPosts ] = useState<postsProps[]>([])
  let [ updatePosts, setUpdatePosts] = useState<boolean>(false)

  useEffect(() => {
    loadPosts().then((res: any) => {
      setPosts(res.data)
    })
  }, [updatePosts])

  async function loadPosts(): Promise<postsProps[]> {
    let postsList: postsProps[] = await api.get('/posts')
    return postsList
  }

  async function deletePost(id: string) {
    console.log(`/post/${id}`)
    await api.delete(`/post/${id}`)
    setUpdatePosts(!updatePosts)
  }

  function renderPosts() {
    return posts.map((post:any) => {
      return <div key={post._id} className={styles.post}>
        <h2>{post.title}</h2>
        <p>{post.description}</p>
        <div className={styles.firstImgPost}>
          <img src={formatImage(post.imgs[0]?.image)} alt={post.imgs[0]?.title} />
        </div>

        <button onClick={() => deletePost(post._id)} >Excluir</button>
        <Link to={`PostEdit?id=${post._id}`}>Editar Post</Link>
      </div>
    })
  }

  return (
    <div className="container">
     <NavbarComponent selected={navbarEnum.ViewPosts} />
     <BreadcrumbComponent admin breadcrumbs={breadcrumbs} />

     <div className="subcontainer">

       <div className={styles.posts}>
         <h1>Posts do Blog</h1>
         {renderPosts()}
       </div>

      </div>
      <FooterComponent color="secundary" />
    </div>
  )
}

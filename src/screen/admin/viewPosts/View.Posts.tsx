import React, { useEffect } from 'react'
import { postsProps } from '../../posts/props'
import { Link } from 'react-router-dom'
import { NavbarComponent, navbarEnum } from '../../../components/admin/navbar/navbar'
import api from '../../../services/api'
import { useState } from 'react'
import { getId } from '../../../services/auth'
import styles from './view.module.css'
import { Navbar } from '../../../components/NavbarTop/NavbarTop'
import '../style.css'

export const ViewPosts = () => {
  let [ posts, setPosts ] = useState<postsProps[]>([])

  async function loadPosts(): Promise<postsProps[]> {
    let postsList: postsProps[] = await api.get('/posts')
    return postsList
  }

  useEffect(() => {
    loadPosts().then((res: any) => {
      setPosts(res.data)
    })
  }, [])

  function renderPosts() {
    return posts.map((post:any) => {
      return <div key={post._id} className={styles.post}>
        <h2>{post.title}</h2>
        <p>{post.description}</p>
        <div className={styles.firstImgPost}>
          <img src={post.imgs[0].img} alt={post.imgs[0].title} />
        </div>

        <Link to={`PostEdit?id=${post._id}`}>Editar Post</Link>
      </div>
    })
  }

  return (
    <div className="container">
      <Navbar />
     <div className="post-local-container">

       <NavbarComponent selected={navbarEnum.ViewPosts} />

       <div className={styles.posts}>
         <h1>Posts do Blog</h1>
         {renderPosts()}
       </div>

      </div>
    </div>
  )
}

import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import query from 'query-string'
import styles from './post.module.css'
import api from '../../services/api'
import { PostComponent } from '../../components/posts/posts'
import { Navbar } from '../../components/NavbarTop/NavbarTop'

// Primeiro exibe o resultado...


export const PostScreen = () => {
  let item = useLocation()
  let filters = query.parse(item?.search)

  const [ posts, setPosts ] = useState<any[]>([])
  const [ allTags, setAllTags ] = useState<string[]>([])
  const [ activeFilters, setActiveFilters ] = useState<string[]>([])

  useEffect(() => {
    api.get('/posts').then(res => {
      let postsAgent = res.data
      if (filters.agent) {
        postsAgent = postsAgent.filter((post:any) => post.tags.agent?.includes(filters.agent))
      }

      if (filters.map) {
        postsAgent = postsAgent.filter((post:any) => post.tags.map?.includes(filters.map))
      }
      getAllTags(postsAgent)
      setPosts(postsAgent)

    })
  }, [])

  function getAllTags(allPosts: any[]){
    let listTags: string[] = []
    allPosts.map(post => {
      Object.keys(post.tags).map(keyTags => {
        post.tags[keyTags].map((tag: string) => {
          if(!listTags.includes(tag) && tag !== filters.agent && tag !== filters.map) {
            listTags.push(tag)
          }
        })
      })
    })
    setAllTags(listTags)
  }

  function renderPost() {
    let postsAgent: any[] = JSON.parse(JSON.stringify(posts))

    return postsAgent.map(post => {
      return (
        <div key={post._id} style={{width: '100%'}}>
         <PostComponent props={{...post}} />
        </div>
      )
    })
  }

  function toggleTag(tag: string) {
    if(activeFilters.includes(tag)) {
      setActiveFilters(activeFilters.filter(tagActive => tagActive !== tag))
    } else {
      setActiveFilters([...activeFilters, tag])
    }
  }


  function renderFilters() {
    return Object.keys(filters).map(keyId => (
      <div key={keyId} className={styles.btn}>
        <button>{filters[keyId]}</button>
      </div>
    ))
  }

  function renderEditableFilters() {
    return allTags.map(tag => (
      <div key={tag} className={styles.btn}>
        { activeFilters.includes(tag) ? (
          <button className={styles.btnActive} onClick={() => toggleTag(tag)}>{tag}</button>
        ): (
          <button onClick={() => toggleTag(tag)}>{tag}</button>
        )}
      </div>
    ))
  }
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.containerPost}>
        <h1>As melhores dicas de Valorant</h1>
        <div style={{display: 'flex', margin: '10px 0'}}>
          {renderFilters()}
        </div>


        <h3>Filtros Considerado</h3>
        <p>Selecione mais filtros para este agente neste mapa</p>
        <div style={{display: 'flex', margin: '10px 0'}}>
          {renderEditableFilters()}
        </div>

        {renderPost()}

      </div>
    </div>
  )
}

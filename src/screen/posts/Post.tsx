import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import query from 'query-string'
import './post.css'

import api from '../../services/api'
import { PostComponent } from '../../components/posts/posts'
import { NavbarComponentPublic, navbarEnumPublic } from "../../components/navbar_public/navbar";
import { navbarEnum } from '../../components/navbar/navbar'

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

  function renderEditableFilters() {
    return allTags.map(tag => (
      <div key={tag} className="btn">
        { activeFilters.includes(tag) ? (
          <button className="btnActive" onClick={() => toggleTag(tag)}>#{tag}</button>
        ): (
          <button onClick={() => toggleTag(tag)}>#{tag}</button>
        )}
      </div>
    ))
  }
  return (
    <div className="container">
      <div>
        <NavbarComponentPublic selected={navbarEnumPublic.Posts} />
        <h1>As melhores dicas de Valorant</h1>
        <div style={{'display': 'flex', 'flexDirection': 'column'}} className="containerPost">
          <div style={{display: 'flex', margin: '10px 0'}}>

            <div className="btn-base">
              <button>#{filters.agent}</button>
            </div>

            <div className="btn-base">
              <button>#{filters.map}</button>
            </div>
          </div>

          <div style={{display: 'flex', margin: '10px 0', flexWrap: 'wrap', padding: '0 2%', justifyContent: 'center'}}>
            {renderEditableFilters()}
          </div>

          {renderPost()}

        </div>

      </div>
    </div>
  )
}

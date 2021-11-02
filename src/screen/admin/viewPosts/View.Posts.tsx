import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { NavbarComponent, navbarEnum } from '../../../components/navbar'
import api from '../../../services/api'
import query from 'query-string'
import { useState } from 'react'
import { FooterComponent } from '../../../components/footer'
import { BreadcrumbComponent } from '../../../components/breadcrumb'
import { PaginationComponent } from '../../../components/pagination'
import { ContainerPosts } from '../../../components/containerPosts'

let breadcrumbs = [
  { url: '/Dashboard', text: 'administrativo'},
  { url: '/ViewPosts', text: 'posts'}
]

export const ViewPostsScreen = () => {
  const location = useLocation()
  let [ posts, setPosts ] = useState<postsProps[]>([])
  const [ finishPage, setFinishPage ] = useState<number>(1)
  const [ queryParseUrl, setQueryParseUrl ] = useState({agent: '', map: '', page: ''})


  useEffect(() => {
    let agent: string = `${query.parse(location?.search).agent}`
    let map: string = `${query.parse(location?.search).map}`
    let page: string = `${query.parse(location?.search).page}`

    if ( agent === 'undefined' ) { agent = '' }
    if ( map === 'undefined' ) { map = '' }
    if ( page === 'undefined' ) { page = '1' }

    setQueryParseUrl({agent, map, page})
  }, [location.search])


  useEffect(() => {
    api.get(`/Posts?agent=${queryParseUrl.agent}&map=${queryParseUrl.map}&page=${queryParseUrl.page}`).then(postsJson => {
      setFinishPage(postsJson.data.count)
      setPosts(postsJson.data.posts)
    }).catch(error => {
      console.log(error)
    })
  }, [queryParseUrl])

  return (
    <div className="container">
      <NavbarComponent selected={navbarEnum.ViewPosts} />
      <BreadcrumbComponent admin breadcrumbs={breadcrumbs} />

      <div className="subcontainer">
        <ContainerPosts
          activeLoader={false}
          queryUrl={queryParseUrl}
          posts={posts}
        />
        <PaginationComponent
          urlBase='ViewPosts'
          initial={1}
          finish={finishPage}
          selected={parseInt(queryParseUrl.page)}
          agent={queryParseUrl.agent}
          map={queryParseUrl.map}/>
      </div>
      <FooterComponent color="secundary" />
    </div>
  )
}

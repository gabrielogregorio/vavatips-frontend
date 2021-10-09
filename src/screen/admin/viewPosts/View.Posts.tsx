import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { NavbarComponent, navbarEnum } from '../../../components/navbar/navbar'
import api from '../../../services/api'
import query from 'query-string'
import { useState } from 'react'
import { FooterComponent } from '../../../components/Footer/footer'
import { BreadcrumbComponent } from '../../../components/Breadcrumb/Breadcrumb'
import { PostComponent } from '../../../components/posts/posts'
import { PaginationComponent } from '../../../components/Pagination/Pagination'

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
    api.get(`/Posts?agent=${queryParseUrl.agent}&map=${queryParseUrl.map}&page=${queryParseUrl.page}`).then((res: any) => {
      setFinishPage(res.data.count)
      setPosts(res.data.posts)
    }).catch(error => {
      console.log(error)
    })
  }, [queryParseUrl])



  function renderPosts() {
    return posts.map((post:any) => {
      return (
        <div key={post._id}>
          <PostComponent
            viewAdmin
             post={post}
             postActions={{save: [{_id: ''}], tested: [{_id: ''}]}}
             toggleSave={() => {}}
             toggleTested={() => {}}
             toggleTag={() => {}}
             showModalReport={() => {}}
             showModalSuggestion={() => {}}/>
        </div>

      )
    })
  }

  return (
    <div className="container">
      <NavbarComponent selected={navbarEnum.ViewPosts} />
      <BreadcrumbComponent admin breadcrumbs={breadcrumbs} />

      <div className="subcontainer">
        <div className="postItems">
          {renderPosts()}
        </div>

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

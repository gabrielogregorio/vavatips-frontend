import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import api from '../../services/api'
import { NavbarComponentPublic, navbarEnumPublic } from "../../components/navbar_public";
import { ModalOfSuggestion } from '../../components/modalOfSuggestion'
import { ModalMessage } from '../../components/modalMessage'
import { FooterComponent } from '../../components/footer'
import { BreadcrumbComponent } from '../../components/breadcrumb'
import { PaginationComponent } from '../../components/pagination'
import resolveQuery from '../../services/resolveQuery'
import { ErrorMsg } from '../../components/errorMsg'
import { ContainerPosts } from '../../components/containerPosts';
import { LINKS } from '../../data/links'

interface filterUrlInterface {
  agent: string,
  map: string,
  type: string,
  page: string
}

let breadcrumbs = [ LINKS.Home, LINKS.Maps, LINKS.Agents, LINKS.Posts]

function getUrl(location:any): filterUrlInterface {
  let agent: string = new URLSearchParams(location || {}).get('agent') || ''
  let map: string = new URLSearchParams(location || {}).get('map') || ''
  let type: string = new URLSearchParams(location || {}).get('type') || ''
  let page: string = new URLSearchParams(location || {}).get('page') || '1'

  return {agent, map, type, page}
}

export const HomeScreen = () => {
  const location = useLocation()

  const [ queryUrl, setQueryUrl ] = useState<filterUrlInterface>(getUrl(location.search))
  const [ activeLoader, setActiveLoader ] = useState<boolean>(true)
  const [ errorMsg, setErrorMsg ] = useState<string>('')
  const [ finishPage, setFinishPage ] = useState<number>(1)
  const [ posts, setPosts ] = useState<PropsPostInterface[]>([])
  const [ tags, setTags ] = useState<string[]>([])
  const [ activeFilters, setActiveFilters ] = useState<string[]>([])


  // monitora o QueryUrl para atualizar os dados em cada mudança
  useEffect(() => {
    setActiveLoader(true)
    setErrorMsg('')

    let {agent, map, type, page} = getUrl(location.search)
    setQueryUrl({agent, map, type, page})

    // Busca no banco de dados os posts gerais ou relacionados a um agente
    // e a um mapa. Ao passar parametros vazios, serão retornados todos os posts
    api.get(resolveQuery('/Posts', {agent, map, page, filters: activeFilters.toString()})).then(res => {
      let postsFiltered = res.data.posts
      setFinishPage(res.data.count)
      setTags(res.data.tags)
      setPosts(postsFiltered)
      setActiveLoader(false)
    }).catch(error => {
      setErrorMsg(error.message)
      setActiveLoader(false)
    })
  }, [location.search, activeFilters])

  function toggleTag(tag: string) {
    if(activeFilters.includes(tag)) {
      setActiveFilters(activeFilters.filter(filter => filter !== tag))
    } else {
      setActiveFilters([...activeFilters, tag])
    }
  }

  return (
    <div className="container">
      <NavbarComponentPublic
        selected={navbarEnumPublic.Posts}
        agent={queryUrl.agent}
        map={queryUrl.map}/>

      <BreadcrumbComponent breadcrumbs={breadcrumbs}/>

      <div className="subcontainer">

      <ModalOfSuggestion title="fazer sugestão" />

      <ModalMessage />

      <h1>As melhores dicas de Valorant</h1>
      <ErrorMsg msg={errorMsg} />
      {activeLoader ? <p>Carregando posts...</p> : null}

      <ContainerPosts
        activeLoader={activeLoader}
        queryUrl={queryUrl}
        toggleTag={toggleTag}
        tags={tags}
        activeFilters={activeFilters}
        posts={posts}
      />

      <PaginationComponent
        urlBase='Posts'
        initial={1}
        finish={finishPage}
        selected={parseInt(queryUrl.page)}
        agent={queryUrl.agent}
        map={queryUrl.map}/>

        </div>
      <FooterComponent color="primary" />
    </div>

  )
}

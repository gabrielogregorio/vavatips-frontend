import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import query from 'query-string'
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
import { mockPost } from '../../mock/posts'
import { LINKS } from '../../data/links'
import { getPostsSave } from '../../services/handlePosts'

interface filterUrlInterface {
  agent: string,
  map: string,
  type: string,
  page: string
}

let breadcrumbs = [ LINKS.Home, LINKS.Save]

export const SaveScreen = () => {
  const location = useLocation()

  const [ queryUrl, setQueryUrl ] = useState<filterUrlInterface>({agent: '', map: '', type: '', page: ''})
  const [ showModalSuggestion, setShowModalSuggestion ] = useState<boolean>(false)
  const [ showModalMessage, setShowModalMessage ] = useState<boolean>(false)
  const [ modalPost, setModalPost ] = useState<postsProps>(mockPost)
  const [ modalMessage, setModalMessage ] = useState<modalMessageInterface>({type: '', msg: '' })
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

    let type: string = `${query.parse(location?.search).type}`
    let page: string = `${query.parse(location?.search).page}`

    if(type === 'undefined') { type = ''}
    if(page === 'undefined') { page = '1'}

    let data: filterUrlInterface = {agent: '', map:'', type, page}
    setQueryUrl(data)

    // Busca no banco de dados os posts gerais ou relacionados a um agente
    // e a um mapa. Ao passar parametros vazios, serão retornados todos os posts
    api.get(resolveQuery('/Posts', {idPosts: getPostsSave(), page, filters: activeFilters.toString()})).then(res => {
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

  function showModalSuggestionFunction(post: postsProps) {
    setModalPost(post)
    setShowModalSuggestion(true)
  }

  async function saveModalSuggestion(type: modalType, msg:string) {
    setModalMessage({type, msg})
    setShowModalSuggestion(false)
    setShowModalMessage(true)
  }

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
        selected={navbarEnumPublic.Save}
        agent={queryUrl.agent}
        map={queryUrl.map}/>

      <BreadcrumbComponent breadcrumbs={breadcrumbs}/>

      <div className="subcontainer">

      <ModalOfSuggestion
        show={showModalSuggestion}
        post={modalPost}
        title="fazer sugestão"
        closeModal={setShowModalSuggestion}
        saveModal={saveModalSuggestion}/>

      <ModalMessage
        show={showModalMessage}
        data={modalMessage}
        closeModal={setShowModalMessage} />

      <h1>Posts Salvos</h1>
      <ErrorMsg msg={errorMsg} />

      <ContainerPosts
        activeLoader={activeLoader}
        queryUrl={queryUrl}
        toggleTag={toggleTag}
        tags={tags}
        activeFilters={activeFilters}
        posts={posts}
        showModalSuggestionFunction={showModalSuggestionFunction}
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

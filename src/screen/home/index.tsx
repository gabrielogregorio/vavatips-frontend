import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import query from 'query-string'
import api from '../../services/api'
import { NavbarComponentPublic, navbarEnumPublic } from "../../components/navbar_public";
import { ModalOfSuggestion } from '../../components/ModalOfSuggestion'
import { ModalMessage } from '../../components/ModalMessage'
import { LoaderComponent } from '../../components/loader'
import { FooterComponent } from '../../components/Footer'
import { BreadcrumbComponent } from '../../components/Breadcrumb'
import { PaginationComponent } from '../../components/Pagination'
import resolveQuery from '../../services/resolveQuery'
import { H1 } from '../../components/H1';
import { ErrorMsg } from '../../components/ErrorMsg'
import { Container } from '../../components/Container';
import { Subcontainer } from '../../components/Subcontainer';
import { ContainerPosts } from '../../components/ContainerPosts';

interface filterUrlInterface {
  agent: string,
  map: string,
  type: string,
  page: string
}

let breadcrumbs = [
  { url: '/', text: 'inicio'},
  { url: '/Maps', text: 'mapas'},
  { url: '/Maps', text: 'agentes'},
  { url: '/Posts', text: 'dicas'},
]

let mockPost: postsProps = {
  _id: '',
  user: { _id: '', username: '', image: '' },
  description: '',
  title: '',
  imgs: [{ _id: '', image: '', description: '' } ],
  tags: {
    map: '',
    agent: '',
    ability: '',
    moment: '',
    difficult: '',
    side: '',
    mapPosition: ''
  }
}

export const HomeScreen = () => {
  const location = useLocation()

  const [ queryUrl, setQueryUrl ] = useState<filterUrlInterface>({agent: '', map: '', type: '', page: ''})

  // Modal show
  const [ showModalSuggestion, setShowModalSuggestion ] = useState<boolean>(false)
  const [ showModalMessage, setShowModalMessage ] = useState<boolean>(false)

  // Modal load data
  const [ modalPost, setModalPost ] = useState<postsProps>(mockPost)
  const [ modalMessage, setModalMessage ] = useState<modalMessage>({type: 'success', msg: '' })

  const [ activeLoader, setActiveLoader ] = useState<boolean>(true)
  const [ errorMsg, setErrorMsg ] = useState<string>('')

  // Posts
  const [ finishPage, setFinishPage ] = useState<number>(1)
  const [ posts, setPosts ] = useState<PropsPostInterface[]>([])
  const [ tags, setTags ] = useState<string[]>([])
  const [ activeFilters, setActiveFilters ] = useState<string[]>([])


  // monitora o QueryUrl para atualizar os dados em cada mudança
  useEffect(() => {
    setActiveLoader(true)
    setErrorMsg('')

    let agent: string = `${query.parse(location?.search).agent}`
    let map: string = `${query.parse(location?.search).map}`
    let type: string = `${query.parse(location?.search).type}`
    let page: string = `${query.parse(location?.search).page}`

    if(agent === 'undefined') { agent = ''}
    if(map === 'undefined') { map = ''}
    if(type === 'undefined') { type = ''}
    if(page === 'undefined') { page = '1'}

    let data: filterUrlInterface = {agent, map, type, page}
    setQueryUrl(data)

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
    <Container>
      <NavbarComponentPublic
        selected={navbarEnumPublic.Posts}
        agent={queryUrl.agent}
        map={queryUrl.map}/>

      <BreadcrumbComponent breadcrumbs={breadcrumbs}/>

      <Subcontainer>

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

      <H1 title="As melhores dicas de Valorant" />
      <ErrorMsg msg={errorMsg} />

      <LoaderComponent active={activeLoader} />

      <ContainerPosts
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

        </Subcontainer>
      <FooterComponent color="primary" />
    </Container>

  )
}

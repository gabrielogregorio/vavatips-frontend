import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import query from 'query-string'
import api from '../../services/api'

import { PostComponent } from '../../components/posts/posts'
import { NavbarComponentPublic, navbarEnumPublic } from "../../components/navbar_public/navbar";
import { ModalOfReport } from '../../components/ModalOfReport/ModalOfReport'
import { ModalOfSugestion } from '../../components/ModalOfSugestion/ModalOfSugestion'
import { ModalMessage } from '../../components/ModalMessage/ModalMessage'
import { LoaderComponent } from '../../components/loader/loader'
import { FooterComponent } from '../../components/Footer/footer'
import { BreadcrumbComponent } from '../../components/Breadcrumb/Breadcrumb'
import { PaginationComponent } from '../../components/Pagination/Pagination'
import resolveQuery from '../../services/resolveQuery'

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


export const PostScreen = () => {
  const location = useLocation()
  const [ queryUrl, setQueryUrl ] = useState<filterUrlInterface>({agent: '', map: '', type: '', page: ''})
  const [ postActions, setPostActions ] = useState<postActionsInterface>({save:[{_id: ''}], tested:[{_id: ''}]})

  // Modal show
  const [ showModalReport, setShowModalReport ] = useState<boolean>(false)
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
      let postsAgent = res.data.posts
      setFinishPage(res.data.count)
      setTags(res.data.tags)

      // Usuário está na URL de posts salvos => filtro por posts salvos
      if(queryUrl.type === 'Save') {
        let filterSave = postActions.save?.map(item => item._id)
        postsAgent = postsAgent.filter((post: any) => filterSave?.includes(post._id)  )
      }

      // Usuário está na URL de posts testados => filtro por posts testados
      if(queryUrl.type === 'Tested') {
        let filterTested = postActions.tested?.map(item => item._id)
        postsAgent = postsAgent.filter((post: any) => filterTested?.includes(post._id)  )
      }
      setPosts(postsAgent)
      setActiveLoader(false)
    }).catch(error => {
      setErrorMsg(error.message)
      setActiveLoader(false)
    })
  }, [location.search, activeFilters])


  function showModalReportFunction(post: postsProps) {
    setModalPost(post)
    setShowModalReport(true)
  }

  async function saveModalReport(type: modalType, msg: string) {
    setShowModalReport(false)
    setModalMessage({type, msg})
    setShowModalMessage(true)
  }

  function showModalSuggestionFunction(post: postsProps) {
    setModalPost(post)
    setShowModalSuggestion(true)
  }

  async function saveModalSuggestion(type: modalType, msg:string) {
    setModalMessage({type, msg})
    setShowModalSuggestion(false)
    setShowModalMessage(true)
  }

  function toggleSave(_id: string) {
    let copyActions: postActionsInterface = JSON.parse(JSON.stringify(postActions))

    if(copyActions.save?.filter( copy => copy._id === _id).length !== 0) {
      let index = copyActions.save.findIndex(copy => copy._id === _id)
      copyActions.save.splice(index, 1)
      setPostActions(copyActions)
    } else {
      copyActions.save.push({_id})
      setPostActions(copyActions)
    }

    localStorage.setItem('posts-data', JSON.stringify(copyActions))
  }

  function toggleTested(_id: string) {
    let copyActions: postActionsInterface = JSON.parse(JSON.stringify(postActions))

    if(copyActions.tested?.filter( copy => copy._id === _id).length !== 0) {
      let index = copyActions.tested.findIndex(copy => copy._id === _id)
      copyActions.tested.splice(index, 1)
      setPostActions(copyActions)

    } else {
      copyActions.tested.push({_id})
      setPostActions(copyActions)
    }
    localStorage.setItem('posts-data', JSON.stringify(copyActions))
  }

  function renderPost() {
    let postsAgent: any[] = JSON.parse(JSON.stringify(posts))

    return postsAgent.map((post: PropsPostInterface) => {
      return (
        <div key={post._id}>
         <PostComponent
           post={post}
           toggleTag={toggleTag}
           postActions={postActions}
           toggleSave={toggleSave}
           toggleTested={toggleTested}
           showModalReport={showModalReportFunction}
           showModalSuggestion={showModalSuggestionFunction}/>
        </div>
      )
    })
  }

  function toggleTag(tag: string) {
    if(activeFilters.includes(tag)) {
      setActiveFilters(activeFilters.filter(filter => filter !== tag))
    } else {
      setActiveFilters([...activeFilters, tag])
    }
  }

  function renderTags() {
    return tags.map((tag, index) => (
      <div className="btn" key={index} onClick={() => toggleTag(tag)}>
        { activeFilters.includes(tag) ? (
          <button className="btnActive">{tag}</button>
        ) : (
          <button>{tag}</button>
        )}
      </div>
    )
)
  }

  return (
    <div className="container">
      <NavbarComponentPublic
        selected={queryUrl.type === 'Save' ? navbarEnumPublic.Save : navbarEnumPublic.Posts}
        agent={queryUrl.agent}
        map={queryUrl.map}/>

      <BreadcrumbComponent breadcrumbs={breadcrumbs}/>

      <div className="subcontainer">
        <h1>As melhores dicas de Valorant</h1>
        <p className="errorMsg">{errorMsg}</p>

        <div className="containerPost">
          <div>
          { showModalReport ? (
            <ModalOfReport post={modalPost} title="fazer Reporte" closeModal={setShowModalReport} saveModal={saveModalReport}/>
          ) : null}

          { showModalSuggestion ? (
            <ModalOfSugestion post={modalPost} title="fazer sugestão" closeModal={setShowModalSuggestion} saveModal={saveModalSuggestion}/>
          ) : null}

          { showModalMessage ? (
            <ModalMessage data={modalMessage} closeModal={setShowModalMessage} />
          ) : (
            null
          )}

            <div className="btn-base">
              { queryUrl.agent ? (<button>#{queryUrl.agent}</button> ) : null }
            </div>

            <div className="btn-base">
             { queryUrl.map ? (<button>#{queryUrl.map}</button> ) : null }
            </div>
          </div>

          <div className="tags">
            {renderTags()}
          </div><br />

          <LoaderComponent active={activeLoader} />
          <div className="postItems">
            {renderPost()}
          </div>
        </div>

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

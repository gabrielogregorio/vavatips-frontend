import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import query from 'query-string'
import api from '../../services/api'
import { PostComponent } from '../../components/posts/posts'
import { NavbarComponentPublic, navbarEnumPublic } from "../../components/navbar_public/navbar";
import { ModalOfReport } from '../../components/ModalOfReport/ModalOfReport'
import { ModalOfSugestion } from '../../components/ModalOfSugestion/ModalOfSugestion'
import './post.css'
import { ModalMessage } from '../../components/ModalMessage/ModalMessage'

interface filterUrlInterface {
  agent: string,
  map: string,
  type: string
}

export const PostScreen = () => {
  const location = useLocation()
  const [ queryUrl, setQueryUrl ] = useState<filterUrlInterface>(loadUrlQuery())
  const [ posts, setPosts ] = useState<PropsPostInterface[]>([])
  const [ originalPosts, setOriginalPosts ] = useState<PropsPostInterface[]>([])
  const [ allTags, setAllTags ] = useState<string[]>([])
  const [ activeFilters, setActiveFilters ] = useState<string[]>([])
  const [ postActions, setPostActions ] = useState<postActionsInterface>({save:[{_id: ''}], tested:[{_id: ''}]})
  const [ modalPostTitle, setModalPostTitle ] = useState<string>('')
  const [ modalPostId, setModalPostId ] = useState<string>('')
  const [ showModalReport, setShowModalReport ] = useState<boolean>(false)
  const [ showModalSuggestion, setShowModalSuggestion ] = useState<boolean>(false)

  const [ showModalMessage, setShowModalMessage ] = useState<boolean>(false)
  const [ modalTextMessage, setModalTextMessage ] = useState<string>('')
  const [ modalTypeMessage, setModalTypeMessage ] = useState<modalType>('success')


  // Monitora o hook useLocation, para atualizar em quaquer mudança de URL
  useEffect(() => {
    setQueryUrl(loadUrlQuery())
  }, [location])

  // Carrega os testes e posts salvos do localstorage
  useEffect(() => {
    let item: postActionsInterface = JSON.parse(`${localStorage.getItem('posts-data')}`)
    if(item) { setPostActions(item) }
  }, [])

  // monitora o QueryUrl para atualizar os dados em cada mudança
  useEffect(() => {
    let {agent, map} = queryUrl
    if(agent === undefined) { agent = '' }
    if(map === undefined) { map = '' }

    // Busca no banco de dados os posts gerais ou relacionados a um agente
    // e a um mapa. Ao passar parametros vazios, serão retornados todos os posts
    api.get(`/posts?agent=${agent}&map=${map}`).then(res => {
      let postsAgent = res.data

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

      let listTags: string[] = []
      postsAgent.map((post: any) => {
        return Object.keys(post.tags).map(keyTags => {
          let tag = post.tags[keyTags]
          if(!listTags.includes(tag) && tag !== queryUrl.agent && tag !== queryUrl.map) {
            listTags.push(tag)
          }
          return true
        })
      })
      setAllTags(listTags)
      setPosts(postsAgent)
      setOriginalPosts(postsAgent)
    })
  }, [queryUrl])


  // Atualiza sempre que uma tag for adicionada ao filtro
  useEffect(() => {
    let postsAgent = originalPosts
    // Se tem filtros ativos => filtros por tags
    if(activeFilters.length !== 0) {
      // percorre todos os posts
      postsAgent = postsAgent.filter((post: any) => {

        // Obter todas as chaves das tags ['agent', 'map', 'side', 'momment']
        let keyTagsThisPost = Object.keys(post.tags)

        // Obter todos as tags dentro das chaves ['Sova', 'Ascent', 'atacante']
        let allFiltersThisPost = keyTagsThisPost.map(arry => post.tags[arry])

        let qtdFiltersSelected: number = activeFilters.length
        let qtdFiltersThisPost: number = 0

        for(let i = 0; i < allFiltersThisPost.length; i++) {
          if(activeFilters.includes(allFiltersThisPost[i])) {
            qtdFiltersThisPost = qtdFiltersThisPost + 1
          }
        }

        // Todos os filtros fora atendidos
        if (qtdFiltersThisPost === qtdFiltersSelected) {
          return true
        }
        return false
      })
    }

    setPosts(postsAgent)
  }, [activeFilters])


  function showModalReportFunction(idPost: string, titlePost: string) {
    setModalPostTitle(titlePost)
    setModalPostId(idPost)
    setShowModalReport(true)
  }

  function closeModalReport() {
    setShowModalReport(false)
    setModalPostTitle('')
    setModalPostId('')
  }

  async function saveModalReport(idPost:string, postTitle: string, email: string, description:string, screenWidth: number, screenHeight: number) {
    closeModalReport()
    try {
      await api.post('/report', { idPost, email, description, screenWidth, screenHeight })
      setModalTextMessage('Report enviado com sucesso, muito obrigado!')
      setModalTypeMessage('success')

    } catch(error) {
      console.log(error)
      setModalTextMessage('Erro ao enviar o Report. Você poderia reportar o problema aos desenvolvedores')
      setModalTypeMessage('error')
    }
    setShowModalMessage(true)
  }

  function showModalSuggestionFunction(idPost: string, titlePost: string) {
    setModalPostTitle(titlePost)
    setModalPostId(idPost)
    setShowModalSuggestion(true)
  }

  function closeModalSuggestion() {
    setShowModalSuggestion(false)
    setModalPostTitle('')
    setModalPostId('')
  }

  function closeModalMessage() {
    setShowModalMessage(false)
    setModalTextMessage('')
  }

  async function saveModalSuggestion(idPost:string, postTitle: string, email: string, description:string) {
    closeModalSuggestion()
    try {
      await api.post('/suggestion', { idPost, email, description })

      setModalTextMessage('Sugestão enviado com sucesso, muito obrigado!')
      setModalTypeMessage('success')
    } catch(error) {
      console.log(error)
      setModalTextMessage('Erro ao enviar a Sugestão. Você poderia reportar o problema aos desenvolvedores')
      setModalTypeMessage('error')
    }
    setShowModalMessage(true)
  }


  // Obtém os dados do hooke useLocation e gera um objeto para atualizar
  // o useState de UrlQuery
  function loadUrlQuery() {
    let agent: string = `${query.parse(location?.search).agent}`
    let map: string = `${query.parse(location?.search).map}`
    let type: string = `${query.parse(location?.search).type}`

    if(agent === 'undefined') { agent = '' }
    if(map === 'undefined') { map = '' }
    if(type === 'undefined') { type = '' }

    let data: filterUrlInterface = {agent, map, type}

    return data
  }

  function toggleTag(tag: string) {
    if(activeFilters.includes(tag)) {
      setActiveFilters(activeFilters.filter(tagActive => tagActive !== tag))
    } else {
      setActiveFilters([...activeFilters, tag])
    }
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
      post.postActions = postActions
      post.toggleSave = toggleSave
      post.toggleTested = toggleTested
      return (
        <div key={post._id} style={{width: '100%'}}>
         <PostComponent {...post} showModalReport={showModalReportFunction} showModalSuggestion={showModalSuggestionFunction}/>
        </div>
      )
    })
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
        {
          queryUrl.type === 'Save' ? (
            <NavbarComponentPublic selected={navbarEnumPublic.Save} agent={queryUrl.agent} map={queryUrl.map}/>
          ) :  queryUrl.type === 'Tested' ? (
            <NavbarComponentPublic selected={navbarEnumPublic.Tested} agent={queryUrl.agent} map={queryUrl.map}/>
          ) : (
            <NavbarComponentPublic selected={navbarEnumPublic.Posts} agent={queryUrl.agent} map={queryUrl.map}/>
          )
        }
        <h1>As melhores dicas de Valorant</h1>

        <div style={{'display': 'flex', 'flexDirection': 'column'}} className="containerPost">
          <div style={{display: 'flex', margin: '10px 0'}}>
          { showModalReport ? (
            <ModalOfReport idPost={modalPostId} title="fazer Reporte" postTitle={modalPostTitle} closeModal={closeModalReport} saveModal={saveModalReport}/>
          ) : null}

          { showModalSuggestion ? (
            <ModalOfSugestion idPost={modalPostId} title="fazer sugestão" postTitle={modalPostTitle} closeModal={closeModalSuggestion} saveModal={saveModalSuggestion}/>
          ) : null}

          { showModalMessage ? (
            <ModalMessage type={modalTypeMessage} text={modalTextMessage} closeModal={closeModalMessage} />
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

          <div style={{display: 'flex', margin: '10px 0', flexWrap: 'wrap', padding: '0 2%', justifyContent: 'center', width: '100%'}}>
            {renderEditableFilters()}
          </div><br />

          <div style={{width: '100%'}}>
            {renderPost()}
          </div>
        </div>
      </div>
    </div>
  )
}

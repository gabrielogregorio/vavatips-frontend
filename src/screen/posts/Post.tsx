import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import query from 'query-string'
import './post.css'
import api from '../../services/api'
import { PostComponent } from '../../components/posts/posts'
import { NavbarComponentPublic, navbarEnumPublic } from "../../components/navbar_public/navbar";
import { ModalReportComponent } from '../../components/modalReport/modalReport'
import { ModalSugestaoComponent } from '../../components/modalSugestao/modalSugestao'

export interface PropsPostInterface {
  _id: string,
  user: { _id: string, username: string, image: string }
  description: string
  title: string

  imgs: [{ _id: string, image: string, description: string } ]
  tags: {
    map: string,
    agent: string,
    ability: string,
    moment: string,
    difficult: string,
    side: string,
    mapPosition: string
  },
  postActions: {
    save: [{_id: string}],
    tested: [{_id: string}]
  },
  toggleSave: (_id: string) => void
  toggleTested: (_id: string) => void
}



// Primeiro exibe o resultado...
interface postActionsInterface {
  save: [ {_id: string} ],
  tested: [{_id: string} ]
}
interface filterUrlInterface {
  agent: string,
  map: string,
  type: string
}

export const PostScreen = () => {
  const [ filtersUrl, setFiltersUrl ] = useState<filterUrlInterface>({agent: '', map: '', type: ''})
  const [ posts, setPosts ] = useState<any[]>([])
  const [ allTags, setAllTags ] = useState<string[]>([])
  const [ activeFilters, setActiveFilters ] = useState<string[]>([])
  const [ postActions, setPostActions ] = useState<postActionsInterface>({save:[{_id: ''}], tested:[{_id: ''}]})
  const [ useLocaltionItem ] = useState<any>(useLocation())


  const [ postTitleModal, setPostTitleModal ] = useState<string>('')
  const [ postIdModal, setPostIdModal ] = useState<string>('')
  const [ showModalReport, setShowModalReport ] = useState<boolean>(false)
  const [ showModalSugestao, setShowModalSugestao ] = useState<boolean>(false)

  function showModalReportFunction(idPost: string, titlePost: string) {
    setPostTitleModal(titlePost)
    setPostIdModal(idPost)
    setShowModalReport(true)
  }

  function closeModalReport() {
    setShowModalReport(false)
    setPostTitleModal('')
    setPostIdModal('')
  }

  function saveModalReport(idPost:string, postTitle: string, email: string, description:string, larguraTela: number, alturaTela: number) {
    console.log(idPost, postTitle, email, description, larguraTela, alturaTela)
    closeModalReport()
  }

  function showModalSugestaoFunction(idPost: string, titlePost: string) {
    setPostTitleModal(titlePost)
    setPostIdModal(idPost)
    setShowModalSugestao(true)
  }

  function closeModalSugestao() {
    setShowModalSugestao(false)
    setPostTitleModal('')
    setPostIdModal('')
  }

  function saveModaSugestao(idPost:string, postTitle: string, email: string, description:string) {
    console.log(idPost, postTitle, email, description)
    closeModalSugestao()
  }

  useEffect(() => {
    let agent: string = `${query.parse(useLocaltionItem?.search).agent}`
    let map: string = `${query.parse(useLocaltionItem?.search).map}`
    let type: string = `${query.parse(useLocaltionItem?.search).type}`

    let data: filterUrlInterface = {agent, map, type}

    setFiltersUrl(data)
  }, [useLocaltionItem])

  useEffect(() => {
    let varNome = 'posts-data'
    let item: postActionsInterface = JSON.parse(`${localStorage.getItem(varNome)}`)
    if(item) {
      setPostActions(item)
    }

    api.get('/posts').then(res => {
      let postsAgent = res.data
      if (filtersUrl.agent) {
        postsAgent = postsAgent.filter((post:any) => post.tags.agent === filtersUrl.agent)
      }

      if (filtersUrl.map) {
        postsAgent = postsAgent.filter((post:any) => post.tags.map === filtersUrl.map)
      }

      if(filtersUrl.type === 'Save') {
        let filterSave = item.save?.map(item => item._id)
        postsAgent = postsAgent.filter((post: any) => filterSave?.includes(post._id)  )
      }

      if(filtersUrl.type === 'Tested') {
        let filterTested = item.tested?.map(item => item._id)
        postsAgent = postsAgent.filter((post: any) => filterTested?.includes(post._id)  )
      }

      if(activeFilters.length !== 0) {
        postsAgent = postsAgent.filter((post: any) => {
          // Obter todas as chaves das tags
          let localTagOnePost = Object.keys(post.tags)
          // Obter todos as tags dentro das tags [tag1, tag2, tag3, tag4, tag5, tag7]
          let localListTagsInTag = localTagOnePost.map(arry => post.tags[arry])

          let notIncludeFilter = undefined
          for(let i = 0; i < localListTagsInTag.length; i++) {
            if(activeFilters.includes(localListTagsInTag[i])) {
              notIncludeFilter = true
            }
          }

          return notIncludeFilter
        })
      }


      let listTags: string[] = []
      postsAgent.map((post: any) => {
        return Object.keys(post.tags).map(keyTags => {
          let tag = post.tags[keyTags]
          if(!listTags.includes(tag) && tag !== filtersUrl.agent && tag !== filtersUrl.map) {
            listTags.push(tag)
          }
          return true
        })
      })
      setAllTags(listTags)
      setPosts(postsAgent)
    })


  }, [useLocaltionItem, activeFilters, filtersUrl])




  function renderPost() {
    let postsAgent: any[] = JSON.parse(JSON.stringify(posts))

    return postsAgent.map((post: PropsPostInterface) => {
      post.postActions = postActions
      post.toggleSave = toggleSave
      post.toggleTested = toggleTested
      return (
        <div key={post._id} style={{width: '100%'}}>
         <PostComponent {...post} showModalReport={showModalReportFunction} showModalSugestaoFunction={showModalSugestaoFunction}/>
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
          filtersUrl.type === 'Save' ? (
            <NavbarComponentPublic selected={navbarEnumPublic.Save} agent={filtersUrl.agent} map={filtersUrl.map}/>
          ) :  filtersUrl.type === 'Tested' ? (
            <NavbarComponentPublic selected={navbarEnumPublic.Tested} agent={filtersUrl.agent} map={filtersUrl.map}/>
          ) : (
            <NavbarComponentPublic selected={navbarEnumPublic.Posts} agent={filtersUrl.agent} map={filtersUrl.map}/>
          )
        }
        <h1>As melhores dicas de Valorant</h1>

        <div style={{'display': 'flex', 'flexDirection': 'column'}} className="containerPost">
          <div style={{display: 'flex', margin: '10px 0'}}>
          { showModalReport ? (
            <ModalReportComponent idPost={postIdModal} title="fazer Reporte" postTitle={postTitleModal} closeModal={closeModalReport} saveModal={saveModalReport}/>
          ) : null}

          { showModalSugestao ? (
            <ModalSugestaoComponent idPost={postIdModal} title="fazer sugestão" postTitle={postTitleModal} closeModal={closeModalSugestao} saveModal={saveModaSugestao}/>
          ) : null}


            <div className="btn-base">
              { filtersUrl.agent ? (<button>#{filtersUrl.agent}</button> ) : null }
            </div>

            <div className="btn-base">
             { filtersUrl.map ? (<button>#{filtersUrl.map}</button> ) : null }
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

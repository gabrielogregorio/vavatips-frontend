import React, { useEffect, useState } from 'react'
import queryString from 'query-string'
import { useLocation } from 'react-router';
import 'dotenv/config'
import { Redirect } from 'react-router-dom'
import { NavbarComponent, navbarEnum } from '../../../components/navbar/navbar'
import api from '../../../services/api'
import * as uuid from 'uuid'
import { agents, maps, agentInterface } from '../../../data/data-valorant'
import { InputValue } from '../../../components/inputValue';
import { ModalComponent } from '../../../components/modal/modal';


type actionType = "top" | "bottom"

interface imgInterface {
  description: string,
  image: string,
  _id: string
}

interface propsModalInterface {
  _id: string,
  description: string,
  image: string
}

export const EditPostScreen = () => {
  const [ redirect, setRedirect ] = useState<boolean>(false)

  const { search } = useLocation();
  const id = queryString.parse(search)?.id

  const [ imgAdded, setImgAdded ] = useState<imgInterface[]>([])

  const [ formTitle, setFormTitle ] = useState<string>("")
  const [ formDescription, setFormDescription ] = useState<string>("")
  const [ formTagMoment, setFormTagMoment ] = useState<string>("")
  const [ formTagDifficult, setFormTagDifficult ] = useState<string>("")
  const [ formTagAbility, setFormTagAbility ] = useState<string>("")
  const [ formTagSide, setFormTagSide ] = useState<string>("")
  const [ formTagMap, setFormTagMap ] = useState<string>("")
  const [ formTagMapPosition, setFormTagMapPosition ] = useState<string>("")
  const [ formTagAgent, setFormTagAgent ] = useState<string>("")

  const [ visibleModal, setVisibleModal ] = useState<boolean>(false)
  const [ propsModal, setPropsModal ] = useState<propsModalInterface>({_id: "", description: "", image: ""})



  useEffect(() => {
    api.get(`/post/${id}`).then(res => {
      let userApi = res.data
      console.log(userApi)
      setFormTitle(userApi.title)
      setFormDescription(userApi.description)
      setFormTagMoment(userApi.tags.moment)
      setFormTagDifficult(userApi.tags.difficult)
      setFormTagAbility(userApi.tags.ability)
      setFormTagSide(userApi.tags.side)
      setFormTagMap(userApi.tags.map)
      setFormTagMapPosition(userApi.tags.mapPosition)
      setFormTagAgent(userApi.tags.agent)
      setImgAdded(userApi.imgs)
    })
  }, [])

  async function handleSubmit() {
    let request = {
      title: formTitle,
      description: formDescription,
      user: '',
      tags: {
        moment: formTagMoment,
        difficult: formTagDifficult,
        ability: formTagAbility,
        side: formTagSide,
        map: formTagMap,
        mapPosition: formTagMapPosition,
        agent: formTagAgent
      },
      imgs: imgAdded
    }

    try {
      await api.put(`/post/${id}`, {...request})
      setRedirect(true)
    } catch(error) {
      console.log(error)
    }
  }

  function deleteStep(_id: string) {
    console.log(_id)
    setImgAdded(imgAdded.filter(item => item._id !== _id))
  }

  function putPosition(_id: string, action: actionType) {
    // Obter a posição do item que será trocado
    let positionPut = imgAdded.findIndex(item => item._id === _id)

    // Copia o item que será trocado
    let copyListDelete = imgAdded[positionPut]

    // Cria uma cópia do imgAdded ( não pode ser alterado )
    let copyImgAdded = JSON.parse(JSON.stringify(imgAdded))

    let increment = 0

    // Se for para decrementar e for maior que 0
    if(action === 'bottom' && positionPut > 0)  {
      increment = -1
    } else if(action === 'top' && positionPut < imgAdded.length)  {
      increment = 1
    } else {
      return null
    }

    // Deleta o item que será trocadao
    copyImgAdded.splice(positionPut, 1)

    // Inserir o item na posição anterior
    copyImgAdded.splice(positionPut + increment, 0, copyListDelete)

    // Atualiza no state
    setImgAdded(copyImgAdded)
  }


  function renderSteps() {
    return imgAdded.map((instruction, key) => (
      <div key={instruction._id}>
        <div className="instructionTop" >
          <p onClick={() => showModalWithItem(instruction._id)}>{key + 1} - {instruction.description}</p>
          <button onClick={() => deleteStep(instruction._id)}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="instructionImage">
          <img src={instruction.image} alt={instruction.description} style={{width: '100%'}} /> <br />
          <button className="btn-bottom" onClick={() => putPosition(instruction._id, 'bottom')}>
            <i className="fas fa-chevron-up"></i>
          </button>

          <button className="btn-top" onClick={() => putPosition(instruction._id, 'top')}>
            <i className="fas fa-chevron-down"></i>
          </button>
        </div>
        <hr />
      </div>
    ))
  }

  function renderAgent() {
    return agents().map(agent => {
      return <option value={agent.name} key={agent.id} >{agent.name}</option>
    })
  }

  function renderMaps() {
    return maps().map(map => {
      return <option value={map.name} key={map.id} >{map.name}</option>
    })
  }

  function renderHabilits() {
    let filterAbilities: agentInterface = agents().filter(agent => agent.name === formTagAgent)?.[0]
    return filterAbilities?.habilits.map(ability => {
      return <option value={ability.name} key={ability.name}>{ability.keyboard} - {ability.name}</option>
    })
  }


  function showModalWithItem(id: string) {
    let item = imgAdded.filter(item => item._id === id)[0]
    setPropsModal(item)
    setVisibleModal(true)
  }

  function showModal() {
    setPropsModal({_id: "", description: "", image: ""})
    setVisibleModal(true)
  }

  function closeModal() {
    setPropsModal({_id: "", description: "", image: ""})
    setVisibleModal(false)
  }

  function saveModal(_id: string, description: string, image: string) {
    if(_id) {
      let copyImgAdded: imgInterface[] = JSON.parse(JSON.stringify(imgAdded))
      copyImgAdded.forEach(copy => {
        if(copy._id === _id) {
          copy.description = description
          copy.image = image
        }
      })
      setImgAdded(copyImgAdded)
      return setVisibleModal(false)
    }
    setImgAdded([...imgAdded, {description, image, _id: uuid.v4().toString()}])
    setVisibleModal(false)
  }

  return (
    <div className="containerAdmin">
      <div>
        {redirect ? <Redirect to="/ViewPosts" /> : null }
        <NavbarComponent selected={navbarEnum.PostCreate} />

        {visibleModal ?
          (<ModalComponent
              title="Adicionar Post"
              _id={propsModal._id}
              description={propsModal.description}
              image={propsModal.image}
              closeModal={closeModal}
              saveModal={saveModal}/>)
          : ( null)}

        <h1>Editar um post</h1>

        <div className="form">

          <InputValue text="Titulo" value={formTitle} setValue={setFormTitle}/>
          <InputValue text="Descrição" value={formDescription} setValue={setFormDescription}/>

          <hr />

          <div className="groupInput">
            <div className="groupInputSelet">
              <label>Agente</label>
              <select value={formTagAgent} onChange={(e) => setFormTagAgent(e.target.value)} >
              <option value=""></option>
                {renderAgent()}
              </select>
            </div>

            <div className="groupInputSelet">
              <label>Mapa</label>
              <select value={formTagMap} onChange={(e) => setFormTagMap(e.target.value)} >
                <option value=""></option>
                {renderMaps()}
              </select>
            </div>

            <div className="groupInputSelet">
              <label>Habilidade</label>
              <select value={formTagAbility} onChange={(e) => setFormTagAbility(e.target.value)}>
                <option value=""></option>
                {renderHabilits()}
              </select>
            </div>
          </div>

          <div className="groupInput">
            <div className="groupInputSelet">
              <label>Posição</label>
              <select value={formTagMapPosition} onChange={(e) => setFormTagMapPosition(e.target.value)}>
                <option value="Qualquer">Qualquer</option>
                <option value="Meio">Meio</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
            </div>

            <div className="groupInputSelet">
              <label>Momento</label>
              <select value={formTagMoment} onChange={(e) => setFormTagMoment(e.target.value)}>
                <option value=""></option>
                <option value="QualquerMomento">QualquerMomento</option>
                <option value="DepoisDoPlant">DepoisDoPlant</option>
              </select>
            </div>

            <div className="groupInputSelet">
              <label>Dificuldade</label>
              <select value={formTagDifficult} onChange={(e) => setFormTagDifficult(e.target.value)} >
                <option value=""></option>
                <option value="Facil">Facil</option>
                <option value="medio">medio</option>
                <option value="hardcore">hardcore</option>
              </select>
            </div>
          </div>

          <div className="groupInput">
            <div className="groupInputSelet">
              <label>Lado</label>
              <select value={formTagSide} onChange={(e) => setFormTagSide(e.target.value)} >
                <option value=""></option>
                <option value="Defensores">Defensores</option>
                <option value="Atacantes">Atacantes</option>
              </select>
            </div>
          </div>

          <hr />
          <p className="info">Passo a passo da dica. Lembre-se de usar Zoom, usar marcações claras, de forma que seja bem visível.<br/><br/> Clique nos titulos para EDITAR os itens</p>
          <hr />

          {renderSteps()}

          <div className="groupInput">
            <div className="groupInputSelet">
              <button className="btn-new-step" onClick={() => showModal()} >Novo Passo</button> <br />
            </div>
          </div>
          <div className="groupInput">
            <div className="groupInputSelet">
              <button onClick={() => handleSubmit()} className="btn-save">Publicar Dica</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

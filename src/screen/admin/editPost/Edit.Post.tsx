import React, { useEffect, useState } from 'react'
import queryString from 'query-string'
import { useLocation } from 'react-router';
import 'dotenv/config'
import { Redirect } from 'react-router-dom'
import { NavbarComponent, navbarEnum } from '../../../components/admin/navbar/navbar'
import api from '../../../services/api'
import { Navbar } from '../../../components/NavbarTop/NavbarTop'
//import '../../../style.post.css'
import * as uuid from 'uuid'
import { agents, maps, agentInterface } from '../../../data/data-valorant'

type actionType = "top" | "bottom"

interface imgInterface {
  title: string,
  img: string,
  _id: string
}

export const EditPostScreen = () => {
  const [ redirect, setRedirect ] = useState<boolean>(false)

  const { search } = useLocation();
  const id = queryString.parse(search)?.id


  const [ imgAdded, setImgAdded ] = useState<imgInterface[]>([])

  const [ descriptionImg, setDescriptionImg ] = useState<string>("")
  const [ linkImg, setLinkImg ] = useState<string>("")

  const [ formTitle, setFormTitle ] = useState<string>("")
  const [ formDescription, setFormDescription ] = useState<string>("")
  const [ formTagMoment, setFormTagMoment ] = useState<string>("")
  const [ formTagDifficult, setFormTagDifficult ] = useState<string>("")
  const [ formTagAbility, setFormTagAbility ] = useState<string>("")
  const [ formTagSide, setFormTagSide ] = useState<string>("")
  const [ formTagMap, setFormTagMap ] = useState<string>("")
  const [ formTagMapPosition, setFormTagMapPosition ] = useState<string>("")
  const [ formTagAgent, setFormTagAgent ] = useState<string>("")

  useEffect(() => {
    api.get(`/post/${id}`).then(res => {
      let userApi = res.data
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

  function loadImage(event:any) {
    let formData = new FormData();
    formData.append("image", event.target.files[0]);

    // Envia a imagem para o backend e coleta o retorno
    api.post(`/postLoadFile`, formData).then((res) => {
      let urlImg = `${process.env.REACT_APP_API_HOST}/images/posts/${res.data.filename}`
      setLinkImg(urlImg)
    })
  }

  function deleteStep(_id: string) {
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
    console.log(copyImgAdded)

    // Atualiza no state
    setImgAdded(copyImgAdded)
  }


  function renderSteps() {
    return imgAdded.map(instruction => (
      <div key={instruction._id}>
        <hr /><br />
        <hr /><br />
        <button onClick={() => putPosition(instruction._id, 'bottom')} >Subir</button>
        <img src={instruction.img} alt={instruction.title} style={{width: '100%'}} /> <br />
        <p>{instruction.title}</p>
        <button onClick={() => deleteStep(instruction._id)}>Delete</button>

        <button onClick={() => putPosition(instruction._id, 'top')} >Descer</button>

        {/* <img src={instruction.img} alt={instruction.title} /> */}
        <hr />
      </div>
    ))
  }

  function addItem() {
    setImgAdded([...imgAdded, {title: descriptionImg, img: linkImg, _id: uuid.v4()}])
    setDescriptionImg('')
    setLinkImg('')
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

  return (
    <div className="container">
      <Navbar />
    <div className="post-local-container">
        {redirect ?  <Redirect to="/ViewPosts" /> : null }
        <NavbarComponent selected={navbarEnum.EditScreen} />
        <h1>Criar um post</h1>
        <div className="form">
          <label htmlFor="">Titulo</label>
          <input
              type="text" name="title" id="title"
              value={formTitle} onChange={(e) => setFormTitle(e.target.value)}
          />
          <label htmlFor="">Descrição</label>
          <input
              type="text" name="descricao" id="descricao"
              value={formDescription} onChange={(e) => setFormDescription(e.target.value)}
          />
          <div className="groupInput">
              <div className="groupInputSelet">
                <label>Agente</label>
                <select
                    value={formTagAgent}
                    onChange={(e) =>
                    setFormTagAgent(e.target.value)}
                    >
                    <option value=""></option>
                    {renderAgent()}
                </select>
              </div>
              <div className="groupInputSelet">
                <label>Mapa</label>
                <select
                    value={formTagMap}
                    onChange={(e) =>
                    setFormTagMap(e.target.value)}
                    >
                    <option value=""></option>
                    {renderMaps()}
                </select>
              </div>
              <div className="groupInputSelet">
                <label>Habilidade</label>
                <select
                    value={formTagAbility}
                    onChange={(e) =>
                    setFormTagAbility(e.target.value)}
                    >
                    <option value=""></option>
                    {renderHabilits()}
                </select>
              </div>
          </div>
          <div className="groupInput">
              <div className="groupInputSelet">
                <label>Posição</label>
                <select
                    value={formTagMapPosition}
                    onChange={(e) =>
                    setFormTagMapPosition(e.target.value)}
                    >
                    <option value="Qualquer">Qualquer</option>
                    <option value="Meio">Meio</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                </select>
              </div>
              <div className="groupInputSelet">
                <label>Momento</label>
                <select
                    value={formTagMoment}
                    onChange={(e) =>
                    setFormTagMoment(e.target.value)}
                    >
                    <option value=""></option>
                    <option value="QualquerMomento">QualquerMomento</option>
                    <option value="DepoisDoPlant">DepoisDoPlant</option>
                </select>
              </div>
              <div className="groupInputSelet">
                <label>Dificuldade</label>
                <select
                    value={formTagDifficult}
                    onChange={(e) =>
                    setFormTagDifficult(e.target.value)}
                    >
                    <option value=""></option>
                    <option value="Facil">Facil</option>
                    <option value="medio">medio</option>
                    <option value="hardcore">hardcore</option>
                </select>
              </div>
          </div>
          <div className="groupInputSelet">
              <label>Lado</label>
              <select
                value={formTagSide}
                onChange={(e) =>
                setFormTagSide(e.target.value)}
                >
                <option value=""></option>
                <option value="Defensores">Defensores</option>
                <option value="Atacantes">Atacantes</option>
              </select>
          </div>

          {renderSteps()}

          <label htmlFor="">Descrição</label>
          <input
              type="text" value={descriptionImg} placeholder="Descrição do passo a passo"
              onChange={(e) => setDescriptionImg(e.target.value)}
          />
          <img src={linkImg} alt={descriptionImg} style={{width: '100%'}} />
          <label className="customFileUpload">
          <input type="file" name="image" onChange={loadImage}  />
          <i className="fas fa-image"></i>
          </label>
          <button onClick={() => {addItem()}}>Adicionar Item</button>

          <hr />
          <button onClick={() => handleSubmit()}>Fazer post</button>
        </div>
    </div>
  </div>
  )
}

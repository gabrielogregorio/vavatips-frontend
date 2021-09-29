import React, { useState } from 'react'
import 'dotenv/config'
import { Redirect } from 'react-router-dom'
import { NavbarComponent, navbarEnum } from '../../../components/admin/navbar/navbar'
import api from '../../../services/api'
import '../../../style.post.css'
import { Navbar } from '../../../components/NavbarTop/NavbarTop'

import * as uuid from 'uuid';
type actionType = "top" | "bottom"
interface imgInterface {
  title: string,
  img: string,
  _id: string
}

export const CreatePostScreen = () => {
  const [ redirect, setRedirect ] = useState<boolean>(false)

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
      await api.post('/post', {...request})
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
    console.log(_id, action)
    // Obter a posição do item que será trocado
    let positionPut = imgAdded.findIndex(item => item._id === _id)
    console.log(positionPut)

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
    return imgAdded.map(instruction => (
      <div key={instruction._id}>
        <hr /><br />
        <hr /><br />
        <button onClick={() => putPosition(instruction._id, 'bottom')} >Subir</button>

        <img src={instruction.img} alt={instruction.title} style={{width: '100%'}} /> <br />
        <p>{instruction.title}</p>
        <button onClick={() => deleteStep(instruction._id)}>Delete</button>

        <button onClick={() => putPosition(instruction._id, 'top')} >Descer</button>
        <hr />
     </div>
    ))
  }

  function addItem() {
    setImgAdded([...imgAdded, {title: descriptionImg, img: linkImg, _id: uuid.v4()}])
    setDescriptionImg('')
    setLinkImg('')
  }


  return (
    <div className="container">
      <Navbar />
    <div className="post-local-container">
       {redirect ?  <Redirect to="/ViewPosts" /> : null }
       <NavbarComponent selected={navbarEnum.PostCreate} />
       <h1>Criar uma Dica</h1>
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
                   <option value="Sova">Sova</option>
                   <option value="Vyper">Vyper</option>
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
                   <option value="Ascent">Ascent</option>
                   <option value="Split">Split</option>
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
                   <option value="Spot">Spot</option>
                   <option value="BarreiraDeOrbe">BarreiraDeOrbe</option>
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
                   <option value=""></option>
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
          </div> <br />

          {renderSteps()}

          <hr /><br />


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
          <button onClick={() => {addItem()}}>Salvar Passo</button> <br />

          <hr />

          <button onClick={() => handleSubmit()}>Publicar Dica</button>
       </div>
    </div>
 </div>
  )


}

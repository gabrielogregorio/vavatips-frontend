import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BreadcrumbComponent } from "../../components/Breadcrumb/Breadcrumb";
import { FooterComponent } from "../../components/Footer/footer";
import { LoaderComponent } from "../../components/loader/loader";
import { NavbarComponentPublic, navbarEnumPublic } from "../../components/navbar_public/navbar";
import { maps } from '../../data/data-valorant'
import api from "../../services/api";

let breadcrumbs = [
  { url: '/', text: 'inicio'},
  { url: '/Maps', text: 'mapas'}
]



export const MapScreen = () => {
  const [ mapsApi, setMapsApi ] = useState<string[]>([])
  const [ activeLoader, setActiveLoader ] = useState<boolean>(true)
  const [ errorMsg, setErrorMsg ] = useState<string>('')

  useEffect(() => {
    api.get(`/maps`).then(res => {
      setMapsApi(res.data.maps)
      setActiveLoader(false)

    }).catch(error => {
      if(error.message === 'Network Error') {
        setErrorMsg('Erro de conexão com o servidor')
      } else {
        setErrorMsg('Erro desconhecido no servidor')
      }
      setActiveLoader(false)
    })
  }, [])

  function renderMap() {
    if (mapsApi.length === 0) {
      return null
    }

    return maps().map(map => {
      return mapsApi.includes(map.name) ? (
        <Link to={`/Agents?map=${map.name}`} className="grid" key={map.id}>
          <img src={map.img} alt={map.name} />
          <p>{map.name}</p>
        </Link>
      ) : null
    })
  }

  return (
    <div className="container">
      <NavbarComponentPublic selected={navbarEnumPublic.Inicio} />
      <BreadcrumbComponent breadcrumbs={breadcrumbs}/>

      <div className="subcontainer">
        <h1>Escolhe um mapa ai parça</h1>
        <p style={{textAlign: 'center'}} >Aqui você escolhe um mapa, um agente, e terá as melhores dicas para fazer durante sua gameplay!</p><br />
        <p className="errorMsg">{errorMsg}</p><br />
        <LoaderComponent active={activeLoader} />

        <div className="gridFull">
          {renderMap()}
          </div>
        </div>
        <FooterComponent color="primary" />
    </div>
  )
}

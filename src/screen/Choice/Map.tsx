import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BreadcrumbComponent } from "../../components/Breadcrumb";
import { Container } from "../../components/Container";
import { ErrorMsg } from "../../components/ErrorMsg";
import { FooterComponent } from "../../components/Footer";
import { H1 } from "../../components/H1";
import { Img } from "../../components/Img";
import { LoaderComponent } from "../../components/loader";
import { NavbarComponentPublic, navbarEnumPublic } from "../../components/navbar_public";
import { Subcontainer } from "../../components/Subcontainer";
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
    loadMaps()
  }, [])

  async function loadMaps() {
    const mapResponse = api.get(`/maps`)

    try {
      const [ maps ] = await Promise.all([ mapResponse ])
      const mapsJson = maps.data.maps

      setMapsApi(mapsJson)
      setActiveLoader(false)
    } catch(error) {
      setErrorMsg('Erro desconhecido no servidor')
      setActiveLoader(false)
    }
  }

  function renderMap() {
    if (mapsApi.length === 0) {
      return null
    }

    return maps().map(map => {
      return mapsApi.includes(map.name) ? (
        <Link to={`/Agents?map=${map.name}`} className="grid" key={map.id}>
          <Img src={map.img} alt={map.name} />
          <p>{map.name}</p>
        </Link>
      ) : null
    })
  }

  return (
    <Container>
      <NavbarComponentPublic selected={navbarEnumPublic.Inicio} />
      <BreadcrumbComponent breadcrumbs={breadcrumbs}/>

      <Subcontainer>
        <H1 title="Escolha um mapa ai parça" />
         <ErrorMsg msg={errorMsg} />
        <LoaderComponent active={activeLoader} />

         <div className="gridFull">
          {renderMap()}
          </div>
          </Subcontainer>
         <FooterComponent color="primary" />
        </Container>
  )
}

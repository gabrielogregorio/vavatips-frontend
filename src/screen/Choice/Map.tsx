import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FooterComponent } from "../../components/Footer/footer";
import { LoaderComponent } from "../../components/loader/loader";
import { NavbarComponentPublic, navbarEnumPublic } from "../../components/navbar_public/navbar";
import { maps } from '../../data/data-valorant'
import api from "../../services/api";


export const MapScreen = () => {
  const [ mapsApi, setMapsApi ] = useState<string[]>([])
  const [ activeLoader, setActiveLoader ] = useState<boolean>(true)

  useEffect(() => {
    api.get(`/maps`).then(res => {
      setMapsApi(res.data.maps)
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
      <div className="subcontainer">
        <h1>Iai Parça!</h1>
        <LoaderComponent active={activeLoader} />
        <p>Esse é um projeto feito por fãns do Valorant, com intenção de aumentar a qualidade das gameplays do nosso cenário. Aqui você poderá escolher um mapa, um agente e terá diversas dicas a respeito dele.</p>
      </div>

      <div className="subcontainer">
          <h1>Escolhe um mapa ai parça</h1>

          <div className="gridFull">
            {renderMap()}
          </div>
        </div>
        <FooterComponent color="primary" />
    </div>
  )
}

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NavbarComponentPublic, navbarEnumPublic } from "../../components/navbar_public/navbar";
import { maps } from '../../data/data-valorant'
import api from "../../services/api";

export const MapScreen = () => {
  const [ mapsApi, setMapsApi ] = useState<string[]>([])

  useEffect(() => {
    api.get(`/maps`).then(res => {
      setMapsApi(res.data.maps)
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
      <div>
        <NavbarComponentPublic selected={navbarEnumPublic.Inicio} />
        <h1>Escolha um mapa</h1>
        <div className="gridFull">
          {renderMap()}
        </div>
        </div>
    </div>
  )
}

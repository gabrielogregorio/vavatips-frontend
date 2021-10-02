import React from "react";
import { Link } from "react-router-dom";
import { NavbarComponentPublic, navbarEnumPublic } from "../../components/navbar_public/navbar";
import { maps } from '../../data/data-valorant'


export const MapChoiceScreen = () => {
  function renderMap() {
    return maps().map(map => (
      <Link to={`/Agents?map=${map.name}`} className="grid" key={map.id}>
        <img src={map.img} alt={map.name} />
        <p>{map.name}</p>
      </Link>
    ))
  }

  return (
    <div className="container">
      <div>
        <NavbarComponentPublic selected={navbarEnumPublic.Inicio} />
        <h1>Escolha um mapa</h1>
        <div>
          {renderMap()}
        </div>
        </div>
    </div>
  )
}

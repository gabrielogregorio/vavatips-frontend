import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from '../../components/NavbarTop/NavbarTop'
import { maps } from '../../data/data-valorant'
import './cards.css'


export const MapChoiceComponent = () => {
  function renderMap() {
    return maps().map(map => (
      <Link to={`/Agents?map=${map.name}`} className="gridItem" key={map.id}>
        <img src={map.img} alt={map.name} />
        <p>{map.name}</p>
      </Link>
    ))
  }



  return (
    <div className="container">
      <Navbar />
      <h1>Escolha um mapa</h1>
      <div>
        {renderMap()}
      </div>
    </div>
  )
}

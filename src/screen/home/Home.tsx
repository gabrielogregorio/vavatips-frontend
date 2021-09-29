import React from 'react'
import { Link } from 'react-router-dom'
import './cards.css'
import { Navbar } from '../../components/NavbarTop/NavbarTop'

export const HomeScreen = () => {
  return (
    <div className="container" >
      <Navbar />
      <h1>Dicas de Valorant</h1>
      <div>
        <Link to={"Maps"} className="gridItem">
          <img src="/images/tips/agentsAndMap.jpg" alt="Mapas e Agentes" />
          <p>Pixeis e Spots</p>
        </Link>

        <Link to="/Home" className="gridItem">
          <img src="/images/tips/agents.jpg" alt="Uso de Agentes" />
          <p>Dicas de Agentes</p>
        </Link>

        <Link to="/Home" className="gridItem">
          <img src="/images/tips/moviment.jpg" alt="Tipo e Movimentação" />
          <p>Tiro e movimentação</p>
        </Link>
      </div>
    </div>
  )
}

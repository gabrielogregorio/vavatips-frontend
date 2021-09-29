import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from '../../components/NavbarTop/NavbarTop'
import './cards.css'

interface mapInterface {
  id: number,
  name: string,
  img: string,
}

export const MapChoiceComponent = () => {
  let maps: mapInterface[] = [
    {
      id: 1,
      name: 'Ascent',
      img: '/images/maps/Ascent.png'
    },
    {
      id: 2,
      name: 'Bind',
      img: '/images/maps/Bind.png'
    },
    {
      id: 3,
      name: 'Breeze',
      img: '/images/maps/Breeze.jpg'
    },
    {
      id: 4,
      name: 'Fracture',
      img: '/images/maps/Fracture.jpg'
    },
    {
      id: 5,
      name: 'Haven',
      img: '/images/maps/Haven.png'
    },
    {
      id: 6,
      name: 'Icebox',
      img: '/images/maps/Icebox.png'
    },
    {
      id: 7,
      name: 'Split',
      img: '/images/maps/Split.jpg'
    },
  ]

  function renderMap() {
    return maps.map(map => (
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

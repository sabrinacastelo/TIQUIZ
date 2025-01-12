import React from 'react'
import '../style/logiccard.css'
import Exercism from '../images/exercism.png'
import Beecrowd from '../images/beecrowd.png'
import { NavLink } from 'react-router-dom'


function LogicCards() {
  return (
    <div className='all-cards'>
      <h1>Conheça alguns sites que te ajudam a treinar sua lógica de programação:</h1>
      <div className="cards-things">
        <NavLink to="https://exercism.org/" className="all-thing">
          <div class="image_container">
            <img className='image-cards' src={Exercism} alt="" />
          </div>
          <div class="title-brand">
            <span>Exercism</span>
          </div>
        </NavLink>
        <NavLink to="https://beecrowd.com/pt/" className="all-thing">
          <div class="image_container">
            <img className='image-cards' src={Beecrowd} alt="" />
          </div>
          <div class="title-brand">
            <span>Beecrowd</span>
          </div>
        </NavLink>
        <div class="all-thing">
          <div class="image_container">
            <img className='image-cards' src={Exercism} alt="" />
          </div>
          <div class="title-brand">
            <span>New brand name</span>
          </div>
        </div>
        <div class="all-thing">
          <div class="image_container">
            <img className='image-cards' src={Exercism} alt="" />
          </div>
          <div class="title-brand">
            <span>Viado</span>
          </div>
        </div>
      </div>
    </div >
  )
}

export default LogicCards
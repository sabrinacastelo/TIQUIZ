import React from 'react'
import Img from '../../images/puzzle-robot.png'
import './logic.css'
import LogicCards from '../../components/LogicCards'

function Logic() {
  return (
    <>
      <div className="things-2">
        <div className="txt-things">
          <h1>
            Treine sua lógica de programação!
          </h1>
          <p className='p-things'>Se você está buscando aprimorar suas habilidades na arte de programar, há uma infinidade
            de recursos e plataformas online que podem ajudar nesse processo.
            Diversos sites oferecem desde cursos e tutoriais interativos até exercícios práticos e
            desafios de programação, adequados tanto para iniciantes quanto para programadores mais avançados. </p>
        </div>
        <img className="puzzle-robot" src={Img} alt="" />
      </div>
      <LogicCards />
    </>
  )
}

export default Logic
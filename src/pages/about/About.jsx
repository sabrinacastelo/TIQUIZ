import React from 'react'
import Chatting from '../../images/chating-robot.png'
import './about.css'

function About() {
  return (
        <div className='navbar'>
            <div className='texts'>
                <h1>Fácil, Grátis e Divertido</h1>
                <h3 className='t-2'>Aprenda com um quiz educativo que proporciona uma maneira divertida de revisar o conteúdo,
                    tornando o aprendizado mais agradável e menos estressante.</h3>
            </div>
            <div className="chatting">
                <img src={Chatting} alt="" />
            </div>
        </div>

  )
}

export default About
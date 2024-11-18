import React from 'react'
import Flying from '../images/flying-robot.png'
import '../style/bars.css'

function Bars() {
    return (
        <div className='bars'>
            <div className="bar-text">
                <h1>Se mantenha motivado</h1>
                <p>Espera-se que o <b>TIQUIZ</b> contribua para uma melhor retenção
dos conceitos aprendidos, ajudando os usuários a manterem as informações na
memória por mais tempo. Assim, aumenta o engajamento dos estudantes com o
conteúdo curricular.</p>
            </div>
                <img className="bar-img" src={Flying} alt="" />
        </div>
    )
}

export default Bars
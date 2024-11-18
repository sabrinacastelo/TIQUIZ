import React from 'react'
import '../style/card.css'
import Pencil from '../images/pencil-robot.png'


function Card() {
    return (
        <div className="things">
            <img className='card-img' src={Pencil} alt="" />
            <div class="card">
            <h1>Aprendizado feito para você</h1>
            <p>
                Espera-se que o sistema facilite o processo
de aprendizagem ao permitir que os usuários revisem o conteúdo de maneira
autônoma e em seu próprio ritmo</p>
            </div>
        </div>

    )
}

export default Card
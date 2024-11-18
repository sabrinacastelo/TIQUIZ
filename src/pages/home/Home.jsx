import React from 'react'
import Welcome from '../../images/welcome-robot-2.png'
import './home.css'
import { NavLink } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Card from '../../components/Card'
import Bars from '../../components/Bars'
import EndPage from '../../components/EndPage'


function Home() {
    return (
        <>
            <div className='home'>
                <img src={Welcome} className='welcome-img' alt='Welcome Robot' />
                <div className="text-box">
                    <h1 className='title'>Uma ferramenta auxiliar para reforçar
                        os conhecimentos adquiridos em sala de aula.</h1>
                    <h3 className='subtitle'>Aprenda no seu próprio ritmo!</h3>
                    <br />
                    <NavLink to="/quiz" className='start'>Começar Quiz</NavLink>
                </div>
            </div>
            <hr />
            <div className="categories">
                <NavLink className='link'>Introdução a Computação</NavLink>
                <NavLink className='link'>Algoritmos e Programação</NavLink>
                <NavLink className='link'>Banco de Dados</NavLink>
                <NavLink className='link'>Estrutura de Dados</NavLink>
                <NavLink className='link'>Programação Orientada a Objeto</NavLink>
            </div>
            <hr />
            <Navbar />
            <Card />
            <Bars />
            <EndPage />
        </>
    )
}

export default Home
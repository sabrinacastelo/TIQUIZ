import React from 'react'
import { NavLink } from 'react-router-dom'
import Logo from '../images/tiquiz-logo.png'
import '../style/header.css'

function Header() {
    return (
        <>
            <div className="header">
                <NavLink to="/" className="header-link">
                    <img className='logo' src={Logo} alt="Logo" />
                </NavLink>
                {/* <div className="header-container">
                    <NavLink className="link">Início</NavLink>
                    <NavLink className="link">Ajuda</NavLink>
                    <NavLink className="link">Contato</NavLink>
                    <NavLink className="link">Sobre</NavLink>
                </div> */}
            </div>
        </>
    )
}

export default Header
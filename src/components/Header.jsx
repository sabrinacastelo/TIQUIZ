import React from 'react'
// import { NavLink } from 'react-router-dom'
import Logo from '../images/logo-quiz.png'
import '../style/header.css'

function Header() {
    return (
        <>
            <div className="header">
                {/* <NavLink to="/" className="header-link"> */}
                    <img className='logo' src={Logo} alt="Logo" />
                {/* </NavLink> */}
            </div>
        </>
    )
}

export default Header
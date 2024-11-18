import React from 'react'
import Video from '../images/video.mp4'
import '../style/end.css'
import { NavLink } from 'react-router-dom'

function EndPage() {
  return (
    <div className='end'>
        <h1>APRENDA ONDE E QUANDO QUISER</h1>
        <video className='video' src={Video} autoPlay loop muted></video>
        <NavLink to="/quiz" className="starts">Começar Quiz</NavLink>
        
        
    </div>
  )
}

export default EndPage
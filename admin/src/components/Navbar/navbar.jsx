import React from 'react'
import './navbar.css'
import {assets} from '../../assets/assets'

const navbar = () => {
  return (
    <div>
    <div className="navbar">
        <img className='logo' src={assets.logo} alt="" />
        <img className='profile' src={assets.profile_image} alt="" />
    </div>
    
    </div>
  )
}

export default navbar
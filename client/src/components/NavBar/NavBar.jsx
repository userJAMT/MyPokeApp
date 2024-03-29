import React from 'react'
import { Link } from 'react-router-dom'
import s from './NavBar.module.css'
import logo from '../../img/PokemonLogo.png'

function NavBar() {
  return (
    <div className={s.header}>
        <div className={s.logo}> <Link to = '/home'> <img src={logo} alt = 'POKEMON'></img> </Link> </div>
        <div className={s.create}> 
          <Link to = '/create'>  
            <button> Create your own Pokemon! </button>
          </Link> 
        </div>
    </div>
  )
}

export default NavBar
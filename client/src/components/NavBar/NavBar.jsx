import React from 'react'
import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <div>
      <ul>
        <li> <Link to = '/home'> HOME </Link> </li>
        <li> <Link to = '/create'> CREATE </Link> </li>
        <li>BARRA DE BUSQUEDA</li>
      </ul>
    </div>
  )
}

export default NavBar
import React from 'react'
import { Link } from 'react-router-dom'
import s from './Landing.module.css'
import BigLogo from '../../img/BigLogo.png'

function Landing() {
  return (
    <div className={s.body}>
      <div>
        <img src={BigLogo} alt="Logo"/>
        <Link to = '/home'>
          <button>GO</button>
        </Link>
      </div>
    </div>
  )
}

export default Landing
import React from 'react'
import { Link } from 'react-router-dom'

function Landing() {
  return (
    <div>
      <Link to = '/home'>
        <button>HOME</button>
      </Link>
    </div>
  )
}

export default Landing
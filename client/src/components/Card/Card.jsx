import React from 'react'
import './Card.css'

function Card({name, types, img}) {
  return (
    <div className='card'>
      <h2> {name} </h2>
      <img src={img} alt = 'img not found' width="200px" height="250px"/>
      {types?.map((e,i)=>{
        return <h4 key={i}>{e}</h4>
      })} 
    </div>
  )
}

export default Card
import React from 'react'
import s from './Card.module.css'

function Card({name, types, img}) {
  return (
    <div className={s.card}>
      <h2> {name} </h2>
      <img src={img} alt = 'img not found' width="200px" height="250px"/>
      {types?.map((e,i)=>{
        return <h4 key={i}>{e}</h4>
      })} 
    </div>
  )
}

export default Card
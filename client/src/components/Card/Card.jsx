import React from 'react'
import s from './Card.module.css'

function Card({name, types, img}) {
  return (
    <div className={s.card}>
      <div className={s.card2}>
        <h2> {name} </h2>
        <img className={s.img} src={img} alt = 'img not found'/>
        {types?.map((e,i)=>{
          return <h4 key={i}>{e}</h4>
        })} 
      </div>
    </div>
  )
}

export default Card
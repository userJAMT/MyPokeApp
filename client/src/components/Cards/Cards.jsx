import React from 'react'
import { Link } from 'react-router-dom'
import s from './Cards.module.css'
import Card from '../Card/Card.jsx'

function Cards({currentPokemons}) {
  return (    
    <div className={s.cards}>
        {currentPokemons.length < 1 ? <div>Can't find Pokemons</div> 
        : currentPokemons.map (el => {
            return (
              <Link to = {`/details/${el.id}`}>
                  <Card key = {el.id} name = {el.name} img = {el.img} types = {el.types} />
              </Link>
            )
          })} 
    </div>
  )
}

export default Cards
import React from 'react'
import { Link } from 'react-router-dom'
import s from './Cards.module.css'
import Card from '../Card/Card.jsx'
import pikachu from '../../img/pikachu.png'

function Cards({currentPokemons}) {
  return (    
    <div className={s.cards}>
        {currentPokemons.length < 1 ? <div className={s.notfound}>
        <div>COULDN'T FIND POKEMONS</div>
          <img src={pikachu} alt="Not found" />
        </div> 
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
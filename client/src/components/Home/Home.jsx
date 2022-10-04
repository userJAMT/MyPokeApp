import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, getTypes } from "../../actions/index.js";
import Card from '../Card/Card.jsx';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {

  const dispatch = useDispatch();
  const allPokemons = useSelector(state => state.pokemons);
  const allTypes = useSelector(state => state.types);

  useEffect(() => {
    dispatch(getPokemons());
    dispatch(getTypes());
  },[dispatch]);

  return (
    <div>
      <div className="filters"> Filter       
         by type <select className="by_type">
          <option value='all'> All </option>
          {
            allTypes?.map((type, i) =>{
              return <option key={i} value={type.name}>{type.name}</option>
            })
          }
        </select>

        by origin <select className="by_origin">
          <option value="all"> All </option>
          <option value="api"> Existing </option>
          <option value="db"> Created </option>
        </select>
      </div>

      <div className="sort"> Sort 
        by name <select className="by_name">
          <option value="asc"> Ascendant </option>
          <option value="dsc"> Descendant </option>
        </select>

        by attack <select className="by_attack">
          <option value="asc"> Ascendant </option>
          <option value=""> Descendant </option>
        </select>
      </div>

      <div className='cards'>
        {!allPokemons? <h4>Can't find Pokemons</h4> : allPokemons.map (el => {
            return (
              <Link to = {`/details/${el.id}`}>
                <Card name = {el.name} img = {el.img} types = {el.types} />
              </Link>
            )
        })} 
      </div>
    </div>
  )
}

export default Home
import React from "react";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import './Home.css';

import { useDispatch, useSelector } from "react-redux";
import { getPokemons, getTypes } from "../../actions/index.js";

import Card from '../Card/Card.jsx';
import Pagination from '../Pagination/Pagination.jsx'

function Home() {

  // Basics
  const dispatch = useDispatch();
  const allPokemons = useSelector(state => state.pokemons);
  const allTypes = useSelector(state => state.types);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage, setPokemonsPerPage] = useState(12);        // 12 pokemons per page
  const indexOfLastPokemon = currentPage * pokemonsPerPage; // In the current page
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage; // In the current page
  const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

  function paginate (pageNumber) {
    setCurrentPage(pageNumber)
  };

  // ComponentDidMount
  useEffect(() => {
    dispatch(getPokemons());
    dispatch(getTypes());
  },[dispatch]);

  return (
    <div>
      <div className="filters"> Filter       
         by type <select className="by_type">
          <option value='all'> All </option>
          {                                    // <<<<<---------------<<<>>>>------------------->>>>>
            allTypes?.map((type, i) =>{        // Recordar setear la page en 1 cuando filtre u ordene
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

      <Pagination 
      pokemonsPerPage = {pokemonsPerPage} 
      totalPokemons = {allPokemons.length} 
      paginate={paginate} 
      />

      <div className='cards'>
        {!currentPokemons? <h4>Can't find Pokemons</h4> : currentPokemons.map ((el, index) => {
          return (
            <Link to = {`/details/${el.id}`}>
              <Card key = {el.id} name = {el.name} img = {el.img} types = {el.types} />
            </Link>
            )
          })} 
      </div>

    </div>
  )
}

export default Home
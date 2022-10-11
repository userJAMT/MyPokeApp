import React from "react";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import './Home.css';

import { useDispatch, useSelector } from "react-redux";
import { 
  getPokemons, 
  getTypes, 
  filterByType, 
  filterCreated, 
  sortByName,
  sortByAttack
} from "../../actions/index.js";

import Card from '../Card/Card.jsx';
import Pagination from '../Pagination/Pagination.jsx';
import SearchBar from "../SearchBar/SearchBar";

function Home() {

  // Basics
  const dispatch = useDispatch();
  const allPokemons = useSelector(state => state.pokemons);
  const allTypes = useSelector(state => state.types);
  
  // Pagination
  const [order, setOrder] = useState('')
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage, setPokemonsPerPage] = useState(12);         // 12 pokemons per page
  const indexOfLastPokemon = currentPage * pokemonsPerPage;          // In the current page
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage; // In the current page
  let currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

  function paginate (pageNumber) {
    setCurrentPage(pageNumber)
  };

  // ComponentDidMount
  useEffect(() => {
    dispatch(getPokemons());
    dispatch(getTypes());
  },[dispatch]);

  // Handles

  function handleReload(e) {
    e.preventDefault()
    dispatch(getPokemons())
  }

  function handleFilterByType (e) {
    e.preventDefault()
    if (e.target.value === 'all') dispatch(getPokemons())
    else dispatch(filterByType(e.target.value))
    setCurrentPage(1)
  }

  function handleFilterCreated (e) {
    e.preventDefault()
    if (e.target.value === 'all') dispatch(getPokemons())
    else dispatch(filterCreated(e.target.value))
    setCurrentPage(1)
  }

  function handleSortByName (e) {
    e.preventDefault()
    dispatch(sortByName(e.target.value))
    setCurrentPage(1)
    setOrder(`${e.target.value} order`)
  }

  function handleSortByAttack (e) {
    e.preventDefault()
    dispatch(sortByAttack(e.target.value))
    setCurrentPage(1)
    setOrder(`${e.target.value} order`)
  }

  return (
    <div>
      <SearchBar setCurrentPage = {setCurrentPage}/>
      <button onClick={e => handleReload(e)}> Reload all pokemons </button>
      <div className="filters"> Filter       
         by type <select className="by_type" onChange={e => handleFilterByType(e)}>
          <option value='all'> All </option>
          {
            allTypes?.map((type, i) =>{
              return <option key={i} value={type.name}>{type.name}</option>
            })
          }
        </select>

        by origin <select className="by_origin" onChange={e => handleFilterCreated(e)}>
          <option value="all"> All </option>
          <option value="api"> Existing </option>
          <option value="db"> Created </option>
        </select>
      </div>

      <div className="sort"> Sort 
        by name <select className="by_name" onChange={e => handleSortByName(e)}>
          <option value="asc"> Ascendant </option>
          <option value="dsc"> Descendant </option>
        </select>

        by attack <select className="by_attack" onChange={e => handleSortByAttack(e)}>
          <option value="asc"> Ascendant </option>
          <option value="dsc"> Descendant </option>
        </select>
      </div>

      <Pagination 
      className = 'paginates'
      pokemonsPerPage = {pokemonsPerPage} 
      totalPokemons = {allPokemons.length} 
      paginate={paginate} 
      currentPage = {currentPage}
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

      <Pagination 
      className = 'paginates'
      pokemonsPerPage = {pokemonsPerPage} 
      totalPokemons = {allPokemons.length} 
      paginate={paginate} 
      currentPage = {currentPage}
      />

    </div>    
  )
}

export default Home
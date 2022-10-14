import React from "react";
import { useState, useEffect } from "react";
import s from './Home.module.css';
import dugtrio from '../../img/dugtrio.png'

import { useDispatch, useSelector } from "react-redux";
import { 
  getPokemons, 
  getTypes,
  getPokemonByName,
  filterByType,
  filterCreated, 
  sortByName,
  sortByAttack,
  backup
} from "../../actions/index.js";

import Pagination from '../../components/Pagination/Pagination.jsx';
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import Cards from "../../components/Cards/Cards.jsx";
import Filters from "../../components/Filters/Filters.jsx";
import Sort from "../../components/Sort/Sort.jsx";
import Loading from "../../components/Loading/Loading.jsx";

function Home() {

  // Basics
  const dispatch = useDispatch();
  const allPokemons = useSelector(state => state.pokemons);
  const allTypes = useSelector(state => state.types);
  const loading = useSelector(state => state.loading);
  const notFound = useSelector(state => state.notFound);
  
  // Pagination
  const [order, setOrder] = useState('')
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage, setPokemonsPerPage] = useState(12);         // 12 pokemons per page
  const indexOfLastPokemon = currentPage * pokemonsPerPage;          // In the current page
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage; // In the current page
  let currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon)

  function paginate (pageNumber) {
    setCurrentPage(pageNumber)
  };

  useEffect(() => {
    dispatch(getPokemons());
    dispatch(getTypes());
  },[dispatch]);

  function handleReload(e) { 
    e.preventDefault()
    dispatch(getPokemons())
  }

  async function onFilter (filters){
    dispatch(backup())
    if(filters.types.length > 0){
      for (let i = 0; i < filters.types.length; i++) {
        dispatch(filterByType(filters.types[i]))        
      }
    }
    if(filters.origin !== '') dispatch(filterCreated(filters.origin))
    setCurrentPage(1)
    setOrder(filters)
  }

  function onSort (attribute, order) {
    setOrder('order')
    if(attribute === 'name') dispatch(sortByName(order))
    if(attribute === 'attack') dispatch(sortByAttack(order))
    setCurrentPage(1)
    setOrder(`sort by ${attribute} in ${order} order`)
  }

  function onSearch (pokemon) {
    dispatch(getPokemonByName(pokemon))
    setCurrentPage(1)
  }

  return (
    <div className={s.body}>
      <div className={s.header}>
        <div className={s.first}>
          <SearchBar onSearch={onSearch}/>
          <button className={s.reload} onClick={e => handleReload(e)}> Reload all pokemons </button>
          <Sort onSort={onSort}/>
        </div>
        <div className={s.second}>
          <Filters allTypes={allTypes} onFilter={onFilter}/>
        </div>
      </div>

      <div className={s.main}>
        {loading? <Loading/>
        : notFound? <div className={s.notfound}>
          <div>POKEMON NOT FOUND</div>
          <img src={dugtrio} alt="Not found" />
        </div> 
        :<div>
          <Pagination 
          className = 'paginates'
          pokemonsPerPage = {pokemonsPerPage} 
          totalPokemons = {allPokemons.length} 
          paginate={paginate} 
          currentPage = {currentPage}
          />
    
          <Cards currentPokemons={currentPokemons}/>
    
          <Pagination 
          className = 'paginates'
          pokemonsPerPage = {pokemonsPerPage} 
          totalPokemons = {allPokemons.length} 
          paginate={paginate} 
          currentPage = {currentPage}
          />
        </div>
        }
      </div>
    </div>    
  )
}

export default Home
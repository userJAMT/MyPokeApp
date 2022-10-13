import React from 'react'
import s from './Pagination.module.css'

function Pagination({totalPokemons, pokemonsPerPage, paginate, currentPage}) {
    const pageNumber = []
    for (let i = 1; i <= Math.ceil(totalPokemons/pokemonsPerPage); i++) {
        pageNumber.push(i)
    }
  return (
    <div className={s.pagination}>
        <ul className={s.list}>
            {currentPage > 1 
            && <li><button onClick={() => paginate(currentPage-1)} >PREV</button></li>
            }
            {pageNumber?.map(number => (
                <li key={number} className={s.number}>
                    <button onClick={() => paginate(number)} disabled={currentPage === number} >{number}</button> 
                </li>
            ))}
            {currentPage < Math.ceil(totalPokemons/pokemonsPerPage) 
            && <li><button onClick={()=>paginate(currentPage+1)} >NEXT</button></li>}
        </ul>
    </div>
  )
}

export default Pagination
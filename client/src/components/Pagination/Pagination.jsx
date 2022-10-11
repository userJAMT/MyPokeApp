import React from 'react'

function Pagination({totalPokemons, pokemonsPerPage, paginate, currentPage}) {
    const pageNumber = []
    for (let i = 1; i <= Math.ceil(totalPokemons/pokemonsPerPage); i++) {
        pageNumber.push(i)
    }
  return (
    <div className='pagesNumbers'>
        <ul className="pagination">
            {pageNumber?.map(number => (
                <li key={number} className='number'>
                    <button onClick={() => paginate(number)} disabled = {currentPage === number} >{number}</button> 
                </li>
            ))}
        </ul>
    </div>
  )
}

export default Pagination
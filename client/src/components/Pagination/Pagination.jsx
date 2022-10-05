import React from 'react'

function Pagination({totalPokemons, pokemonsPerPage, paginate}) {
    const pageNumber = []
    for (let i = 1; i <= Math.ceil(totalPokemons/pokemonsPerPage); i++) {
        pageNumber.push(i)
    }
  return (
    <div>
        <ul className="pagination">
            {pageNumber?.map(number => (
                <li key={number} className='number'>
                    <a onClick={() => paginate(number)}>{number}</a> 
                </li>
            ))}
        </ul>
    </div>
  )
}

export default Pagination
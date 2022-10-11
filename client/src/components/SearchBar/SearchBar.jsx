import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { getPokemonByName } from '../../actions/index.js'

function SearchBar({setCurrentPage}) {

    const dispatch = useDispatch();
    const [name, setName] = useState('')

    function handleInputChange (e) {
        e.preventDefault();
        setName(e.target.value.toLowerCase());
    }
    function handleSubmit (e) {
        e.preventDefault();
        dispatch(getPokemonByName(name))
        setName('')
        setCurrentPage(1)
    }

  return (
    <form className='SearchBar' onSubmit={(e) => handleSubmit(e)}>
        <input 
        className='InputName' 
        type='text' 
        placeholder='Pokemon name...'
        value={name}
        onChange={(e) => handleInputChange(e)}
        />
        <button className='SearchButton' type='submit'>
            Search
        </button>
    </form>
  )
}

export default SearchBar
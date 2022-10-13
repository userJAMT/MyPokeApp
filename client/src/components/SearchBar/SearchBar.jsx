import React from 'react';
import { useState } from 'react';

function SearchBar({onSearch}) {

    const [name, setName] = useState('')

    const handleInput = (e) => {
        e.preventDefault()
        setName(e.target.value)
    }

    function handleSubmit (e) {
        e.preventDefault();
        onSearch(name.toLowerCase())
        setName('')
    }

  return (
    <form className='SearchBar' onSubmit={(e) => handleSubmit(e)}>
        <input 
        className='InputName' 
        type='text' 
        placeholder='Pokemon name...'
        value={name}
        onChange={e=>handleInput(e)}
        />
        <button className='SearchButton' type='submit'>
            Search
        </button>
    </form>
  )
}

export default SearchBar
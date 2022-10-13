import React from 'react';
import { useState } from 'react';

function validationSearch (nameInput) {
    let error = '';
    const validName = /^[a-zA-ZñÑ\s]+$/i;
    if (!validName.test(nameInput)) {
      error = "Sorry, only letters are allowed";
    }
    return error;
  };

function SearchBar({onSearch}) {

    const [name, setName] = useState('')
    const [error, setError] = useState('')

    const handleInput = (e) => {
      e.preventDefault()
      setName(e.target.value)
      setError(validationSearch(e.target.value))
    }

    function handleSubmit (e) {
      e.preventDefault();
      if(name[0] !== ' ') onSearch(name.toLowerCase());
      setName('');
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
        <button className='SearchButton' type='submit' disabled={error !== ''}>
            Search
        </button>
        <p>{error !== '' && <em>{error}</em>}</p>
    </form>
  )
}

export default SearchBar
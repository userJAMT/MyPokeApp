import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import s from './SearchBar.module.css'

function validationSearch (nameInput) {
    let error = '';
    const validName = /^[a-zA-ZñÑ\s]+$/i;
    if (!validName.test(nameInput) && nameInput) {
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
      if(!name) onSearch('');
      setName('');
    }

    useEffect(() => {
      if(name[0] !== ' ' && name) onSearch(name.toLowerCase());
    }, [name])
    

  return (
    <div className={s.box}>
      <form className={s.SearchBar} onSubmit={(e) => handleSubmit(e)}>
        <input
        class='input'
        className={s.InputName} 
        type='search' 
        placeholder='Pokemon name...'
        value={name}
        onChange={e=>handleInput(e)}
        />
        <button className={s.SearchButton} type='submit' disabled={error !== ''}>
          search
        </button>
      </form>
      <p><em className={s.em} hidden = {error === ''}>{error}</em></p>
    </div>
  )
}

export default SearchBar
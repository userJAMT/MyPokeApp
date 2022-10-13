import React, { useState } from 'react';
import s from './Sort.module.css';

function Sort({ onSort }) {

    function handleOnChange(e) {
        e.preventDefault()
        onSort(e.target.name, e.target.value)
    }
    
    return (
        <div className="sort">
            <div className={s.sortByName}>                
                <select name='name' onChange={e => handleOnChange(e)}>
                    <option value="asc"> A - Z </option>
                    <option value="dsc"> Z - A </option>
                </select>
            </div>

            <div className={s.sortByAttack}>                
            <select name='attack' onChange={e => handleOnChange(e)}>
                <option value="asc"> Weaker to Stronger </option>
                <option value="dsc"> Stronger to Weaker </option>
            </select>
            </div>
        </div> 
    )
}

export default Sort
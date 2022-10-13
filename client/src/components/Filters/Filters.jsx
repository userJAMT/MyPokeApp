import React, { useState } from 'react'
import s from './Filters.module.css'

function Filters({ allTypes, onFilter }) {

    const initialState = {
        types: [],
        origin: ''
    }
    const [filters, setFilters] = useState(initialState)

    function handleFilterByType(e){
        e.preventDefault()
        if(!filters.types.includes(e.target.value)){
            setFilters({
                ...filters,
                types: [...filters.types, e.target.value]
                })
        }
    }

    function handleFilterByOrigin (e) {
        e.preventDefault()
        setFilters({...filters, origin: e.target.value})
    }

    function handleDelete(e){
        setFilters({...filters, types: filters.types.filter(eachOne => eachOne !== e)})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onFilter(filters)
        e.target.value = 'default'
        setFilters(initialState)
    }

    return (
        <form className={s.filters} onSubmit={e => handleSubmit(e)}>  
            <label> Filter by Types </label> 
            <select 
            name='types'
            className={s.typesSelection}
            onChange={e => handleFilterByType(e)}
            disabled = {filters.types.length >= 2}
            defaultValue='default'
            >
                <option value='default' disabled> Types </option>
                {
                allTypes?.map((el, i) =>{
                    return (
                        <option 
                        key={'option '+i} 
                        value={el.name}
                        >
                            {el.name}
                        </option>
                    )
                })
                }
            </select>
            {filters.types?.map((el, i) => {
                return <span key={'span ' + i}>
                    {el}
                    <button key={'button ' + i} type='button' onClick={() => handleDelete(el)}>X</button>
                </span>
            })}
            
            <label> Filter by Origin</label>
            <select 
            name='origin'
            className={s.origin} 
            onChange={e => handleFilterByOrigin(e)}
            defaultValue=''
            >
                <option value=''> All </option>
                <option value="api"> Existing </option>
                <option value="db"> Created </option>
            </select>
            <input type="submit"/>
        </form>
    )
}

export default Filters
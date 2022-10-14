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
        setFilters(initialState)
    }

    return (
        <form className={s.filters} onSubmit={e => handleSubmit(e)}>
            <div className={s.first}>
                <label> Filter by Types </label> 
                <select 
                name='types'
                className={s.typesSelection}
                onChange={e => handleFilterByType(e)}
                disabled = {filters.types.length >= 2}
                defaultValue='all'
                >
                    <option value='all'> All </option>
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
                    return <span key={'span ' + i} className={s.spantype}>
                        {el}
                        <button key={'button ' + i} type='button' onClick={() => handleDelete(el)}>X</button>
                    </span>
                })}
            </div> 
            <br/>
            <div className={s.second}>
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
                <br/>
            </div>
            <input type="submit"/>
        </form>
    )
}

export default Filters
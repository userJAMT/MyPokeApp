import React, { useState } from 'react';
import { createPokemon, getTypes, getPokemons } from '../../actions/index.js';
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import validations from '../../functions/validations.js';

function Create() {

  const dispatch = useDispatch();
  let allTypes = useSelector(state => state.types);
  let allPokemons = useSelector(state => state.allPokemons); // para buscar que no se repita el nombre
  const history = useHistory();
  const [errors, setErrors] = useState({})
  
  const initialState = {
    name: '',
    img: '',
    hp: 1,
    attack: 5,
    defense: 5,
    speed: 5,
    weight: 1,
    height: 1,
    types: []
  }
  
  let [input, setInput] = React.useState(initialState)
  
  React.useEffect(()=>{
    dispatch(getTypes())
    dispatch(getPokemons())    
  }, [dispatch])
  
  // Handles

  let handleOnChange = (e) => {
    e.preventDefault()
    
    if (e.target.type === 'text') 
      setInput({...input, [e.target.name]: e.target.value.toLowerCase()})

    else if (e.target.type === 'number' || e.target.type === 'range')
      setInput({...input, [e.target.name]: parseInt(e.target.value)})
    
    else setInput({...input, [e.target.name]: e.target.value})
      
    setErrors(validations(allPokemons, {
      ...input,
      [e.target.name]: e.target.value
    }))
  }

  let handleOnChangeTypes= (e) => {
    e.preventDefault()
    if (!input.types.includes(e.target.value)){
      setInput({
        ...input,
        types: [...input.types, e.target.value]
      })
      setErrors(validations(allPokemons, {
        ...input,
        types: [...input.types, e.target.value]
      }))
    }
   }
  
  let handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(createPokemon(input))
    setInput(initialState)
    history.push('/home')
  }

  let handleDeleteType = (e) => {
    setInput({
      ...input,
      types: input.types.filter(eachOne => eachOne !== e)
    })
    setErrors(validations(allPokemons, {
      ...input,
      types: input.types.filter(eachOne => eachOne !== e)
    }))
  }

  return (
    <div>
      <h2> CREATE POKEMON </h2>
      <hr/>
      <form onSubmit={handleOnSubmit}>
        <div>
          <label>Pokemon's name:</label>
          <input
            type = 'text'
            name = 'name'
            value = {input.name}
            onChange = {e => handleOnChange(e)}
          />
          <p>{errors.name && <em className='errorMessage'>{errors.name}</em>}</p>
          
        </div>
        <div>
          <label>Pokemon's img: </label>
          <input
            type = 'url'
            name = 'img'
            value = {input.img}
            onChange = {e => handleOnChange(e)}
          />
          <p>{errors.img && <em className='errorMessage'>{errors.img}</em>}</p>
        </div>
        <div>
          <label>Pokemon's hp </label>
          <input
            type = 'range'
            name = 'hp'
            min = '1'
            max = '255'
            step='1'
            value = {input.hp}
            onChange = {e => handleOnChange(e)}
          />
          <input type='number' name='hp' value={input.hp} onChange = {e => handleOnChange(e)}/>
          <p>{errors.hp && <em className='errorMessage'>{errors.hp}</em>}</p>
          
        </div>
        <div>
          <label>Pokemon's attack: </label>
          <input
            type = 'range'
            name = 'attack'
            min = '5'
            max = '190'
            step='1'
            value = {input.attack}
            onChange = {e => handleOnChange(e)}
          />
          <input type='number' name='attack' value={input.attack} onChange = {e => handleOnChange(e)}/>
          <p>{errors.attack && <em className='errorMessage'>{errors.attack}</em>}</p>
          
        </div>
        <div>
          <label>Pokemon's defense: </label>
          <input
            type = 'range'
            name = 'defense'
            min = '5'
            max = '250'
            step='1'
            value = {input.defense}
            onChange = {e => handleOnChange(e)}
          />
          <input type='number' name='defense' value={input.defense} onChange = {e => handleOnChange(e)}/>
          <p>{errors.defense && <em className='errorMessage'>{errors.defense}</em>}</p>
          
        </div>
        <div>
          <label>Pokemon's speed: </label>
          <input
            type = 'range'
            name = 'speed'
            min = '5'
            max = '180'
            step='1'
            value = {input.speed}
            onChange = {e => handleOnChange(e)}
          />
          <input type='number' name='speed' value={input.speed} onChange = {e => handleOnChange(e)}/>
          <p>{errors.speed && <em className='errorMessage'>{errors.speed}</em>}</p>
          
        </div>
        <div>
          <label>Pokemon's weight: </label>
          <input
            type = 'range'
            name = 'weight'
            min = '1'
            max = '9999'
            step='1'
            value = {input.weight}
            onChange = {e => handleOnChange(e)}
          />
          <input type='number' name='weight' value={input.weight} onChange = {e => handleOnChange(e)}/>
          <p>{errors.weight && <em className='errorMessage'>{errors.weight}</em>}</p>
          
        </div>
        <div>
          <label>Pokemon's height: </label>
          <input
            type = 'range'
            name = 'height'
            min = '1'
            max = '200'
            step='1'
            value = {input.height}
            onChange = {e => handleOnChange(e)}
          />
          <input type='number' name='height' value={input.height} onChange = {e => handleOnChange(e)}/>
          <p>{errors.height && <em className='errorMessage'>{errors.height}</em>}</p>          
        </div>
        <div className='Types'>
          <label>Pokemon's types: </label>
          <select 
          className = 'types_selection'
          defaultValue='none'
          disabled = {input.types.length >= 2}
          onChange={(e)=>handleOnChangeTypes(e)}
          >
            <option value="none" disabled> Select a type... </option>
            {
              allTypes?.map((type, i) => {
                return <option key ={i} value={type.name} >{type.name}</option>
              })
            }
          </select>
          {input.types?.map((e,i)=>{
            return <span key = {i}>
              {e}
              <button type='button' onClick={()=>handleDeleteType(e)}>X</button>
            </span>
          })}
          <p>{errors.types && <em className='errorMessage'>{errors.types}</em>}</p>  
        </div>
        <input type ='submit' value='Create' disabled = {!input.name || Object.keys(errors).length !== 0 ? true : false} />        
      </form>
    </div>
  )
}

export default Create
import React from 'react';
import { createPokemon, getTypes, getPokemons } from '../../actions/index.js';
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';


function Create() {

  const dispatch = useDispatch();
  let allTypes = useSelector(state => state.types);
  let allPokemons = useSelector(state => state.pokemons);

  const history = useHistory();

  React.useEffect(()=>{
    dispatch(getTypes());
    dispatch(getPokemons());
  }, [dispatch])

  const initialState = {
    name: '',
    img: '',
    hp: 10,
    attack: 10,
    defense: 10,
    speed: 10,
    weight: 50,
    height: 5,
    types: [],
  }

  let [input, setInput] = React.useState(initialState)

  let handleOnChange = (e) => {
    setInput(prev => ({...prev, [e.target.name]: e.target.value}))
  }

  let handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(createPokemon(input))
    setInput(initialState)
    history.push('/home')
  }

  return (
    <div>
      <h2> CREATE POKEMON </h2>
      <div>{allPokemons.lenght}</div>
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
        </div>
        <div>
          <label>Pokemon's img: </label>
          <input
            type = 'url'
            name = 'img'
            value = {input.img}
            onChange = {e => handleOnChange(e)}
          />
        </div>
        <div>
          <label>Pokemon's hp </label>
          <input
            type = 'number'
            name = 'hp'
            value = {input.hp}
            onChange = {e => handleOnChange(e)}
          />
        </div>
        <div>
          <label>Pokemon's attack: </label>
          <input
            type = 'number'
            name = 'attack'
            value = {input.attack}
            onChange = {e => handleOnChange(e)}
          />
        </div>
        <div>
          <label>Pokemon's defense: </label>
          <input
            type = 'number'
            name = 'defense'
            value = {input.defense}
            onChange = {e => handleOnChange(e)}
          />
        </div>
        <div>
          <label>Pokemon's speed: </label>
          <input
            type = 'number'
            name = 'speed'
            value = {input.speed}
            onChange = {e => handleOnChange(e)}
          />
        </div>
        <div>
          <label>Pokemon's weight: </label>
          <input
            type = 'number'
            name = 'weight'
            value = {input.weight}
            onChange = {e => handleOnChange(e)}
          />
        </div>
        <div>
          <label>Pokemon's height: </label>
          <input
            type = 'number'
            name = 'height'
            value = {input.height}
            onChange = {e => handleOnChange(e)}
          />
        </div>
        {/* <div>
          <label>Pokemon's types: </label>
          <input
            type = 'text'
            name = 'types'
            value = {input.types}
            onChange = {e => handleOnChange(e)}
          />
        </div> */}
        <input type ='submit' value="CREATE" disabled = {!input.name ? true : false} />
        
      </form>
    </div>
  )
}

export default Create
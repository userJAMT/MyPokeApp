import { 
    CREATE_POKEMON, 
    GET_POKEMONS, 
    GET_BY_ID, 
    GET_TYPES,
    GET_POKEMON_BY_NAME,
    FILTER_POKEMON_BY_TYPE,
    FILTER_POKEMON_CREATED,
    SORT_BY_NAME,
    SORT_BY_ATTACK,
    LOADING, 
    CLEAR,
    NOT_FOUND,
    BACKUP
} from "../actions_types"
import axios from 'axios'

export function createPokemon (payload) {
    return async function (dispatch) {    
        const pokemon = await axios.post('http://localhost:3001/pokemons', payload)
        dispatch({
            type: CREATE_POKEMON,
            payload: pokemon.data
        })       
    }
}

export function getPokemons () {
    return function (dispatch) {
        dispatch(loading())
        return axios.get('http://localhost:3001/pokemons')
        .then (res => dispatch({
            type: GET_POKEMONS,
            payload: res.data
        }))
    }
}

export function getPokemonByName (name) {
    return function (dispatch) {
        dispatch(loading())
        return axios.get ('http://localhost:3001/pokemons?name=' + name)
        .then (res => dispatch({
            type: GET_POKEMON_BY_NAME,
            payload: res.data
        }))
        .catch(e=>{
            dispatch({
                type: NOT_FOUND,
                payload: e.response.data
            })
        })
    }
}

export function getById (id) {
    return function (dispatch) {
        dispatch(loading())
        return axios.get(`http://localhost:3001/pokemons/${id}`)
        .then (res => dispatch({
            type: GET_BY_ID,
            payload: res.data
        }))
    }
}

export function getTypes () {
    return function (dispatch) {
        return axios.get('http://localhost:3001/types')
        .then (res => dispatch({
            type: GET_TYPES,
            payload: res.data
        }))
    }
}

export function filterByType (payload) {
    return {
        type: FILTER_POKEMON_BY_TYPE,
        payload
    }
}

export function filterCreated (payload) {
    return {
        type: FILTER_POKEMON_CREATED,
        payload
    }
}

export function sortByName (payload) {
    return {
        type: SORT_BY_NAME,
        payload
    }
}

export function sortByAttack (payload) {
    return {
        type: SORT_BY_ATTACK,
        payload
    }
}

export function loading () {
    return {
        type: LOADING
    }
}

export function clear () {
    return {
        type: CLEAR
    }
}

export function backup () {
    return {
        type: BACKUP
    }
}
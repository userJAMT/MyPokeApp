import { CREATE_POKEMON, GET_POKEMONS, GET_BY_ID, GET_TYPES, DELETE, LOADING, CLEAR } from "../actions_types"
import axios from 'axios'

// Revisar si con los axios se necesita entrar a la data con res.data

export function createPokemon (payload) { // Recordar que en la info de data se debe agregar lo que esta en el formulario de creacion y agregar un id de la forma "BD" + state.pokemons.length - 39
    return async function () { 
        // Verificar si es necesario un loading aca
        return await axios.post('http://localhost:3001/pokemons', payload)
    }
}

export function getPokemons () {
    return function (dispatch) {
        dispatch(loading())
        return axios.get('http://localhost:3001/pokemons')
        .then (res => dispatch({
            type: GET_POKEMONS,
            payload: res
        }))
    }
}

export function getById (id) { // Puede ser un numero o un string de la forma "BD" + numero
    return function (dispatch) {
        dispatch(loading())
        return axios.get(`http://localhost:3001/pokemons/${id}`)
        .then (res => dispatch({
            type: GET_BY_ID,
            payload: res.id
        }))
    }
}

export function getTypes () {
    return function (dispatch) {
        // dispatch(loading()) // Revisar si es necesario un loading aca
        return axios.get('http://localhost:3001/types')
        .then (res => dispatch({
            type: GET_TYPES,
            payload: res
        }))
    }
}


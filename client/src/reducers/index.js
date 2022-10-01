import { CREATE_POKEMON, GET_POKEMONS, GET_BY_ID, GET_TYPES, DELETE, LOADING, CLEAR } from "../actions_types"

const initialState = {
    pokemons: [],
    pokemonDetail: {},
    types: [],
    loading: false
}

export default function reducer (state = initialState, action){
    switch (action.type ){
        case CREATE_POKEMON:
            return {
                ...state
            }
        
        case GET_POKEMONS:
            return{
                ...state,
                pokemons: action.payload,
                loading: false
            }
        
        case GET_BY_ID:
            return {
                ...state,
                pokemonDetail: action.payload,
                loading: false
            }
        
        case GET_TYPES:
            return {
                ...state,
                types: action.payload,
                loading: false
            }

        case DELETE:
            return {
                ...state,
                pokemons: state.pokemons.filter(e => e.id !== action.payload),
                loading: false
            }

        case LOADING:
            return {
                ...state,
                loading: true
            }

        case CLEAR:
            return {
                ...state,
                pokemonDetail: {}
            }

        default: return state
    }
}
import { CREATE_POKEMON, GET_POKEMONS, GET_BY_ID, GET_TYPES/*, DELETE*/, LOADING, CLEAR } from "../actions_types"

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
                ...state,
                pokemonDetail: action.payload
            }
        
        case GET_POKEMONS:
            return{
                ...state,
                loading: false,
                pokemons: action.payload                
            }
        
        case GET_BY_ID:
            return {
                ...state,
                loading: false,
                pokemonDetail: action.payload
            }
        
        case GET_TYPES:
            return {
                ...state,
                loading: false,
                types: action.payload
            }

        // case DELETE:
        //     return {
        //         ...state,
        //         loading: false,
        //         pokemons: state.pokemons.filter(e => e.id !== action.payload)
        //     }

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
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
    CLEAR 
} from "../actions_types"

const initialState = {
    pokemons: [],
    allPokemons: [],
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
                pokemons: action.payload,
                allPokemons: action.payload
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
        
        case GET_POKEMON_BY_NAME:
            return {
                ...state,
                pokemons: [action.payload]
            }

        case FILTER_POKEMON_BY_TYPE:
            return {
                ...state,
                pokemons: state.allPokemons.filter(p=>p.types.includes(action.payload))
            }

        case FILTER_POKEMON_CREATED:
            return {
                ...state,
                pokemons: action.payload === 'db' 
                ? state.allPokemons.filter(p=>isNaN(p.id))
                : state.allPokemons.filter(p=>!isNaN(p.id))
            }

        case SORT_BY_NAME:
            const sort = action.payload === "asc" 
            ? state.pokemons.sort((a, b) => {
                let first = a.name.toLowerCase();
                let second = b.name.toLowerCase();
                if(first > second) return 1;
                if(first < second) return -1;
                return 0;
            }) 
            : state.pokemons.sort((a, b) => {
                let first = a.name.toLowerCase();
                let second = b.name.toLowerCase();
                if(first > second) return -1;
                if(first < second) return 1;
                return 0;
            })
            return {
                ...state,
                pokemons: sort
            }

        case SORT_BY_ATTACK:
            const sort_atk = action.payload === "asc" 
            ? state.pokemons.sort((first, second) => {
                return first.attack - second.attack
            })
            : state.pokemons.sort((first, second) => {
                return second.attack - first.attack
            })
            return {
                ...state,
                pokemons: sort_atk
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
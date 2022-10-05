import { 
    CREATE_POKEMON, 
    GET_POKEMONS, 
    GET_BY_ID, 
    GET_TYPES,
    FILTER_POKEMON_BY_TYPE,
    FILTER_POKEMON_CREATED,
    ORDER_BY_NAME,
    ORDER_BY_ATTACK,
    LOADING, 
    CLEAR 
} from "../actions_types"

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

        case FILTER_POKEMON_BY_TYPE:
            return {
                ...state,
                pokemons: state.pokemons.filter(p=>p.types.includes(action.payload))
            }

        case FILTER_POKEMON_CREATED:
            return {
                ...state,
                pokemons: action.payload === 'db' 
                ? state.pokemons.filter(p=>isNaN(p.id))
                : state.pokemons.filter(p=>!isNaN(p.id))
            }

        case ORDER_BY_NAME:
            const order = action.payload === "asc" 
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
                pokemons: order
            }

        case ORDER_BY_ATTACK:
            const order_atk = action.payload === "asc" 
            ? state.pokemons.sort((first, second) => {
                return first.attack - second.attack
            }) 
            : state.pokemons.sort((first, second) => {
                return second.attack - first.attack
            })
            return {
                ...state,
                pokemons: order_atk
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
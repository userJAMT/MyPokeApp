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

const initialState = {
    pokemons: [],
    allPokemons: [],
    pokemonDetail: {},
    types: [],
    loading: false,
    notFound: false
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
                loading: false,
                notFound: false,
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
                types: action.payload
            }
        
        case GET_POKEMON_BY_NAME:
            return {
                ...state,
                notFound: false,
                loading: false,
                pokemons: action.payload
            }

        case FILTER_POKEMON_BY_TYPE:
            return {
                ...state,
                pokemons: state.pokemons.filter(p=>p.types.map(t=>t.name).includes(action.payload))
            }

        case FILTER_POKEMON_CREATED:
            return {
                ...state,
                pokemons: action.payload === 'db' 
                ? state.pokemons.filter(p=>p.id > 40)
                : state.pokemons.filter(p=>p.id <= 40)                 
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
                notFound: false,
                pokemonDetail: {}
            }

        case NOT_FOUND:
            return {
                ...state,
                loading: false,
                notFound: true
            }

        case BACKUP:
            return {
                ...state,
                loading:false,
                notFound: false,
                pokemons: state.allPokemons
            }

        default: return state
    }
}
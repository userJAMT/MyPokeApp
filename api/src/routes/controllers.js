const axios = require ('axios');
const { Pokemon, Type } = require ('../db.js');

const getPokemonsInApi = async () => {
    try {
        // let pokemons1 = axios.get('https://pokeapi.co/api/v2/pokemon')
        // let pokemons2 = axios.get(pokemons1.data.next)
        // let allPokemons = pokemons1.concat(pokemons2)
        let pokemonsList = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=40')
        // Accedo a la url de cada pokemon dada por la API y almaceno cada get en un array
        let pokemonsUrls = pokemonsList.data.results.map(pokemon => axios.get(pokemon.url));
        // Accedo al arreglo de promesas
        let pokemons = Promise.all(pokemonsUrls)
        // Me quedo con los datos que me interesan
        .then(pokemons => {
            let pokemonFullData = pokemons.map(r => r.data)
            let pokemon = pokemonFullData.map(r=> {
                return {
                    img: r.sprites.other["official-artwork"].front_default,
                    name: r.name,
                    types: r.types.map(e=>e.type.name),
                    attack:r.stats[1].base_stat,
                    id: r.id               
                }
            })
            return pokemon;
        })
        return pokemons;
    }catch(error){
        throw new Error('No se logro acceder a la API')
    }
}

const getPokemonByIdInApi = async (id) => {
    try {
        let p = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        let r = p.data;
        let pokemon = {
            img: r.sprites.other["official-artwork"].front_default,
            name: r.name,
            types: r.types.map(e=>e.type.name),
            id: r.id,
            hp: r.stats[0].base_stat,
            attack: r.stats[1].base_stat,
            defense: r.stats[2].base_stat ,
            speed: r.stats[5].base_stat ,
            height: r.height,
            weight: r.weight
        } 
        return pokemon;
    }catch(err){
        return undefined;
    }
}


    // async function a(){
    //     var b = await getPokemonByIdInApi(5)
    //     console.log (b)
    // }
    // a()

module.exports = { getPokemonsInApi, getPokemonByIdInApi }
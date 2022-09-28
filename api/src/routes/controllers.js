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
                    attack:r.stats[1].base_stat                    
                }
            })
            return pokemon;
        })
        return pokemons;
    }catch(error){
        throw new Error('No se logro acceder a la API')
    }
}
    // async function a(){
    //     var a = await getPokemonsInApi()
    //     console.log (a[2])
    // }
    // a()



module.exports = { getPokemonsInApi }
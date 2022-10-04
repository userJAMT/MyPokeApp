const axios = require("axios");
const { getPokemonsInApi, getPokemonByIdInApi } = require('./controllers.js')
const { Router } = require('express');
const { Pokemon, Type } = require('../db.js');

const router = Router();

router.get ('/', async (req, res) => {
    try {
        const { name } = req.query;
        if(!name){ // No hay query
            const pokemonsInApi = await getPokemonsInApi();
            let pokemonsInDb = await Pokemon.findAll({
                include: {
                    model: Type,
                    attributes: ["name"],
                    through: {attributes : []}
                },
                attributes: ['img', 'name', 'attack', 'id']
            });
            // Reorganizamos la data
            pokemonsInDb= pokemonsInDb.map(pokemon=>{
                pokemon = pokemon.dataValues;
                pokemon.types = pokemon.types.map (e=>e.dataValues.name)
                return pokemon
            })
            const allPokemons = pokemonsInApi.concat(pokemonsInDb);
            return res.json(allPokemons)
        }
        // Hay query
        const lowerName = name.toLowerCase()
        const pokemonApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${lowerName}`)
        .catch(e=>undefined)
        if(!pokemonApi){ // No se encontro en la PokeApi
            const pokemonDb = await Pokemon.findOne({
                where: {
                    name: lowerName
                },
                include: {
                    model: Type,
                    attributes: ["name"],
                    through: {attributes : []}
                }
            })

            if(!pokemonDb) return res.status(400).send({message: 'No se encontro el pokemon'})
            else {
                pokemonDb.dataValues.types = pokemonDb.dataValues.types.map(e=>e.dataValues.name)
                return res.send(pokemonDb.dataValues);
            }
        }
        else{ // Si se encontro en la pokeApi
            let r = pokemonApi.data;
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
            return res.send(pokemon);
        }
        
    } catch (error) {
        res.status(500).send({message: error.message})
    }
})

router.get ('/:id', async (req, res) => {
    try{
        let {id} = req.params
        let pokemonApi = await getPokemonByIdInApi(id);
        if(!pokemonApi){
            let pokemonDb = await Pokemon.findByPk(id, {
                include: {
                    model: Type,
                    attributes: ["name"],
                    through: {attributes : []}
                }
            })
            if (pokemonDb){
                pokemonDb.dataValues.types = pokemonDb.dataValues.types.map(e=>e.dataValues.name)
                return res.send(pokemonDb.dataValues);
            }
            else return res.status(400).send({message: 'No se encontro un pokemon con ese ID'})
        }
        else res.send (pokemonApi)        
    }catch (err){
        res.status(500).send({message: err.message})
    }    
})

router.post ('/', async (req, res) => {
    let { img, name, hp, attack, defense, speed, weight, height, types } = req.body;
    const lowerName = name.toLowerCase()
    if(!img) img = 'https://i.imgur.com/G4WCJsE.png';
    const pokemon = await Pokemon.create ({
        img,
        name: lowerName,
        hp,
        attack,
        defense,
        speed,
        weight,
        height
    })
    const type = await Type.findAll({
        where: { name: types }
    })
    pokemon.addType(type);
    pokemon.dataValues.types = type.map(e => e.dataValues.name);
    res.send(pokemon);
})

module.exports = router;
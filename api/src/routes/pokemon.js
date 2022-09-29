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
            const pokemonsInDb = await Pokemon.findAll({
                include: Type,
                attributes: ['img', 'name', 'attack']
            });
            const allPokemons = pokemonsInApi.concat(pokemonsInDb);
            return res.json(allPokemons)
        }
        // Hay query
        const pokemonApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)//FALTA ARREGLAR
        .catch(e=>undefined)
        if(!pokemonApi){ // No se encontro en la PokeApi
            const pokemonDb = await Pokemon.findOne({
                where: {
                    name
                },
                include: Type
            })
            if(!pokemonDb.dataValues) return res.status(400).send({message: 'No se encontro el pokemon'})
            else return res.send(pokemonDb.dataValues);
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
            return pokemon;
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
                include: Type,
                attributes: [
                    'id', 
                    'img', 
                    'name', 
                    'hp', 
                    'attack', 
                    'defense', 
                    'speed', 
                    'weight', 
                    'height'
                ]
            })
            pokemonDb ? res.send(pokemonDb) 
            : res.status(400).send({message: 'No existe el pokemon'})
        } 
        else res.send (pokemonApi)        
    }catch (err){
        res.status(500).send({message: err.message})
    }    
})

router.post ('/', async (req, res) => {
    const { img, name, hp, attack, defense, speed, weight, height, types, id } = req.body;
    const pokemon = await Pokemon.create ({
        img,
        name,
        hp,
        attack,
        defense,
        speed,
        weight,
        height,
        id
    })
    const type = await Type.findAll({
        where: { name: types }
    })
    pokemon.addType(type);
    res.send(pokemon);
})

module.exports = router;
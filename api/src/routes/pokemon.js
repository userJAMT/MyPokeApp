const axios = require("axios");
const { getPokemonsInApi } = require('./controllers.js')
const { Router } = require('express');
const { Pokemon, Type } = require('../db.js');

const router = Router();

router.get ('/', async (req,res) => {
    try {
        const { name } = req.query;    
        if(!name){ // No hay query
            const pokemonsInApi = await getPokemonsInApi();
            const pokemonsInDb = await Pokemon.findAll({
                attributes: [],
                include: Type
            });
            const allPokemons = pokemonsInApi.concat(pokemonsInDb);
            return res.json(allPokemons)
        }
        // Hay query
        const pokemonApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .catch(err => {return {message: err}})
        if(!pokemonApi){ // No se encontro en la PokeApi
            const pokemonDb = Pokemon.findOne({
                where: {
                    name
                },
                include: Type
            })
            if(!pokemonDb) return res.status(400).send({message: 'No se encontro el pokemon'})
            else return res.send('algo');
        }
        else{ // Si se encontro en la pokeApi
            return res.send(pokemonApi.data);
        }
        
    } catch (error) {
        res.status(500).send({message: error.message})
    }
})

module.exports = router;
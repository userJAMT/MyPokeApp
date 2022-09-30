const axios = require("axios");
const { Router } = require('express');
const { Type } = require('../db.js');

const router = Router();

router.get("/", async (req, res) => {
    let dbTypes = await Type.findAll().catch(e => undefined)
    if (!dbTypes.length){
        let api = await axios.get("https://pokeapi.co/api/v2/type")
        .catch(e=>{return {message:'No logro acceder a la API'}})
        let types = api.data.results.map(e => e.name)
        for (let i = 0; i<types.length; i++){
            await Type.create({name: types[i]})
        }
        dbTypes = await Type.findAll()
        .catch(e => {return {message: 'Error al buscar en la DB'}})
        return res.send(dbTypes)
    }
    return res.send(dbTypes)
})

module.exports = router;
const { Router } = require('express');
const pokemon = require('./pokemon.js');
const type = require('./type.js');

const router = Router();

router.use('/pokemons', pokemon);
router.use('/types', type);

module.exports = router;

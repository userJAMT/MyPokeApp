const { Router } = require("express");
const pokemons = require("./pokemons.js");
const types = require("./types.js");

const router = Router();

router.use("/pokemons", pokemons);
router.use("/types", types);

module.exports = router;

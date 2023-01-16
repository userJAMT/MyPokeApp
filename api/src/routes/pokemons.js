const axios = require("axios");
const { Router } = require("express");
const {
  getPokemons,
  getPokemonById,
  postPokemon,
} = require("../controllers/pokemon.js");

const router = Router();

router.get("/", getPokemons);
router.get("/:id", getPokemonById);
router.post("/", postPokemon);

module.exports = router;

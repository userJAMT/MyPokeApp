const { Pokemon, Type } = require("../db.js");
const { Op } = require("sequelize");

const getPokemons = async (req, res) => {
  let { name } = req.query;

  let conditions = {}; // Order, Includes, Attributes, Where
  let where = {}; // Filters

  // Add filters
  if (name) where.name = { [Op.iLike]: `${name}%` };

  // Add conditions
  conditions.where = where;
  conditions.attributes = ["img", "name", "attack", "id"];
  conditions.include = {
    model: Type,
    attributes: ["name"],
    through: { attributes: [] },
  };

  console.log(conditions);

  try {
    // Search pokemons
    const data = await Pokemon.findAll(conditions);
    if (!data.length) return res.status(404).json({ msg: "Not Found" });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send({ msg: "Server error", error: error.message });
  }
};

const getPokemonById = async (req, res) => {
  const { id } = req.params;
  try {
    const pokemon = await Pokemon.findByPk(id, {
      include: {
        model: Type,
        attributes: ["name"],
        through: { attributes: [] },
      },
    });
    if (!pokemon) return res.status(404).json({ msg: "Not Found" });
    return res.send(pokemon);
  } catch (error) {
    res.status(500).send({ msg: "Server error", error: error.message });
  }
};

const postPokemon = async (req, res) => {
  let body = req.body;
  body.name = body.name.toLowerCase();
  if (!body.img) body.img = "https://i.imgur.com/G4WCJsE.png";
  const pokemon = await Pokemon.create(body);
  const type = await Type.findAll({
    where: { name: body.types },
  });
  pokemon.addType(type);
  res.send(pokemon);
};

module.exports = { getPokemons, getPokemonById, postPokemon };

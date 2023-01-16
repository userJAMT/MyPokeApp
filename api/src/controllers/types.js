const { Type } = require("../db.js");

const getTypes = async (req, res) => {
  const types = await Type.findAll();
  return res.send(types);
};

module.exports = { getTypes };

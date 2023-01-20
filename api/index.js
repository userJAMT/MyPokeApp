//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require("./src/app.js");
const { getPokemonsInApi, getTypesInApi } = require("./src/controllers/api.js");
const { conn, Pokemon, Type } = require("./src/db.js");
const { PORT } = process.env;

// Syncing all the models at once.
conn.sync({ force: false }).then(async () => {
  server.listen(PORT, () => {
    console.log(`%s listening at ${PORT}`); // eslint-disable-line no-console
  });
  try {
    let types = await Type.findAll();
    if (!types.length) {
      console.log("No hay Tipos, obteniendo de la API");
      types = await getTypesInApi();
      for (let i = 0; i < types.length; i++) {
        await Type.create(types[i]);
      }
      console.log("Realizado con éxito");
    } else console.log("Ya existen Tipos en la base de datos");
    let pokemons = await Pokemon.findAll();
    if (!pokemons.length) {
      console.log("No hay Pokemons, obteniendo de la API");
      pokemons = await getPokemonsInApi();
      for (let i = 0; i < pokemons.length; i++) {
        let pokemon = await Pokemon.create(pokemons[i]);
        let type = await Type.findAll({
          where: { name: pokemons[i].types },
        });
        pokemon.addType(type);
      }
      console.log("Realizado con éxito");
    } else console.log("Ya existen Pokemons en la base de datos");
  } catch (error) {
    console.log(error.message);
  }
});

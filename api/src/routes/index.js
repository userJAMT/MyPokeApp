const { Router } = require('express');
const pokemon = require('./pokemon.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.use('/pokemon', pokemon);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;

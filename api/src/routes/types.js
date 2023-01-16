const { Router } = require("express");
const { getTypes } = require("../controllers/types.js");

const router = Router();

router.get("/", getTypes);

module.exports = router;

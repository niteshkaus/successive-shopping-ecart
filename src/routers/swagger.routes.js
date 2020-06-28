const express = require('express');
//const options = require("../config/swagger");

const swaggerUi = require('swagger-ui-express');

const document = require("./documents/document.json")
const router = express.Router();

router.use("/", swaggerUi.serve, swaggerUi.setup(document));



module.exports = router;
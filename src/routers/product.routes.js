const express = require("express");
const ProductController = require("../controller/product.controller");

const router = express.Router();
/**
 * @swagger
 * /products:
 *   get:
 *    summary: get all products
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: query
 *        name: category
 *        type: string
 *        description: Category ID
 *    responses:
 *       200:
 *         description: Success
 */
router.get("/", ProductController.get);

module.exports = router;

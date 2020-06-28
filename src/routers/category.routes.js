const express = require('express');
const CategoryController =  require('../controller/category.controller');

const router = express.Router();
/**
 * @swagger
 * /categories:
 *   get:
 *    summary: get all categories
 *    consumes:
 *      - application/json
 *    responses:
 *       200:
 *         description: Success
 */
router.get('/', CategoryController.get);


module.exports = router;
const express = require('express');
const SessionController =  require('../controller/session.controller');

const router = express.Router();
/**
 * @swagger
 * /login:
 *   post:
 *    summary: User login with email adddress and password
 *    security:
 *      - basicAuth: []
 *    consumes:
 *      - application/json
 *    responses:
 *       200:
 *         description: Success
 */
router.post('/', SessionController.login);


module.exports = router;
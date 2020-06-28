const express = require('express');
const CartController =  require('../controller/cart.controller');
const { check } = require('express-validator');

const router = express.Router();

router.post('/', [ 
    check('product').isString(),
    check('quantity').optional({ checkFalsy:true }).isInt().toInt(),
 ], CartController.create);
 
router.get('/', CartController.get);
module.exports = router;
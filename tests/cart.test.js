/* eslint-disable no-undef */
const assert = require('assert');
const dotenv = require('dotenv');
dotenv.config();
const Category = require('../src/model/category.model');
const Product = require('../src/model/product.model');
const User = require('../src/model/user.model');
const Cart = require('../src/model/cart.model');
const helper = require('../src/helpers/helper');
const db = require('../src/config/database');
const cartHelper = require('../src/helpers/cart.helper');

describe('Cart', function() {

    let category = {
        name: "Shirts",
        type: "Fashion"
    };

    let product = {
        name: "Shirt",
        description: "This is a fashion clothing product for boys",
        price: 899.59,
        make: 2020
    }

    let user = {
        email_address: 'nitesh@gmail.com',
        password: 'admin',
        name: 'Nitesh Kaushik',
    }

    let productId;
    let userId;
    // Prepare the category and products in the databse
    before(function(done) {
        db().then(async () => {
            // cleanup the previous record
            await Category.deleteMany({});
            await Product.deleteMany({});
            await Cart.deleteMany({});
            
            // save a category
            let savedCategory = await Category.create(category);

            // save product
            let savedProduct = await Product.create({...product, category: savedCategory._id});
            productId = savedProduct._id;

            // save user
            await User.deleteMany({});
            const password = helper.generateHash(user.password);
            const savedUser = await User.create({...user, password: password});
            userId = savedUser._id;
            done();
        });
    });

    it('Add Item to cart', async function(){ 
        const result = await cartHelper.addTocart(userId, productId);
        assert(result && result.n === 1 && result.ok === 1);
    });

    it('Get user cart items', async function(){ 
        const result = await Cart.find({user_id: userId});
        assert(result || false);
    });

    after(async function() {
        await Cart.deleteMany({});
    });

});
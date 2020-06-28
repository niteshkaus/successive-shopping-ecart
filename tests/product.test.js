const assert = require('assert');
const dotenv = require('dotenv');
dotenv.config();
const Product = require('../src/model/product.model');
const Category = require('../src/model/category.model');
const db = require('../src/config/database');

describe('Product', function() {

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

    let categoryId;
    let productId;
    // Prepare the category and products in the databse
    before(function(done) {
        db().then(async () => {
            await Category.deleteMany({});
            await Product.deleteMany({});
            let savedCategory = await Category.create(category);
            categoryId = savedCategory._id;
            let savedProduct = await Product.create({...product, category: savedCategory._id});
            productId = savedProduct._id;
            done();
        });
    });

    it('Get All Products', function() {
        Product.find({}).then((result) => {
            assert(result.length === 1);
        });
    })

    it('Get Single Product', function() {
        Product.find({_id: productId}).then((result) => {
            assert(result || false);
        });
    });

    it('Get Products of a Category', function() {
        Product.find({category: categoryId}).then((result) => {
            assert(result && result.length > 0 ? true : false);
        });
    });

    after(async function(){
        await Promise.all([Product.deleteMany({}), Category.deleteMany({})]);
    });

});
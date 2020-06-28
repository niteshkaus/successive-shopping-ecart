const assert = require("assert");
const dotenv = require("dotenv");
dotenv.config();
const Category = require("../src/model/category.model");
const Product = require("../src/model/product.model");
const db = require("../src/config/database");
let mongoose = require("mongoose");

describe("Categories", function(done) {
  let category = {
    name: "Shirts",
    type: "Fashion"
  };

  let product = {
    name: "Shirt",
    description: "This is a fashion clothing product for boys",
    price: 899.59,
    make: 2020
  };

  let categoryId;
  // Prepare the category and products in the databse
  before(function(done) {
    db().then(async () => {
      await Category.deleteMany({});
      await Product.deleteMany({});
      let saved = await Category.create(category);
      categoryId = saved._id;
      await Product.create({ ...product, category: saved._id });
      done();
    });
  });

  it("Get All Category", function(done) {
    Category.find({}).then(result => {
      assert(result.length === 1);
      done();
    });
  });

  it("Get Category with valid id", function(done) {
    Category.findOne({ _id: categoryId }).then(result => {
      assert(result && result._id.toString() === categoryId.toString());
      done();
    });
  });

  it("Get Category with invalid id", function() {
    let randomId = mongoose.Types.ObjectId();
    Category.findOne({ _id: randomId }).then(result => {
      assert(!result);
    });
  });

  after(async function() {
    await Promise.all([Product.deleteMany({}), Category.deleteMany({})]);
  });
});

const Product = require("../model/product.model");
const ObjectId = require("mongoose").Types.ObjectId;

/**
 * Return list of products and list of products on the category id basis
 *
 * @param {*} req
 * @param {*} res
 */
const get = async (req, res) => {
  const { category } = req.query;
  if (category && !ObjectId.isValid(category)) {
    return res
      .status(400)
      .send({ status: "failure", errors: "The category id is invalid" });
  }

  const query = {};
  if (category && category.length) query.category = category;
  const result = await Product.find(query).populate("category");
  res.status(200).send({ status: "success", data: result });
};

module.exports = {
  get
};

const Category = require("../model/category.model");

/**
 * Return list of categories
 *
 * @param {*} req
 * @param {*} res
 */
const get = async (req, res) => {
  const result = await Category.find({});

  return res.status(200).send({ status: "success", data: result });
};

module.exports = {
  get
};

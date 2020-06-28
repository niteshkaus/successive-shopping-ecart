const productRoutes = require("./product.routes");
const categoryRoutes = require("./category.routes");
const cartRoutes = require("./cart.routes");
const sessionRoutes = require("./session.routes");
const swaggerRoutes = require("./swagger.routes");
const auth = require("../middlewares/auth");

const swaggerUi = require('swagger-ui-express');
const options = require("../config/swagger");

const swaggerJsdoc = require('swagger-jsdoc');

module.exports = app => {
  // app.use("/", () => {
  //   console.log('hello');
  // })
  app.use("/api/v1/categories", categoryRoutes);
  app.use("/api/v1/products", productRoutes);
  app.use("/api/v1/cart", auth, cartRoutes);
  app.use("/api/v1/login", sessionRoutes);

  app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));
  app.use('/api/v1/documentation', swaggerRoutes);

};

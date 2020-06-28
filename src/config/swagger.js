const swaggerJsdoc = require('swagger-jsdoc');
const dotenv = require("dotenv");
dotenv.config();
const options = {
    swaggerDefinition: {
      info: {
        title: 'Successive Shopping Cart',
        version: '1.0.0',
        description: 'All v1 routes documentation',
      },
      host: `${process.env.BASE_URL}`,
      basePath: '/api/v1/', 
      security: [
        {
          "basicAuth": []
        }
      ]
    },
    // List of files to be processes. You can also set globs './routes/*.js'
    apis: ['./src/routers/*.js'],
  };
  module.exports = options;

  
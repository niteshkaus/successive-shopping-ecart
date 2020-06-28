const express = require("express");
/* eslint-disable no-undef */
const dotenv = require('dotenv');
dotenv.config();
const routes =  require('./routers');
const database = require("./config/database");
const middlewares = require('./middlewares');


process.on("uncaughtException", e => {
  console.log(e);
  process.exit(1);
});

process.on("unhandledRejection", e => {
  console.log(e);
  process.exit(1);
});
let app = new express();
middlewares(app);
routes(app);

database()
  .then(async () => {
    console.log("db conected!!");
    /**
     * start server
     */

    // eslint-disable-next-line no-unused-vars
    let port = process.env.PORT || 5000;
    const server = await app.listen(port, err => {
      if (err) {
        console.log("Failed to start server", err.message);
        // eslint-disable-next-line no-undef
        process.exit(0);
      }

      console.log(`Server is running on port ${port}!`);
    });
  })
  .catch(error => {
    console.log("Failed to connect mongo server", error.message);
  });

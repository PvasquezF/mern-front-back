const express = require("express");
const database = require("./config/db");
const router = require("./routes/api/index.routes");
const error = require('./middleware/error.middleware');
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 3000;

const main = () => {
  const app = express();
  app.use(express.json());

  database.initDatabase();
  router.initRoutes(app);
  app.use(error)
  app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
  });
};

main();

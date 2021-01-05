const Sequelize = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const config = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    dialect: "mysql",
  }
);
module.exports = config;

const Sequelize = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const config = new Sequelize(process.env.DATABASE, process.env.USER, {
  dialect: "mysql",
});
module.exports = config;

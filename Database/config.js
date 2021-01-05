const Sequelize = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const config = new Sequelize(process.env.DATABASE, process.env.DATABASE_USER, {
  dialect: "mysql",
});
module.exports = config;

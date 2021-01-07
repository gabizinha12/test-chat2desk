const Sequelize = require("sequelize");
const config = require("../Database/config");

const User = config.define("users", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.String,
    allowNull: false,
  },
  password: {
    type: Sequelize.String,
    allowNull: false,
  },
});

User.sync();

module.exports = User;

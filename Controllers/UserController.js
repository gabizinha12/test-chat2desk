const express = require("express");
const User = require("../Models/User");
const bcrypt = require("bcrypt");

module.exports = {
  async Create(req, res) {
    let { name, email, password } = req.body;
    await User.findOne({ where: { email: email } }).then((user) => {
      if (user === undefined) {
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);

        User.create({
          name: name,
          email: email,
          password: hash,
        });
      }
      res.render("register");
    });
  },

  async Read(req, res) {
    User.findAll().then((users) => {
      res.render("index", { users: users });
    });
  },
  async Login(req, res) {
    let { name, email, password } = req.body;

    User.findOne({ where: { email: email } }).then((user) => {
      if (user != undefined) {
        const correct = bcrypt.compareSync(password, user.password);
        if (correct) {
          req.session.user = {
            id: user.id,
            name: user.name,
            email: user.email,
          };
        }
      }
      res.render("login");
    });
  },
};

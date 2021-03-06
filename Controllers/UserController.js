const express = require("express");
const User = require("../Models/User");
const bcrypt = require("bcrypt");
const passport = require("passport");

module.exports = {
  async Create(req, res) {
    let { name, email, password } = req.body;
    await User.findOne({ where: { email: email } })
      .then((users) => {
        if (users == undefined) {
          let salt = bcrypt.genSaltSync(10);
          let hash = bcrypt.hashSync(password, salt);

          User.create({
            name: name,
            email: email,
            password: hash,
          });
        } else if (
          (req.body.email == undefined && null) ||
          (req.body.password == undefined && null)
        ) {
          req.flash("error_msg", "Usuário inválido!");
        } else {
          User.findOne({ email: req.body.email }).then((user) => {
            const newUser = User.create({
              name: name,
              email: email,
              password: hash,
            });
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) {
                  req.flash("error_msg", "Houve um erro durante o salvamento");
                  res.redirect("/");
                }
                newUser.password = hash;
                newUser
                  .save()
                  .then(() => {
                    req.flash("success_msg", "Usuário criado");
                    res.redirect("/");
                  })
                  .catch((err) => {
                    req.flash("error_msg", "Houve um erro");
                    res.redirect("/user/register");
                  });
              });
            });
          });
        }
        return res.redirect("/");
      })
      .catch((e) => {
        console.error(e);
      });
  },

  async Register(req, res) {
    res.render("register");
  },

  async Read(req, res) {
    await User.findAll().then((users) => {
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
          res.json(req.session.user);
        }
      }
    });
  },
  async SignIn(req, res, next) {
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/user/login",
      failureFlash: true,
    })(req, res, next);
  },
  async load(req, res) {
    res.render("login");
  },
  async LogOut(req, res) {
    req.logout();
    req.flash("success_msg", "Você saiu da sua conta");
    res.redirect("/");
  },
};

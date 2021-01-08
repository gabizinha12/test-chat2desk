const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../Models/User");

module.exports = function (passport) {
  passport.use(
    new localStrategy(
      { usernameField: "email", passwordField: "password" },
      (email, senha, done) => {
        User.findOne({ email: email }).then((usuario) => {
          if (!user) {
            return done(null, false, { message: "Esta conta não existe" });
          }
          bcrypt.compare(senha, user.password, (erro, batem) => {
            if (batem) {
              return done(null, user);
            } else {
              return done(null, false, { message: "Senha incorreta" });
            }
          });
        });
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    Usuario.findByPk(id, (err, user) => {
      done(err, user);
    });
  });
};

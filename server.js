const dotenv = require("dotenv");
dotenv.config({ path: "./env" });
const cookieParser = require("cookie-parser");
const session = require("express-session");
const express = require("express");
const flash = require("connect-flash");
const connectionTest = require("./Database/connectionTest");
const bodyParser = require("body-parser");
const passport = require("passport");
require("./config/Auth")(passport);

const routes = require("./Routes/Routes");

const server = express();
server.use(passport.initialize());
server.use(passport.session());
server.use(flash());
server.set("view engine", "ejs");
server.set("views", "views");
server.use(express.static("public"));
server.use(bodyParser.urlencoded({ extended: false }));
server.use(express.json());
server.use(cookieParser());
server.use(
  session({
    secret: process.env.APP_SECRET || "123",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 3000 },
  })
);

// Middleware
server.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.user = req.user || null;
  next();
});

server.listen(3000 || process.env.PORT, () => {
  console.log("server is listening");
  connectionTest();
});

server.use("/", routes);

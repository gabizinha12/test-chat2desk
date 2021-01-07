const dotenv = require("dotenv");
dotenv.config({ path: "./env" });
const cookieParser = require("cookie-parser");
const session = require("express-session");
const express = require("express");
const flash = require("req-flash");
const connectionTest = require("./Database/connectionTest");
const bodyParser = require("body-parser");
const routes = require("./Routes/Routes");

const server = express();

server.use(cookieParser());
server.use(
  session({
    secret: process.env.APP_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 3000 },
  })
);
server.use(flash());
server.set("view engine", "ejs");
server.set("views", "views");
server.use(express.static("public"));
server.use(bodyParser.urlencoded({ extended: false }));
server.use(express.json());

server.listen(3000 || process.env.PORT, () => {
  console.log("server is listening");
  connectionTest();
});

server.use("/", routes);

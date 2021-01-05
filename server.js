const env = require("dotenv");
env.config();
const express = require("express");
const connectionTest = require("./Database/connectionTest");
const bodyParser = require("body-parser");
const server = express();

server.set("view engine", "ejs");
server.use(express.static("public"));
server.use(bodyParser.urlencoded({ extended: false }));
server.use(express.json());

server.listen(process.env.PORT, () => {
  console.log("server is listening");
  connectionTest();
});

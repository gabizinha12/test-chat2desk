const express = require("express");
const router = express.Router();
const UserController = require("../Controllers/UserController");

router.get("/", UserController.Read);
router.post("/user/create", UserController.Create);
router.post("/user/login", UserController.Login);
router.get("/user/register", UserController.Register);

module.exports = router;

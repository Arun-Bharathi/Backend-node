const express = require("express");

const router = express.Router();

const userController = require("../controllers/userController");

router.post("/create", userController.createUser);

router.delete("/delete", userController.deleteUser);

router.get("/get", userController.getUser);

router.get("/getAll", userController.getAllUsers);

module.exports = router;

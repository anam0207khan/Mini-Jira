const express = require('express');

const userController = require("../controllers/User");
const authMiddleware = require('../middlewares/authMiddleware');

const router = new express.Router();


router.post(`/register`, userController.registerUser);

router.post(`/login`, userController.loginUser);

router.post("/logout", authMiddleware, userController.logoutUser);


module.exports = router;
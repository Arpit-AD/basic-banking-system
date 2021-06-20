const router = require("express").Router();
const path = require('path')
const express = require('express');
const { userSignup, editUser, getUserById, deleteUser, transferMoney } = require("../controller/userController");

router.use(express.static(path.join(__dirname, '/Public')));


router.post("/signup", userSignup);

// router.get("/getuser", getUser);

router.get("/getuserbyid/:id", getUserById);

// router.put("/edituser/:id" , editUser);

router.delete("/deleteuser/:id", deleteUser);

router.post("/transfermoney", transferMoney);
module.exports = router;

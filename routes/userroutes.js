const express = require("express");
const { getlist, userlogin, usersignup, authctrl } = require("../controllers/userctrl");
const usermiddleware = require("../middlewares/usermiddleware");
const router = express.Router();

//test api
router.get('/list', getlist)

//login api
router.post('/login', userlogin)

//signup api
router.post('/signup', usersignup)

//Auth
router.post('/userdata', usermiddleware, authctrl)



module.exports = router
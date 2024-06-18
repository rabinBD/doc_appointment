const express = require("express");
const { getlist, userlogin, usersignup, authctrl, deluser, resetpass } = require("../controllers/userctrl");
const usermiddleware = require("../middlewares/usermiddleware");
const router = express.Router();

//test api
router.get('/list', getlist)

//login api
router.post('/login', userlogin)

//signup api
router.post('/signup', usersignup)

//get auth patient
router.get('/getpatient', usermiddleware, authctrl)

//update or reset password
router.put('/updatepass', usermiddleware, resetpass)

//delete user profile
router.delete('/delpatientprofile/:id', usermiddleware, deluser)


module.exports = router
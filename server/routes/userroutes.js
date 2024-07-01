const express = require("express");

const usermiddleware = require("../middlewares/usermiddleware");
const { userlogin, usersignup, authctrl, logoutuser, deleteUser, getDoctorSchedule } = require("../controllers/userctrl");
const router = express.Router();


//login api
router.post('/login', userlogin)

//signup api
router.post('/signup', usersignup)

//get auth patient // to test 
router.get('/getpatient', usermiddleware, authctrl)

//get doctor's schedule 
router.get('/:id/doctorSchedule', usermiddleware, getDoctorSchedule)

//update or reset password
// router.put('/updatepass', usermiddleware, resetpass)

//logout user
router.post('/logout', usermiddleware, logoutuser)

//delete user profile
router.delete('/delpatientprofile/:id', usermiddleware, deleteUser)


module.exports = router
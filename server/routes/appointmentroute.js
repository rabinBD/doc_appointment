const express = require ("express");
const usermiddleware = require("../middlewares/usermiddleware");
const { doctorResponse, Issueappointment } = require("../controllers/appointmentCtrl");

const router = express.Router()

// Create a new appointment and upload schedule
router.post('/', usermiddleware, Issueappointment)

//doctor approves or reject appointment
router.put('/doctor-approval', doctorResponse)


module.exports = router;
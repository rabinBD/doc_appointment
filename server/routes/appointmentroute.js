const express = require ("express");
const usermiddleware = require("../middlewares/usermiddleware");
const { doctorResponse, appointment } = require("../controllers/appointmentCtrl");

const router = express.Router()

// Create a new appointment and upload schedule
router.post('/', usermiddleware, appointment)

//doctor approves or reject appointment
router.put('/doctor-approval', doctorResponse)


module.exports = router;
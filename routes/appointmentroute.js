const express = require ("express");
const usermiddleware = require("../middlewares/usermiddleware");
const { appointment, doc_res } = require("../controllers/appointmentCtrl");
const router = express.Router()

// Create a new appointment and upload schedule
router.post('/', usermiddleware, appointment)

//doctor approves or reject appointment
router.put('/doctor-approval', doc_res)

//admin approves or reject appointment
// router.put('/admin/status', admin_res)



module.exports = router;
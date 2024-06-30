const express = require('express');
const { loginCtrl, doctorHomeCtrl, patientHomeCtrl, addDoctor, deleteDoctor } = require('../controllers/adminCtrl');
const router = express.Router();

//login route
router.post('/login', loginCtrl)

//doc list
router.get('/home/doclist', doctorHomeCtrl)

//patient list
router.get('/home/userlist', patientHomeCtrl)

//add doctor
router.post('/home/addDoctor', addDoctor)

//delete doctor
router.delete('/home/deleteDoctorprofile/:id', deleteDoctor)

module.exports = router;
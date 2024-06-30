const express = require ('express');
const {schedule, doctorloginCtrl} = require('../controllers/doctorCtrl');
const router = express.Router()

//doctor login 
router.post('/login', doctorloginCtrl)

//doctor manage schedule
router.post('/schedule', schedule)

module.exports = router
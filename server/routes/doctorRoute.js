const express = require ('express');
const {doctorloginCtrl, scheduleManage} = require('../controllers/doctorCtrl');
const router = express.Router()

//doctor login 
router.post('/login', doctorloginCtrl)

//doctor manage schedule
router.post('/schedule', scheduleManage)
router.get('/doctors', scheduleManage)

module.exports = router
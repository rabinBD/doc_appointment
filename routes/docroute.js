const express = require ('express');
const {schedule, drlogCtrl} = require('../controllers/docCtrl');
const router = express.Router()

//doctor login 
router.post('/login', drlogCtrl)

//doctor manage schedule
router.post('/schedule', schedule)

module.exports = router
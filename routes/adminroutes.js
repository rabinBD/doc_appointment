const express = require('express');
const { logCtrl } = require('../controllers/adminctrl');
const router = express.Router();

//login route
router.post('/login', logCtrl)


module.exports = router;
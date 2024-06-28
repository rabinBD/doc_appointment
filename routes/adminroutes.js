const express = require('express');
const { logCtrl, dochomectrl, patienthomectrl, addDoc, delDoc} = require('../controllers/adminCtrl');
const router = express.Router();

//login route
router.post('/login', logCtrl)

//doc list
router.get('/home/doclist', dochomectrl)

//patient list
router.get('/home/userlist', patienthomectrl)

//add doctor
router.post('/home/addDoc', addDoc)

//delete doctor
router.delete('/home/delDoc/:id', delDoc)

module.exports = router;
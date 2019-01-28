const express = require('express');
const router = express.Router();

const authentication = require('../middleware/authentication');
const userSignup = require('./userSignup');
const userLogin = require('./userLogin');
const addTask = require('./addTask');
const removeTask = require('./removeTask');
const updateTask = require('./updateTask');
const listTask = require('./listTask');
const cleanCache = require('../middleware/cleanCache');


router.post('/userSignup',userSignup.userSignup);
router.post('/userLogin',userLogin.userLogin);
router.post('/addTask', authentication, cleanCache, addTask.addTask);
router.post('/removeTask',authentication, cleanCache, removeTask.removeTask);
router.post('/updateTask',authentication, cleanCache, updateTask.updateTask);
router.get('/listTask',authentication,listTask.listTask);
module.exports = router;

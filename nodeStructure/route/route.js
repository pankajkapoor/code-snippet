const express = require('express');
const router = express.Router();

const login = require('../controller/login');

router.get('/login',login.login);


module.exports = router
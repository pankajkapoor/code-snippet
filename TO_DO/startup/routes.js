const express = require('express');
const userRoutes = require('../routes/userRoutes');
const error = require('../middleware/error');


module.exports = function(app){
    app.use(express.json());
    app.use('/user',userRoutes);
    app.use(error);
}
const mongoose = require('mongoose');
const winston = require('winston')

module.exports = function(){
    mongoose.connect('mongodb://localhost/TODO_List')
        .then(()=> winston.info('Connected to MongoDB'))
}
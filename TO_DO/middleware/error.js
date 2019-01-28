const winston = require('winston')
module.exports = function(err,req,res,next){
    
    // Logging the exception

    winston.log('error', err.message,err);
    res.status(500).send('Something failed...');
}
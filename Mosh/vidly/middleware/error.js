const winston = require('winston');

module.exports = function (err,req,res,next){
    // Log the exception

    // winston.log("error", err.message)
    winston.error(err.message, err);
 
 // ------------- Logging level-----------  
    //error
    //warn
    //info
    //verbose
    // debug
    // silly

    res.status(500).send('Something failed');
}
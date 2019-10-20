/**
 *  This error middleware is only for errors that are in express 
 *  that means ERRORS OUTSIDE OF EXPRESS CONTEXT will not be 
 *  handle by this middleware (for example errors during startup)
 */


const winston = require('winston');

module.exports = function (err,req,res,next){
    // Log the exception

    /* either this*/ winston.log('error', err.message,err);
   /* or this  => winston.error(err.message,err);   */

 
 // ------------- Logging level-----------  
    //error
    //warn
    //info
    //verbose
    // debug
    // silly

    res.status(500).send('Something failed');
}
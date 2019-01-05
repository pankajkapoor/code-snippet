
const winston = require('winston')  // working only with 2.4.0 version of winston
require('winston-mongodb');
require('express-async-errors')


module.exports = function(){
    
    // process.on('uncaughtException', (ex)=>{                  // In this way we handle uncaught exception 
    //     winston.error(ex.message, ex);                       // This method works only for synchronous operations 
    //     process.exit(1);                                     // and not for asynchronous operation
    // })

    winston.handleExceptions(                                                  // This method works only for exception
        new winston.transports.Console({colorize: true, prettyPrint: true}),  // but not for unhandled Promises
        new winston.transports.File({filename: 'uncaughtExceptions.log'}))
    
    process.on('unhandledRejection', (ex)=>{
        throw(ex);                                   // for unhandled exception we throw the exception which is 
        // winston.error(ex.message, ex);            // caught by winston.handleExceptions            
        // process.exit(1);                    
    })
    
    winston.add(winston.transports.File, {filename: 'logfile.log' } );
    winston.add(winston.transports.MongoDB,{
        db : 'mongodb://localhost/vidly',
        level: 'error'
         // level: 'info'  as info is the third logging level therefore error, warn, info will be logged into the MongoDB
        })
}
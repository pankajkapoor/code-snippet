
const winston = require('winston')
require('winston-mongodb');
require('express-async-errors')


module.exports = function(){
    
    // process.on('uncaughtException', (ex)=>{                  // In this way we handle uncaught exception 
    //     winston.error(ex.message, ex);                       // This method works only for synchronous operations 
    //     process.exit(1);                                     // and not for asynchronous operation
    // })

    winston.handleExceptions(
        new winston.transports.Console({colorize: true, prettyPrint: true}),
        new winston.transports.File({filename: 'uncaughtExceptions.log'}))
    
    process.on('unhandledRejection', (ex)=>{
        throw(ex);                  
        // winston.error(ex.message, ex);                        
        // process.exit(1);                    
    })
    
    winston.add(winston.transports.File, {filename: 'logfile.log' } );
    winston.add(winston.transports.MongoDB,{
        db : 'mongodb://localhost/vidly',
        level: 'error'
        })
}
const startupDebugger=require('debug')('app:startup'); //this require returns a function & "app:Startup" is an argument to this function
const dbDebugger=require('debug')('app:db');
const express=require('express');
const app=express();
const morgan=require('morgan');
const port=process.env.PORT||3000;

if(app.get('env')== 'development'){
    app.use(morgan('tiny'));
    startupDebugger('Morgan enabled....')
}

// DB operation
dbDebugger("Connected to database")

app.listen(port,()=>{
    console.log(`Listening on port: ${port}`);
}) 


/**
 * set DEBUG=app:startup  // to setup startup debugger
 * set DEBUG=              // to remove any debugger
 * set DEBUG=app:db
 * set DEBUG=app:* (wildcard)
 * DEBUG=app:db nodemon debugger.js 
 */
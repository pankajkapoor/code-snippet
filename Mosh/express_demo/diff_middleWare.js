/**
 * A middleware function is a function which takes the req object and eihter send response to
 * the client or passes control to the next middleware function.
 * 
 * Every route handler is a middleware function
 */
const morgan=require('morgan');
const helmet=require('helmet');
const middleWare=require('./middle_ware')
const express = require('express');
const app = express();
const port=process.env.PORT||3000;

// In-built MiddleWare

app.use(express.json()); /* "express.json()" returns a function which read the 
                            request request and if there is a JSON object it will set req.body*/
app.use(express.urlencoded({extended: true})); // with "extended: true" we can parese complex array and object
app.use(express.static('public')); // for serving static files

// Third Party Middle Ware

app.use(helmet());
app.use(morgan('combined')); // creates logs

//custom middle-ware

app.use(middleWare);   


//---------------------------------------------------------------------------

app.get('/',(req,res)=>{
    res.send('Hello world');
})

app.get('/api/courses',(req,res)=>{
    res.send("[1, 2, 3 ,4 ]");
})

app.listen(port,()=>{
    console.log(`Listening on port: ${port}`);
})
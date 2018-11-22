const express=require('express');
const app=express();
const morgan=require('morgan');
const port=process.env.PORT||5000;


app.listen(port,()=>{
    console.log(`Listening on port: ${port}`);
}) 
// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
// console.log(app.get('env'));  It returns development or production based on environment 

if(app.get('env')== 'development'){
    app.use(morgan('tiny'));
    console.log('Morgan enabled....')
}


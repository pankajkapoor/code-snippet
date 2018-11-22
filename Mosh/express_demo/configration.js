const config=require('config');
const express=require('express');
const app=express();
const port=process.env.PORT||3000;


//Configuration
console.log('Application Name: '+config.get('name'));
console.log('Mail Server: '+config.get('mail.host'));
// console.log('Mail password: '+config.get('mail.password'));


app.listen(port,()=>{
    console.log(`Server Started on ${port}`);
});
const express=require('express');
const app=express();
const mongoose=require('mongoose');
// const config=require('./config/config.json');
const bodyParser=require('body-parser');
const routes=require('./routes/product.js');
const PORT=process.env.port||4000;


mongoose.connect('mongodb://localhost/myproject',(err,data)=>{
    if(err){
        console.log('Databse not connected');
    }else{
        console.log('Database connected');
    }
})

app.listen(PORT,()=>{
    console.log('Server Started on',PORT)
})

app.use('public/images/uploads',express.static('public/images/uploads'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.use('/user',routes)
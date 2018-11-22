const Joi=require('joi') //this require returns a class
const express = require('express');
const app = express();
const port=process.env.PORT||3000;


const courses=[
    { id:1, course:"course1"},
    { id:2, course:"course2"},
    { id:3, course:"course3"}
]

app.use(express.json());

app.post('/api/courses',(req,res)=>{
    const schema={
        name:Joi.string().min(3).required()
    };

    const result=Joi.validate(req.body,schema); //this validate method returns an object
    
    if(result.error){
        res.status(400).send(result.error.details[0].message);

    }
    const course={
        id:courses.length+1,
        name:req.body.name
    };
    courses.push(course);
    res.send(course);
})

app.listen(port,()=>{
    console.log(`Listening on port: ${port}`);
})
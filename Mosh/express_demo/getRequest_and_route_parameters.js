const express = require('express');
const app = express();
const port=process.env.PORT||3000;

const courses=[
    { id:1, course:"course1"},
    { id:2, course:"course2"},
    { id:3, course:"course3"}
]

app.get('/',(req,res)=>{
    res.send('Hello world');
})
app.get('/api',(req,res)=>{  // query string : It is a string in url after '?' 
    res.send(req.query);
})
app/

app.get('/api/courses/:id',(req,res)=>{  
    const course=courses.find(element=> element.id === parseInt(req.params.id));
    if(!course) {
        res.status(404).send('The course with the given ID was not found');
    }else{
        res.send(course);
    }
})


app.get('/api/post/:year/:date',(req,res)=>{  // year & date are route parameters
    res.send(req.params);
})
app.listen(port,()=>{
    console.log(`Listening on port: ${port}`);
})
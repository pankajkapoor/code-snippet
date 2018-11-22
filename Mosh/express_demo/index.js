const middleWare=require('./middle_ware')
const express = require('express');
const app = express();
const port=process.env.PORT||3000;

const courses=[
    { id:1, course:"course1"},
    { id:2, course:"course2"},
    { id:3, course:"course3"}
]


app.use(express.json()); // It parses the body of request and if there is a JSON object it will populate req.body
app.use(express.urlencoded({extended: true}));
app.use(express.static('public')); // for serving static files


app.use(middleWare);   //custom middle-ware


app.get('/',(req,res)=>{
    res.send('Hello world');
})

app.get('/api/courses',(req,res)=>{
    res.send("[1, 2, 3 ,4 ]");
})


app.post('/api/courses',(req,res)=>{
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
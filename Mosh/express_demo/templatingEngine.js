/**
 * Templating Engines are used to send HTML Markup data to client from backend.
 * Various templating engines are PUG, MUSTACHE, EJS.
 * Templating Engine generate Dynamic HTML
 */

const express=require('express');
const app=express();
const port=process.env.PORT||5000;

app.listen(port,()=>{
    console.log(`Listening on port: ${port}`);
}) 

app.set('view engine', 'pug');
app.set('views','./views')

app.get('/',(req,res)=>{
    res.render('index',{title:'My Express App', message: 'Hello'});
});


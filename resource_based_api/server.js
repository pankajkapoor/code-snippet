const express = require('express');
const app = express();
const route = require('./routes');

const getDbConnection = require('./dbs');
let db;

(async function(){
    connectionObj = await getDbConnection();
    app.locals.db = connectionObj.db;
})()
 
app.use(express.json({ extended: true}));
app.use(express.urlencoded({ extended: true }));

app.use('/', route);

app.listen(3000,() =>{
    console.log('server started on 3000')
})
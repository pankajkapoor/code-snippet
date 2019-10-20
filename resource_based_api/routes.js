const express = require('express');
const router = express.Router();


router.post('/user',async (req, res)=>{
    const {name, age} = req.body
    const db = req.app.locals.db;
    await db.collection('students').insertOne({name, age});
    res.send('User created successfully');
});

router.get('/user/:name',async (req, res)=>{
    const name = req.params.name
    const db = req.app.locals.db;
    const result = await db.collection('students').findOne({name});
    res.send(result);
});

module.exports = router;
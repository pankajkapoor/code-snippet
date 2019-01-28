const {taskSchema, validate} = require('../models/taskSchema');
const {userSchema} = require('../models/userSchema');
const _ = require('lodash');

module.exports.addTask = async (req,res)=>{

    const {error} = validate(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    const user_id = await userSchema.findOne({email: req.decodedData.email},{_id: true});

    let task = new taskSchema(_.pick(req.body, ['taskName', 'description']));
    task.creator = user_id;
    await task.save();

    res.send('Task is added successfully...');

}
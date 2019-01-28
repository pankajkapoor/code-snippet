const {userSchema} = require('../models/userSchema');
const {taskSchema} = require('../models/taskSchema');
const Joi = require('joi');

module.exports.removeTask = async(req,res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const user = await userSchema.findOne({email: req.decodedData.email},{_id: true});
    
    const task = await taskSchema.findOne({taskName: req.body.taskName},{_id: false, creator: true});
    
    if(!task) return res.status(400).send('Task Not Found...');

    if(JSON.stringify(task.creator) == JSON.stringify(user._id)){
        const task = await taskSchema.deleteOne({taskName: req.body.taskName})
        return res.send('Task has been removed successfully');
    }else{
        return res.status(400).send('This task does not belongs to you :(');
    }
}

function validate(task){
    const schema = {
        taskName: Joi.string().min(4).max(25).required()
    }
    
    return Joi.validate(task, schema);
}
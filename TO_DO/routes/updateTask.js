const {taskSchema} = require('../models/taskSchema');
const {userSchema} = require('../models/userSchema');
const Joi = require('joi');


module.exports.updateTask = async(req,res)=>{

    const {error} = validate(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    const user = await userSchema.findOne({email: req.decodedData.email},{_id: true});

    const task = await taskSchema.findOne({taskName:req.body.taskName},);

    if(!task)
        return res.status(400).send("Task Not Found....");
    
    if(JSON.stringify(task.creator) == JSON.stringify(user._id)){
        const task = await taskSchema.updateOne({taskName:req.body.taskName},{$set:{description:req.body.description,status:(req.body.status)?req.body.status:0}})
    }else{
        return res.status(400).send("This task does not belongs to you");
    }

    return res.send("Task is updated successfully...");
}

function validate(task){
    
    const schema = {
        taskName: Joi.string().min(4).max(25).required(),
        description: Joi.string().min(0).max(255).required(),
        status: Joi.number()
    }

    return Joi.validate(task,schema);
}
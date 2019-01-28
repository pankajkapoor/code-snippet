const {taskSchema} = require('../models/taskSchema');
const {userSchema} = require('../models/userSchema');
const _ = require('lodash');

module.exports.listTask = async (req,res)=>{

    const user_id = await userSchema.findOne({email: req.decodedData.email},{_id: true});

    const taskList = await taskSchema
                                    .find({creator:user_id},{_id:false, creator: false})
                                    .cache({key: req.decodedData.email})

    if(!taskList){
        return res.status(400).send("You haven't created any task....");
    }

    return res.send(taskList);
}
/**
 *   0- pending
 *   1- completed
 */
const mongoose = require('mongoose');
const Joi = require('joi')
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    
    taskName:{
        type: String,
        required: true,
        unique: true,
        minlength: 4,
        maxlength: 25
    },
    description: {
        type: String,
        required: true,
        minlength: 20,
        maxlength: 255
    },
    status:{
        type:Number,
        default: 0
    },
    creator:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userschema'
    }
})

function validateTask(task){
    
    const schema = {
        taskName: Joi.string().min(4).max(25).required(),
        description: Joi.string().min(20).max(255).required()
    }

    return Joi.validate(task,schema);
}

exports.taskSchema = mongoose.model('taskschema',taskSchema);
exports.validate = validateTask;
const Joi = requrie('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const adminSchema = new Schema({
    name:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 15
    },
    adminId:{
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength:15
    },
    password:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 10
    }
})

function validateAdmin(admin){
    const schema ={
        name: Joi.string().min(5).max(15).required(),
        adminId: Joi.string().min(5).max(15).required(),
        password: Joi.string().min(5).max(10).required()
    }

    return Joi.validate(admin,schema);
}

exports.admin = mongoose.model('adminschema',adminSchema);
exports.validate = validateAdmin;
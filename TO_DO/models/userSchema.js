const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');
// const JoiPassword = require('joi-password-complexity')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

    userName:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 15
    },
    email:{
        type: String,
        required: true,
        unique: true,
        minlength: 10,
        maxlength:255
    },
    password:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    }
})

userSchema.methods.genAuthToken = function(){
    const token = jwt.sign({email: this.email},config.get('jwtPrivateKey'));
    return token;
}


function validateUser(user){

    const schema ={
        userName : Joi.string().min(5).max(15).required(),
        email: Joi.string().min(10).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required()
    } 
    return Joi.validate(user,schema)
}

exports.userSchema = mongoose.model('userschema',userSchema);
exports.validate = validateUser;
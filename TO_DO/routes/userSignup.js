const {userSchema, validate} = require('../models/userSchema');
const _ = require('lodash');
const bcrypt = require('bcrypt');

module.exports.userSignup = async (req, res)=>{
    
    const {error} = validate(req.body);  // validate returns an object with multiple properties, one of which is error

    if(error) return res.status(400).send(error.details[0].message);

    let user = await userSchema.findOne({email: req.body.email});
    if(user) return res.status(400).send('User already exist');

    user = new userSchema(_.pick(req.body, ['userName', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password,salt)
    await user.save();

    const token = user.genAuthToken();

    res.header('x-auth-token', token).json(_.pick(user, ['userName', 'email']));
}
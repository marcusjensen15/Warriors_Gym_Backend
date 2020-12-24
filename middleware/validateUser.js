const Joi = require('joi');

function validateUser(user){

    const userSchema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required()
    });

    return userSchema.validate(user);

};

module.exports = validateUser;
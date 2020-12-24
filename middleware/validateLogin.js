const Joi = require('joi');

function validateLogin(req){

    const userSchema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required()
    });
    return userSchema.validate(req);
};

module.exports = validateLogin;
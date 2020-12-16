const Joi = require('joi');


// validateUser middleware. Will need to incorporate addtional logic to check DB if user exists. Will also be seperated into another file.

function validateUser(user){

    const userSchema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email({ tlds: { allow: false } }).required(),
        password: Joi.string().required()
    });
    
    return userSchema.validate(user);

};

module.exports = validateUser;
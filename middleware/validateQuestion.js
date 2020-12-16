const Joi = require('joi');



// validateQuestion middleware, will be seperated into another file later
// When ID gets incorporated into this, we will write validation middleware for it below. For now, number is an int. In production it will likely be a string.

function validateQuestion(question){

    const questionSchema = Joi.object({
        question: Joi.string().min(10).required(),
        type: Joi.string().required(),
        category: Joi.string().required(),
        possibleAnswers: Joi.array().items(Joi.string()).required(),
        correctAnswer: Joi.string().required()
    });
    
    return questionSchema.validate(question);

};

module.exports = validateQuestion;
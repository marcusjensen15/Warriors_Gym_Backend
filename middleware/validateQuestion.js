const Joi = require('joi');

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
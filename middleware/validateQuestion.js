const Joi = require('joi');

function validateQuestion(question){

    const questionSchema = Joi.object({
        question: Joi.string().min(10).required(),
        category: Joi.string().required(),
        possibleAnswers: Joi.array().items(Joi.string()).required(),
        correctAnswerPosition: Joi.number().required()
    });
    
    return questionSchema.validate(question);
};

module.exports = validateQuestion;
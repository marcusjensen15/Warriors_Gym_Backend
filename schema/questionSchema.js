const mongoose = require('mongoose');
const Joi = require('joi');

const Question = mongoose.model('Question', new mongoose.Schema({

    questionText: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    category:  {
        type: String,
        required: true
    },
    possibleAnswers: {
        type: Array,
        required: true
    },
    correctAnser: {
        type: String
    },
    date: { type: Date, default: Date.now}

//     type: String,
//     category: String,
//     possibleAnswers: [ String ],
//     correctAnswer: String,
//     date: { type: Date, default: Date.now}




}
    ));


// const questionSchema = new mongoose.Schema({
//     questionText: String,
//     type: String,
//     category: String,
//     possibleAnswers: [ String ],
//     correctAnswer: String,
//     date: { type: Date, default: Date.now}
// });

exports.Question = Question;
// exports.validateQuestion = validateQuestion;
// module.exports = questionSchema;

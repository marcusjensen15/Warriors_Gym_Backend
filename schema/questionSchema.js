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
}
    ));

exports.Question = Question;

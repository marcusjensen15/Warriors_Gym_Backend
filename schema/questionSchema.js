const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({

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

});

const Question = mongoose.model('Question', questionSchema);

exports.Question = Question;

const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({

    questionText: {
        type: String,
        required: true
    },
    correctAnswerPosition: {
        type: Number,
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
    date: { type: Date, default: Date.now}
});

const Question = mongoose.model('Question', questionSchema);

exports.Question = Question;

const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    questionText: String,
    type: String,
    category: String,
    possibleAnswers: [ String ],
    correctAnswer: String,
    date: { type: Date, default: Date.now}
});


module.exports = questionSchema;

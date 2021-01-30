const request = require('supertest');
const {User} = require('../../../schema/userSchema');

const executeQuestionsGetRequest = (token) => {
    return request(server)
    .get('/questions')
    .set('x-auth-token', token);
};

const executeQuestionsPostRequest = (payload, token) => {
    return request(server)
    .post('/questions')
    .set('x-auth-token', token)
    .send(payload);
};

const completePayload = {
    question: "A new question",
    type: "Type",
    category: "A category",
    possibleAnswers: ["some good", "options", "here"],
    correctAnswer: "options"
};

const payloadMissingQuestion = {
    type: "Type",
    category: "A category",
    possibleAnswers: ["some good", "options", "here"],
    correctAnswer: "options"
};

const payloadMissingType = {
    question: "A new question",
    category: "A category",
    possibleAnswers: ["some good", "options", "here"],
    correctAnswer: "options"
};

const payloadMissingCategory = {
    question: "A new question",
    type: "Type",
    possibleAnswers: ["some good", "options", "here"],
    correctAnswer: "options"
};

const payloadMissingPossibleAnswers= {
    question: "A new question",
    type: "Type",
    category: "A category",
    correctAnswer: "options"
};

const payloadMissingCorrectAnswer = {
    question: "A new question",
    type: "Type",
    category: "A category",
    possibleAnswers: ["some good", "options", "here"]
};

const payloadPossibleAnswersNotArray = {
    question: "A new question",
    type: "Type",
    category: "A category",
    possibleAnswers: "not an array",
    correctAnswer: "options"
};

const payloadQuestionNotLongEnough = {
    question: "A",
    type: "Type",
    category: "A category",
    possibleAnswers: "not an array",
    correctAnswer: "options"
};


exports.executeQuestionsGetRequest = executeQuestionsGetRequest;
exports.executeQuestionsPostRequest = executeQuestionsPostRequest;
exports.completePayload = completePayload;
exports.payloadMissingType = payloadMissingType;
exports.payloadMissingQuestion = payloadMissingQuestion;
exports.payloadMissingCategory = payloadMissingCategory;
exports.payloadMissingPossibleAnswers = payloadMissingPossibleAnswers;
exports.payloadMissingCorrectAnswer = payloadMissingCorrectAnswer;
exports.payloadPossibleAnswersNotArray = payloadPossibleAnswersNotArray;
exports.payloadQuestionNotLongEnough = payloadQuestionNotLongEnough;
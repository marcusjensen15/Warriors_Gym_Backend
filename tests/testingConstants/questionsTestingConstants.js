const request = require('supertest');

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

const executeQuestionsCategoriesGetRequest = (token,category) => {
    return request(server)
    .get(`/questions/${category}`)
    .set('x-auth-token', token);
};

const executeQuestionsCategoriesIdGetRequest = (token, questionId) => {
    return request(server)
    .get(`/questions/category/${questionId}`)
    .set('x-auth-token', token);
};


const executeQuestionsCategoriesIdPutRequest = (token, questionId, payload) => {
    return request(server)
    .put(`/questions/category/${questionId}`)
    .set('x-auth-token', token)
    .send(payload);
};

const executeQuestionsCategoriesIdDeleteRequest = (token, questionId) => {
    return request(server)
    .delete(`/questions/category/${questionId}`)
    .set('x-auth-token', token);
};

const completePayload = {
    question: "A new question",
    category: "category",
    possibleAnswers: ["some good", "options", "here"],
    correctAnswerPosition: 1
};

const completePayload2 = {
    question: "A second new question",
    category: "category2",
    possibleAnswers: ["some good", "additional", "options", "here"],
    correctAnswerPosition: 0
};

const completePayload3 = {
    question: "A third new question",
    category: "category3",
    possibleAnswers: ["some good", "additional", "options", "here"],
    correctAnswerPosition: 2
};

const payloadMissingQuestion = {
    type: "Type",
    category: "category",
    possibleAnswers: ["some good", "options", "here"],
    correctAnswer: "options"
};

const payloadMissingType = {
    question: "A new question",
    category: "category",
    possibleAnswers: ["some good", "options", "here"],
    correctAnswer: "options"
};

const payloadMissingCategory = {
    question: "A new question",
    type: "Type",
    possibleAnswers: ["some good", "options", "here"],
    correctAnswer: "options"
};

const payloadMissingPossibleAnswers = {
    question: "A new question",
    type: "Type",
    category: "category",
    correctAnswer: "options"
};

const payloadMissingCorrectAnswer = {
    question: "A new question",
    type: "Type",
    category: "category",
    possibleAnswers: ["some good", "options", "here"]
};

const payloadPossibleAnswersNotArray = {
    question: "A new question",
    type: "Type",
    category: "category",
    possibleAnswers: "not an array",
    correctAnswer: "options"
};

const payloadQuestionNotLongEnough = {
    question: "A",
    type: "Type",
    category: "category",
    possibleAnswers: "not an array",
    correctAnswer: "options"
};


exports.executeQuestionsGetRequest = executeQuestionsGetRequest;
exports.executeQuestionsPostRequest = executeQuestionsPostRequest;
exports.executeQuestionsCategoriesGetRequest = executeQuestionsCategoriesGetRequest;
exports.executeQuestionsCategoriesIdGetRequest = executeQuestionsCategoriesIdGetRequest;
exports.executeQuestionsCategoriesIdPutRequest = executeQuestionsCategoriesIdPutRequest;
exports.executeQuestionsCategoriesIdDeleteRequest = executeQuestionsCategoriesIdDeleteRequest;

exports.completePayload = completePayload;
exports.completePayload2 = completePayload2;
exports.completePayload3 = completePayload3;

exports.payloadMissingType = payloadMissingType;
exports.payloadMissingQuestion = payloadMissingQuestion;
exports.payloadMissingCategory = payloadMissingCategory;
exports.payloadMissingPossibleAnswers = payloadMissingPossibleAnswers;
exports.payloadMissingCorrectAnswer = payloadMissingCorrectAnswer;
exports.payloadPossibleAnswersNotArray = payloadPossibleAnswersNotArray;
exports.payloadQuestionNotLongEnough = payloadQuestionNotLongEnough;

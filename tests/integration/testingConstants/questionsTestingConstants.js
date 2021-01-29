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


exports.executeQuestionsGetRequest = executeQuestionsGetRequest;
exports.executeQuestionsPostRequest = executeQuestionsPostRequest;
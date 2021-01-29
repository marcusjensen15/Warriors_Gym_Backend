const request = require('supertest');
const {User} = require('../../../schema/userSchema');

const executeQuestionsGetRequest = (token) => {
    return request(server)
    .get('/questions')
    .set('x-auth-token', token);
};


exports.executeQuestionsGetRequest = executeQuestionsGetRequest;
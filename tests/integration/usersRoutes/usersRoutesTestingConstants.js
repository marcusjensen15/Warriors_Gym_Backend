const request = require('supertest');

const executeUsersGetRequest = (token) => {
        return request(server)
        .get('/users')
        .set('x-auth-token', token);
    };
exports.executeUsersGetRequest = executeUsersGetRequest;




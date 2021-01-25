const request = require('supertest');

const executeUsersGetRequest = (token) => {
        return request(server)
        .get('/users')
        .set('x-auth-token', token);
};

const executeUsersPostRequest = (payload) => {
    return request(server)
    .post('/users')
    .send(payload);
};

const executeUsersMeGetRequest = (token) => {
    return request(server)
    .get('/users/me')
    .set('x-auth-token', token);
};

const executeUsersMePutRequest = (payload, token) => {
    return request(server)
    .put('/users/me')
    .set('x-auth-token', token)
    .send(payload);
};

const executeUsersDeleteRequest = (user, token) => {
    return request(server)
    .delete(`/users/${user._id}`)
    .set('x-auth-token', token);
};

exports.executeUsersGetRequest = executeUsersGetRequest;
exports.executeUsersPostRequest = executeUsersPostRequest;
exports.executeUsersMeGetRequest = executeUsersMeGetRequest;
exports.executeUsersMePutRequest = executeUsersMePutRequest;
exports.executeUsersDeleteRequest = executeUsersDeleteRequest;






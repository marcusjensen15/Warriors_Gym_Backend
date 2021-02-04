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

const completeUserPayload = {email: "test123@test.com", password: "12345", name: "My Test"};
const userPayloadMissingName = {email: "test123@test.com", password: "12345"};
const userPayloadMissingEmail = {password: "12345", name: "My Test"};
const userPayloadMissingPassword = {email: "test123@test.com", name: "My Test"};

const completeLoginPayload = {email:"test@email.com", password: "password"};
const loginPayloadMissingEmail = {password: "password"};
const loginPayloadMissingPassword = {email:"test@email.com"};

exports.executeUsersGetRequest = executeUsersGetRequest;
exports.executeUsersPostRequest = executeUsersPostRequest;
exports.executeUsersMeGetRequest = executeUsersMeGetRequest;
exports.executeUsersMePutRequest = executeUsersMePutRequest;
exports.executeUsersDeleteRequest = executeUsersDeleteRequest;

exports.completeUserPayload = completeUserPayload;
exports.userPayloadMissingEmail = userPayloadMissingEmail;
exports.userPayloadMissingName = userPayloadMissingName;
exports.userPayloadMissingPassword = userPayloadMissingPassword;
exports.completeLoginPayload = completeLoginPayload;
exports.loginPayloadMissingEmail = loginPayloadMissingEmail;
exports.loginPayloadMissingPassword =loginPayloadMissingPassword;







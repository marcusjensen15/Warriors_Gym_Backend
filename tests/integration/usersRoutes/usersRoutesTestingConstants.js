const request = require('supertest');
const {User} = require('../../../schema/userSchema');

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

const beforeEachUserTest = async () => {
    server = require('../../../index');
    await User.collection.insertMany([
       {email: "testUser@email.com", password: "123454"},
       {email: "testAdmin@email.com", password: "123454", isAdmin: true},
       {email: "testManager@email.com", password: "123454", isManager: true}
   ]);
};

// const afterEachUserTest = async () => {
//     server.close();
//     await User.remove({}); 
// };


exports.executeUsersGetRequest = executeUsersGetRequest;
exports.executeUsersPostRequest = executeUsersPostRequest;
exports.executeUsersMeGetRequest = executeUsersMeGetRequest;
exports.executeUsersMePutRequest = executeUsersMePutRequest;
exports.executeUsersDeleteRequest = executeUsersDeleteRequest;
exports.beforeEachUserTest = beforeEachUserTest;
// exports.afterEachUserTest = afterEachUserTest;







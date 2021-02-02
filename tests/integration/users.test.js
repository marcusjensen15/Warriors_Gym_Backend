const request = require('supertest');
const {User} = require('../../schema/userSchema');
const UsersTestingConstants = require('../testingConstants/usersTestingConstants');

describe('All users routes ', () => {

    beforeEach(async() => { 
        server = require('../../index');
        await User.collection.insertMany([
           {email: "testUser@email.com", password: "123454"},
           {email: "testAdmin@email.com", password: "123454", isAdmin: true},
           {email: "testManager@email.com", password: "123454", isManager: true}
       ]);
    });

    afterEach(async () => { 
        server.close();
        await User.remove({});
    });

// All possible outcomes for GET: /users

    describe('GET: /users', () => {
        
        it('Should return status 400 if token is incorrect', async () => {

            token = "xyz";
            const res = await UsersTestingConstants.executeUsersGetRequest(token);
            expect(res.status).toBe(400);
        });

        it('Should return status 401 if token is not provided', async () => {

            token = "";
            const res = await UsersTestingConstants.executeUsersGetRequest(token);
            expect(res.status).toBe(401);
        });

        it('Should return status 403 if token is correct but access is forbidden', async () => {

            const user = await User.findOne({email: 'testUser@email.com'});
            token = user.generateAuthToken();
            const res = await UsersTestingConstants.executeUsersGetRequest(token);
            expect(res.status).toBe(403);
        });

        it('Should return status 200 if token indicates admin user ', async () => {

            const user = await User.findOne({email: 'testAdmin@email.com'});
            token = user.generateAuthToken();
            const res = await UsersTestingConstants.executeUsersGetRequest(token);
            expect(res.status).toBe(200);
        });
    });

// All possible outcomes for POST: /users

    describe('POST: /users - Create a User', () => {
        
        it('Should return status 200 if user credentials are appropriate, and payload is valid', async () => {

            const payload = UsersTestingConstants.completeUserPayload;
            const res = await UsersTestingConstants.executeUsersPostRequest(payload);
            expect(res.status).toBe(200);
        });

        it('Should return status 400 if email is not included in request payload', async () => {

            const payload = UsersTestingConstants.userPayloadMissingEmail;
            const res = await UsersTestingConstants.executeUsersPostRequest(payload);
            expect(res.status).toBe(400);
        });

        it('Should return status 400 if name is not included in request payload', async () => {

            const payload = UsersTestingConstants.userPayloadMissingName;
            const res = await UsersTestingConstants.executeUsersPostRequest(payload);
            expect(res.status).toBe(400);
        });

        it('Should return status 400 if password is not included in request payload', async () => {

            const payload = UsersTestingConstants.userPayloadMissingPassword;
            const res = await UsersTestingConstants.executeUsersPostRequest(payload);
            expect(res.status).toBe(400);
        });
    });

// All possible outcomes for GET: /users/me

    describe('GET: /users/me', () => {
            
        it('Should return status 200 if user credentials match an existing user', async () => {

            const user = await User.findOne({email: 'testAdmin@email.com'});
            token = user.generateAuthToken();
            const res = await UsersTestingConstants.executeUsersMeGetRequest(token);
            expect(res.status).toBe(200);
        });
        
        it('Should return status 400 if token is not valid', async () => {

            token = "xyz";
            const res = await UsersTestingConstants.executeUsersMeGetRequest(token);
            expect(res.status).toBe(400);
        });
        
        it('Should return status 401 if no token is provided', async () => {

            token = "";
            const res = await UsersTestingConstants.executeUsersMeGetRequest(token);
            expect(res.status).toBe(401);
        });
    });

// All possible outcomes for PUT: /users/me

    describe('PUT: /users/me', () => {
    
        it('Should return status 200 if user credentials match an existing user, and payload contains all appropriate fields', async () => {

            const user = await User.findOne({email: 'testAdmin@email.com'});
            const payload = UsersTestingConstants.completeUserPayload;
            token = user.generateAuthToken();
            const res = await UsersTestingConstants.executeUsersMePutRequest(payload, token);
            expect(res.status).toBe(200);
        });
        
        it('Should return status 400 if user credentials match an existing user, but payload does not contain password', async () => {

            const user = await User.findOne({email: 'testAdmin@email.com'});
            const payload = UsersTestingConstants.userPayloadMissingPassword;
            token = user.generateAuthToken();
            const res = await UsersTestingConstants.executeUsersMePutRequest(payload, token);
            expect(res.status).toBe(400);
        });
        
        it('Should return status 400 if user credentials match an existing user, but payload does not contain email', async () => {

            const user = await User.findOne({email: 'testAdmin@email.com'});
            const payload = UsersTestingConstants.userPayloadMissingEmail;
            token = user.generateAuthToken();
            const res = await UsersTestingConstants.executeUsersMePutRequest(payload, token);
            expect(res.status).toBe(400);
        });

        it('Should return status 400 if user credentials match an existing user, but payload does not contain name', async () => {

            const user = await User.findOne({email: 'testAdmin@email.com'});
            const payload = UsersTestingConstants.userPayloadMissingName;
            token = user.generateAuthToken();
            const res = await UsersTestingConstants.executeUsersMePutRequest(payload, token);
            expect(res.status).toBe(400);
        });
        
        it('Should return status 400 if token is not valid', async () => {

            const user = await User.findOne({email: 'testAdmin@email.com'});
            const payload = UsersTestingConstants.completeUserPayload;
            token = "xyz";
            const res = await UsersTestingConstants.executeUsersMePutRequest(payload, token);
            expect(res.status).toBe(400);
        });
            
        it('Should return status 401 if no token is provided', async () => {

            const user = await User.findOne({email: 'testAdmin@email.com'});
            const payload = UsersTestingConstants.completeUserPayload;
            token = "";
            const res = await UsersTestingConstants.executeUsersMePutRequest(payload, token);
            expect(res.status).toBe(401);
        });     
    });

// All possible outcomes for DELETE: users/:id

    describe('DELETE: /users/:id', () => {
        
        it('Should return status 200 if the user attempting to make a delete is an admin, and the admin user was sucessfully found and deleted', async () => {

            const user = await User.findOne({email: 'testAdmin@email.com'});
            token = user.generateAuthToken();
            const res = await UsersTestingConstants.executeUsersDeleteRequest(user, token);
            expect(res.status).toBe(200);
        });

        it('Should return status 403 if user credentials are non admin. Only admin users can delete users', async () => {

            const user = await User.findOne({email: 'testUser@email.com'});
            token = user.generateAuthToken();
            const res = await UsersTestingConstants.executeUsersDeleteRequest(user, token);
            expect(res.status).toBe(403);
         });

        it('Should return status 200 if the admin user is trying to delete another user', async () => {

            const adminUser = await User.findOne({email: 'testAdmin@email.com'});
            const userToDelete = await User.findOne({email: 'testUser@email.com'});
            token = adminUser.generateAuthToken();
            const res = await UsersTestingConstants.executeUsersDeleteRequest(userToDelete, token);
            expect(res.status).toBe(200);
         });

        it('Should return status 401 if the token is not provided', async () => {

            const userToDelete = await User.findOne({email: 'testUser@email.com'});
            token = "";
            const res = await UsersTestingConstants.executeUsersDeleteRequest(userToDelete, token);
            expect(res.status).toBe(401);
        });

        it('Should return status 400 if the token is not valid', async () => {

            const userToDelete = await User.findOne({email: 'testUser@email.com'});
            token = "xyz";
            const res = await UsersTestingConstants.executeUsersDeleteRequest(userToDelete, token);
            expect(res.status).toBe(400);
        });
    }); 
});
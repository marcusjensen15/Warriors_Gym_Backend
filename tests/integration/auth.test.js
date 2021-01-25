const request = require('supertest');
const {User} = require('../../schema/userSchema');
const UsersTestingMethods = require('./usersRoutes/usersRoutesTestingConstants');



// Create object with 3 dummy users: normal user, admin user, manager user. Populate db and tear down after every test run.
// Eventually, see a test database so we don't need to do this anymore.
// Break this out into different files based on route, otherwise this is going to be one huge file. 
// Will need to rename these testing functions. The way they are written now, intelisense is almost useless

describe('auth protected routes', () => {
    let token;
    beforeEach(async () => { 
         server = require('../../index');
         token = new User().generateAuthToken();
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

     describe('GET: /users authentication routes', () => {
        it('should return status 400 if token is incorrect', async () => {
            token = "xyz";
            const res = await UsersTestingMethods.executeUsersGetRequest(token);
            expect(res.status).toBe(400);
        });

        it('should return status 401 if token is not provided', async () => {
            token = "";
            const res = await UsersTestingMethods.executeUsersGetRequest(token);
            expect(res.status).toBe(401);
        });

        it('should return status 403 if token is correct but access is forbidden', async () => {
            const res = await UsersTestingMethods.executeUsersGetRequest(token);
            expect(res.status).toBe(403);
        });

        it('should return status 200 if token indicates admin user ', async () => {
            const user = await User.findOne({email: 'testAdmin@email.com'});
            token = user.generateAuthToken();
            const res = await UsersTestingMethods.executeUsersGetRequest(token);
            expect(res.status).toBe(200);
        });
    });

// All possible outcomes for POST: /users

    describe('POST: /users create a user', () => {
        
        it('should return status 200 if user credentials are appropriate', async () => {
            const payload = {email: "test123@test.com", password: "12345", name: "My Test"};
            const res = await UsersTestingMethods.executeUsersPostRequest(payload);
            expect(res.status).toBe(200);
        });

        it('should return status 400 if email is not included in request payload', async () => {
            const payload = {password: "12345", name: "My Test"};
            const res = await UsersTestingMethods.executeUsersPostRequest(payload);
            expect(res.status).toBe(400);
        });

        it('should return status 400 if name is not included in request payload', async () => {
            const payload = {email: "test123@test.com", password: "12345"};
            const res = await UsersTestingMethods.executeUsersPostRequest(payload);
            expect(res.status).toBe(400);
        });

        it('should return status 400 if password is not included in request payload', async () => {
            const payload = {email: "test123@test.com", name: "My Test"};
            const res = await UsersTestingMethods.executeUsersPostRequest(payload);
            expect(res.status).toBe(400);
        });
    });

// All possible outcomes for GET: /users/me

    describe('GET: /users/me requests', () => {
            
        it('should return status 200 if user credentials match an existing user', async () => {
            const user = await User.findOne({email: 'testAdmin@email.com'});
            token = user.generateAuthToken();
            const res = await UsersTestingMethods.executeUsersMeGetRequest(token);
            expect(res.status).toBe(200);
            });
        
        it('should return status 400 if token is not valid', async () => {
            token = "xyz";
            const res = await UsersTestingMethods.executeUsersMeGetRequest(token);
            expect(res.status).toBe(400);
            });
        
        it('should return status 401 if no token is provided', async () => {
            token = "";
            const res = await UsersTestingMethods.executeUsersMeGetRequest(token);
            expect(res.status).toBe(401);
            });
        });

// All possible outcomes for PUT: /users/me

    describe('PUT: /users/me requests', () => {
    
        it('should return status 200 if user credentials match an existing user, and payload contains all appropriate fields', async () => {
            const user = await User.findOne({email: 'testAdmin@email.com'});
            const payload = {name: "Test Name", email: "test@test.com", password: "12345"}
            token = user.generateAuthToken();
            const res = await UsersTestingMethods.executeUsersMePutRequest(payload, token);
            expect(res.status).toBe(200);
            });
        
        it('should return status 400 if user credentials match an existing user, but payload does not contain password', async () => {
            const user = await User.findOne({email: 'testAdmin@email.com'});
            const payload = {name: "Test Name", email: "test@test.com"}
            token = user.generateAuthToken();
            const res = await UsersTestingMethods.executeUsersMePutRequest(payload, token);
            expect(res.status).toBe(400);
            });
        
        it('should return status 400 if user credentials match an existing user, but payload does not contain email', async () => {
            const user = await User.findOne({email: 'testAdmin@email.com'});
            const payload = {name: "Test Name", password: "12345"}
            token = user.generateAuthToken();
            const res = await UsersTestingMethods.executeUsersMePutRequest(payload, token);
            expect(res.status).toBe(400);
            });

        it('should return status 400 if user credentials match an existing user, but payload does not contain name', async () => {
            const user = await User.findOne({email: 'testAdmin@email.com'});
            const payload = {email: "test@test.com", password: "12345"}
            token = user.generateAuthToken();
            const res = await UsersTestingMethods.executeUsersMePutRequest(payload, token);
            expect(res.status).toBe(400);
            });
        
        it('should return status 400 if token is not valid', async () => {
            const user = await User.findOne({email: 'testAdmin@email.com'});
            const payload = {name: "Test Name", email: "test@test.com", password: "12345"}
            token = "xyz";
            const res = await UsersTestingMethods.executeUsersMePutRequest(payload, token);
            expect(res.status).toBe(400);
            });
            
        it('should return status 401 if no token is provided', async () => {
            const user = await User.findOne({email: 'testAdmin@email.com'});
            const payload = {name: "Test Name", email: "test@test.com", password: "12345"}
            token = "";
            const res = await UsersTestingMethods.executeUsersMePutRequest(payload, token);
            expect(res.status).toBe(401);
            });     

    });


// All possible outcomes for DELETE: users/:id

    describe('DELETE: /users/:id requests', () => {
        
        it('should return status 200 if the user attempting to make a delete is an admin, and the admin user was sucessfully found and deleted', async () => {
            const user = await User.findOne({email: 'testAdmin@email.com'});
            token = user.generateAuthToken();
            const res = await UsersTestingMethods.executeUsersDeleteRequest(user, token);
            expect(res.status).toBe(200);
            });

        it('should return status 403 if user credentials are non admin. Only admin users can delete users', async () => {
            const user = await User.findOne({email: 'testUser@email.com'});
            token = user.generateAuthToken();
            const res = await UsersTestingMethods.executeUsersDeleteRequest(user, token);
            expect(res.status).toBe(403);
            });

        it('should return status 200 if the admin user is trying to delete another user', async () => {
            const adminUser = await User.findOne({email: 'testAdmin@email.com'});
            const userToDelete = await User.findOne({email: 'testUser@email.com'});
            token = adminUser.generateAuthToken();
            const res = await UsersTestingMethods.executeUsersDeleteRequest(userToDelete, token);
            expect(res.status).toBe(200);
            });

        it('should return status 401 if the token is not provided', async () => {
            const adminUser = await User.findOne({email: 'testAdmin@email.com'});
            const userToDelete = await User.findOne({email: 'testUser@email.com'});
            token = "";
            const res = await UsersTestingMethods.executeUsersDeleteRequest(userToDelete, token);
            expect(res.status).toBe(401);
            });

        it('should return status 400 if the token is not valid', async () => {
            const adminUser = await User.findOne({email: 'testAdmin@email.com'});
            const userToDelete = await User.findOne({email: 'testUser@email.com'});
            token = "xyz";
            const res = await UsersTestingMethods.executeUsersDeleteRequest(userToDelete, token);
            expect(res.status).toBe(400);
            });
    
    });

});
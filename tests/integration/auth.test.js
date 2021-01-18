const request = require('supertest');
const {User} = require('../../schema/userSchema');

// Create object with 3 dummy users: normal user, admin user, manager user. Populate db and tear down after every test run.
// Eventually, see a test database so we don't need to do this anymore.
// Break this out into different files based on route, otherwise this is going to be one huge file. 

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
    
    const executeUsersGetRequest = () => {
        return request(server)
        .get('/users')
        .set('x-auth-token', token);
    };

    const executeUsersPostRequest = (payload) => {
        return request(server)
        .post('/users')
        .send(payload);
    };

    const executeUsersMeGetRequest = () => {
        return request(server)
        .get('/users/me')
        .set('x-auth-token', token);
    };

// All possible outcomes for GET: /users

     describe('GET: /users authentication routes', () => {
        it('should return status 400 if token is incorrect', async () => {
            token = "xyz";
            const res = await executeUsersGetRequest();
            expect(res.status).toBe(400);
        });

        it('should return status 401 if token is not provided', async () => {
            token = "";
            const res = await executeUsersGetRequest();
            expect(res.status).toBe(401);
        });

        it('should return status 403 if token is correct but access is forbidden', async () => {
            const res = await executeUsersGetRequest();
            expect(res.status).toBe(403);
        });

        it('should return status 200 if token indicates admin user ', async () => {
            const user = await User.findOne({email: 'testAdmin@email.com'});
            token = user.generateAuthToken();
            const res = await executeUsersGetRequest();
            expect(res.status).toBe(200);
        });
    });

// All possible outcomes for POST: /users

    describe('POST: /users create a user', () => {
        
        it('should return status 200 if user credentials are appropriate', async () => {
            const payload = {email: "test123@test.com", password: "12345", name: "My Test"};
            const res = await executeUsersPostRequest(payload);
            expect(res.status).toBe(200);
        });

        it('should return status 400 if email is not included in request payload', async () => {
            const payload = {password: "12345", name: "My Test"};
            const res = await executeUsersPostRequest(payload);
            expect(res.status).toBe(400);
        });

        it('should return status 400 if name is not included in request payload', async () => {
            const payload = {email: "test123@test.com", password: "12345"};
            const res = await executeUsersPostRequest(payload);
            expect(res.status).toBe(400);
        });

        it('should return status 400 if password is not included in request payload', async () => {
            const payload = {email: "test123@test.com", name: "My Test"};
            const res = await executeUsersPostRequest(payload);
            expect(res.status).toBe(400);
        });
    });

// All possible outcomes for GET: /users/me

    describe('GET: /users/me requests', () => {
            
        it('should return status 200 if user credentials match an existing user', async () => {
            const user = await User.findOne({email: 'testAdmin@email.com'});
            token = user.generateAuthToken();
            const res = await executeUsersMeGetRequest();
            expect(res.status).toBe(200);
            });
        
        it('should return status 400 if token is not valid', async () => {
            token = "xyz";
            const res = await executeUsersMeGetRequest();
            expect(res.status).toBe(400);
            });
        
        it('should return status 401 if no token is provided', async () => {
            token = "";
            const res = await executeUsersMeGetRequest();
            expect(res.status).toBe(401);
            });
        });

});
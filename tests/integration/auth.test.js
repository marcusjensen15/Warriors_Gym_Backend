const request = require('supertest');
const {User} = require('../../schema/userSchema');

// Create object with 3 dummy users: normal user, admin user, manager user. Populate db and tear down after every test run.
// Eventually, see a test database so we don't need to do this anymore.

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
    
    const executeUsersGetRoutes = () => {
        return request(server)
        .get('/users')
        .set('x-auth-token', token);
    };

    const executeUsersPostRoutes = (payload) => {
        return request(server)
        .post('/users')
        .send(payload);
    };

     describe('GET: /users authentication routes', () => {
        it('should return status 400 if token is incorrect', async () => {
            token = "xyz";
            const res = await executeUsersGetRoutes();
            expect(res.status).toBe(400);
        });

        it('should return status 403 if token is correct but access is forbidden', async () => {
            const res = await executeUsersGetRoutes();
            expect(res.status).toBe(403);
        });

        it('should return status 200 if token indicates admin user ', async () => {
            const user = await User.findOne({email: 'testAdmin@email.com'});
            token = user.generateAuthToken();
            const res = await executeUsersGetRoutes();
            expect(res.status).toBe(200);
        });
    });

    describe('POST: /users create a user', () => {
        it('should return status 200 if user credentials are appropriate', async () => {
            const payload = {email: "test123@test.com", password: "12345", name: "My Test"};
            const res = await executeUsersPostRoutes(payload);
            expect(res.status).toBe(200);
        });
    });

});
const request = require('supertest');
const {User} = require('../../schema/userSchema');

describe('auth protected routes', () => {

    beforeEach(() => { server = require('../../index'); });
    afterEach(async () => { 
        server.close();
        await User.remove({}); 
    });
    let token;
    const exec = () => {
        return request(server)
        .post('/users')
        .set('x-auth-token', token)
        .send({email: 'test@email.com', password: '12345'});
    };
    beforeEach(() => { 
        token = new User().generateAuthToken();
    });

     describe('users auth routes', () => {
        it('should return 401 if no token is provided', async () => {
            token = null;
            const res = await exec();
            expect(res.status).toBe(401);
        });
    });
});
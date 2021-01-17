const request = require('supertest');

let server;

describe('All Users Routes', () => {
    beforeEach(() => { server = require('../../index'); });
    afterEach(() => { server.close(); });

    describe('/users', () => {
        it('Should return error code 401 because we are trying to access the route with no token', async () => {
            const res = await request(server).get('/users');
            expect(res.status).toEqual(401);
        });
    });

    describe('/users/me', () => {
        it('GET: Should return error code 401 because we are trying to access the route with no token', async () => {
            const res = await request(server).get('/users/me');
            expect(res.status).toEqual(401);
        });
   
        
        it('PUT: Should return error code 401 because we are trying to access the route with no token', async () => {
            const payload = {email: "test@email.com", password: "123454"}
            const res = await request(server).put('/questions').send(payload);
            expect(res.status).toEqual(401);
        });

    });
    describe('/users/:id', () => {
        it('DELETE: Should return error code 401 because we are trying to access the route with no token', async () => {
            const res = await request(server).delete('/users/1234');
            expect(res.status).toEqual(401);
        });
    });
});


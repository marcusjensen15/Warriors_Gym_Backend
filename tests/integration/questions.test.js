const request = require('supertest');

let server;

describe('/questions', () => {
    beforeEach(() => { server = require('../../index'); });
    afterEach(() => { server.close(); });
    describe('GET /questions', () => {
        it('Should return error code 401 because we are trying to access the route with no token', async () => {
            const res = await request(server).get('/questions');
            expect(res.status).toEqual(401);

        });
    });
});
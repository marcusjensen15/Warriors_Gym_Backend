const request = require('supertest');

let server;

// rite test first for all 401 errors

describe('/questions', () => {
    beforeEach(() => { server = require('../../index'); });
    afterEach(() => { server.close(); });
    describe('GET /questions', () => {
        it('Should return error code 401 because we are trying to access the route with no token', async () => {
            const res = await request(server).get('/questions');
            expect(res.status).toEqual(401);
        });


    });


    describe('GET /questions/:category', () => {
        it('Should return error code 401 because we are trying to access the route with no token', async () => {
            const res = await request(server).get('/questions/category');
            expect(res.status).toEqual(401);
        });
    });


});
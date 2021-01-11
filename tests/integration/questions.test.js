const request = require('supertest');

let server;

describe('/questions', () => {
    beforeEach(() => { server = require('../../index'); });
    afterEach(() => { server.close(); });
    describe('GET /questions', () => {
        it('should return all questions', async () => {
            const res = await request(server).get('/questions');
            expect(res.status).toEqual(200);

        });
    });
});
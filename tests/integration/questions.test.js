const request = require('supertest');

let server;

// Write test first for all 401 errors

describe('Questions Routes', () => {
    beforeEach(() => { server = require('../../index'); });
    afterEach(() => { server.close(); });

    describe('GET /questions', () => {
        it('Should return error code 401 because we are trying to access the route with no token', async () => {
            const res = await request(server).get('/questions');
            expect(res.status).toEqual(401);
        });
        it('Should return error code 401 because we are trying to access the route with no token', async () => {
            const payload = {questionText: "Here is some text", type: "type", category: "category", possibleAnswers: ["some", "possible", "answers"], correctAnswer: "answers"}
            const res = await request(server).post('/questions').send(payload);
            expect(res.status).toEqual(401);
        });


    });
 

    describe('/questions/:category', () => {
        it('Should return error code 401 because we are trying to access the route with no token', async () => {
            const res = await request(server).get('/questions/category');
            expect(res.status).toEqual(401);
        });
    });

    describe('/questions/:category/:id', () => {
        it('GET: Should return error code 401 because we are trying to access the route with no token', async () => {
            const res = await request(server).get('/questions/category/1234');
            expect(res.status).toEqual(401);
        });

        it('DELETE: Should return error code 401 because we are trying to access the route with no token', async () => {
            const res = await request(server).delete('/questions/category/1234');
            expect(res.status).toEqual(401);
        });

        it('POST: Should return error code 401 because we are trying to access the route with no token', async () => {
            const payload = {questionText: "Here is some text", type: "type", category: "category", possibleAnswers: ["some", "possible", "answers"], correctAnswer: "answers"}
            const res = await request(server).put('/questions/category/1234').send(payload);
            expect(res.status).toEqual(401);
        });

    });
});


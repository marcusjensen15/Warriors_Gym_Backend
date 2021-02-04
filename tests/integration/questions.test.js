const request = require('supertest');
const {User} = require('../../schema/userSchema');
const {Question} = require('../../schema/questionSchema');
const QuestionsTestingConstants = require('../testingConstants/questionsTestingConstants');

describe('All Questions Routes', () => {

    beforeEach(async () => {
        server = require('../../index');
        await User.collection.insertMany([
           {email: "testUser@email.com", password: "123454"},
           {email: "testAdmin@email.com", password: "123454", isAdmin: true},
           {email: "testManager@email.com", password: "123454", isManager: true}
       ]);
       await Question.collection.insertMany([
        QuestionsTestingConstants.completePayload, QuestionsTestingConstants.completePayload2
       ]);
    });

    afterEach(async() => {
        server.close();
        await User.remove({});
        await Question.remove({});
     });

// All possible outcomes for GET: /questions

    describe('GET /questions', () => {

        it('Should return error code 401 because we are trying to access the route with no token.', async () => {
            token = "";
            const res = await QuestionsTestingConstants.executeQuestionsGetRequest(token);
            expect(res.status).toEqual(401);
        });

        it('Should return error code 400 if token is incorrect.', async () => {
            token = "xyz";
            const res = await QuestionsTestingConstants.executeQuestionsGetRequest(token);
            expect(res.status).toEqual(400);
        });

        it('Should return code 200 if presented with a valid token.', async () => {
            const user = await User.findOne({email: 'testUser@email.com'});
            token = user.generateAuthToken();
            const res = await QuestionsTestingConstants.executeQuestionsGetRequest(token);
            expect(res.status).toEqual(200);
        });
    });
 
// All possible outcomes for POST: /questions

    describe('POST: /questions', () => {

        it('Should return error code 401 because we are trying to access the route with no token.', async () => {

            token = "";
            payload = QuestionsTestingConstants.completePayload;
            const res = await QuestionsTestingConstants.executeQuestionsPostRequest(payload, token);
            expect(res.status).toEqual(401);
        });

        it('Should return error code 400 because we are trying to access the route with an invalid token.', async () => {

            token = "xyz";
            payload = QuestionsTestingConstants.completePayload;
            const res = await QuestionsTestingConstants.executeQuestionsPostRequest(payload, token);
            expect(res.status).toEqual(400);
        });

        it('Should return error code 403 because we are trying to access the route with non-manager credentials.', async () => {

            const user = await User.findOne({email: 'testUser@email.com'});
            token = user.generateAuthToken();
            payload = QuestionsTestingConstants.completePayload;
            const res = await QuestionsTestingConstants.executeQuestionsPostRequest(payload, token);
            expect(res.status).toEqual(403);
        });

        it('Should return code 200 because we are making the request with manager credentials.', async () => {

            const user = await User.findOne({email: 'testManager@email.com'});
            token = user.generateAuthToken();
            payload = QuestionsTestingConstants.completePayload3;
            const res = await QuestionsTestingConstants.executeQuestionsPostRequest(payload, token);
            expect(res.status).toEqual(200);
        });

        it('Should return code 400 because the payload is missing the question field.', async () => {

            const user = await User.findOne({email: 'testManager@email.com'});
            token = user.generateAuthToken();
            payload = QuestionsTestingConstants.payloadMissingQuestion;
            const res = await QuestionsTestingConstants.executeQuestionsPostRequest(payload, token);
            expect(res.status).toEqual(400);
        });

        it('Should return code 400 because the payload question is not 10 characters.', async () => {

            const user = await User.findOne({email: 'testManager@email.com'});
            token = user.generateAuthToken();
            payload = QuestionsTestingConstants.payloadQuestionNotLongEnough;
            const res = await QuestionsTestingConstants.executeQuestionsPostRequest(payload, token);
            expect(res.status).toEqual(400);
        });

        it('Should return code 400 because the payload is missing the type field.', async () => {

            const user = await User.findOne({email: 'testManager@email.com'});
            token = user.generateAuthToken();
            payload = QuestionsTestingConstants.payloadMissingType;
            const res = await QuestionsTestingConstants.executeQuestionsPostRequest(payload, token);
            expect(res.status).toEqual(400);
        });

        it('Should return code 400 because the payload is missing the category field.', async () => {

            const user = await User.findOne({email: 'testManager@email.com'});
            token = user.generateAuthToken();
            payload = QuestionsTestingConstants.payloadMissingCategory;
            const res = await QuestionsTestingConstants.executeQuestionsPostRequest(payload, token);
            expect(res.status).toEqual(400);
        });

        it('Should return code 400 because the payload is missing the possible answers array.', async () => {

            const user = await User.findOne({email: 'testManager@email.com'});
            token = user.generateAuthToken();
            payload = QuestionsTestingConstants.payloadMissingPossibleAnswers;
            const res = await QuestionsTestingConstants.executeQuestionsPostRequest(payload, token);
            expect(res.status).toEqual(400);
        });

        it('Should return code 400 because the payload is not an array.', async () => {

            const user = await User.findOne({email: 'testManager@email.com'});
            token = user.generateAuthToken();
            payload = QuestionsTestingConstants.payloadPossibleAnswersNotArray;
            const res = await QuestionsTestingConstants.executeQuestionsPostRequest(payload, token);
            expect(res.status).toEqual(400);
        });

        it('Should return code 400 because the payload is missing the correct answer.', async () => {

            const user = await User.findOne({email: 'testManager@email.com'});
            token = user.generateAuthToken();
            payload = QuestionsTestingConstants.payloadMissingCorrectAnswer;
            const res = await QuestionsTestingConstants.executeQuestionsPostRequest(payload, token);
            expect(res.status).toEqual(400);
        });
    });

// All possible outcomes for GET: /questions/:category

    describe('GET: /questions/:category', () => {

        it('Should return error code 200: Valid token.', async () => {

            const questionCategory = await (await Question.findOne(QuestionsTestingConstants.completePayload2)).category;
            const user = await User.findOne({email: 'testManager@email.com'});
            token = user.generateAuthToken();
            const res = await QuestionsTestingConstants.executeQuestionsCategoriesGetRequest(token, questionCategory);
            expect(res.status).toEqual(200);
        });

        it('Should return error code 200: Valid token, There are no questions for this category.', async () => {

            const user = await User.findOne({email: 'testManager@email.com'});
            token = user.generateAuthToken();
            const res = await QuestionsTestingConstants.executeQuestionsCategoriesGetRequest(token, "nonExistantCategory");
            expect(res.text).toEqual("There are no questions for this category");
        });

        it('Should return error code 401: No token.', async () => {

            const questionCategory = await (await Question.findOne(QuestionsTestingConstants.completePayload2)).category;
            token = "";
            const res = await QuestionsTestingConstants.executeQuestionsCategoriesGetRequest(token, questionCategory);
            expect(res.status).toEqual(401);
        });

        it('Should return error code 400: Invalid token.', async () => {

            const questionCategory = await (await Question.findOne(QuestionsTestingConstants.completePayload2)).category;
            token = "xyz";
            const res = await QuestionsTestingConstants.executeQuestionsCategoriesGetRequest(token, questionCategory);
            expect(res.status).toEqual(400);
        });
    });

// All possible outcomes for GET: /questions/:category/:id

    describe('GET: /questions/:category/:id', () => {

        it('Should return error code 200: Valid token.', async () => {

            const questionId = await (await Question.findOne(QuestionsTestingConstants.completePayload2))._id;
            const user = await User.findOne({email: 'testManager@email.com'});
            token = user.generateAuthToken();
            const res = await QuestionsTestingConstants.executeQuestionsCategoriesIdGetRequest(token, questionId);
            expect(res.status).toEqual(200);
        });

        it('Should return error code 200: There is no question with this ID.', async () => {

            const questionId = "fakeId"
            const user = await User.findOne({email: 'testManager@email.com'});
            token = user.generateAuthToken();
            const res = await QuestionsTestingConstants.executeQuestionsCategoriesIdGetRequest(token, questionId);
            expect(res.text).toEqual('There is no question with this ID');
        });

        it('Should return error code 400: Invalid token.', async () => {

            const questionId = await (await Question.findOne(QuestionsTestingConstants.completePayload2))._id;
            token = "xyz";
            const res = await QuestionsTestingConstants.executeQuestionsCategoriesIdGetRequest(token, questionId);
            expect(res.status).toEqual(400);
        });

        it('Should return error code 401: No token.', async () => {

            const questionId = await (await Question.findOne(QuestionsTestingConstants.completePayload2))._id;
            token = "";
            const res = await QuestionsTestingConstants.executeQuestionsCategoriesIdGetRequest(token, questionId);
            expect(res.status).toEqual(401);
        });
    });

// All possible outcomes for PUT: /questions/:category/:id

    describe('GET: /questions/:category/:id', () => {

        it('Should return code 200: Valid token, valid payload.', async () => {

            const questionId = await (await Question.findOne(QuestionsTestingConstants.completePayload2))._id;
            const user = await User.findOne({email: 'testManager@email.com'});
            token = user.generateAuthToken();
            const res = await QuestionsTestingConstants.executeQuestionsCategoriesIdPutRequest(token, questionId, QuestionsTestingConstants.completePayload3 );
            expect(res.status).toEqual(200);
        });

        it('Should return error code 403: Insufficient credentials (token), valid payload.', async () => {

            const questionId = await (await Question.findOne(QuestionsTestingConstants.completePayload2))._id;
            const user = await User.findOne({email: 'testUser@email.com'});
            token = user.generateAuthToken();
            const res = await QuestionsTestingConstants.executeQuestionsCategoriesIdPutRequest(token, questionId, QuestionsTestingConstants.completePayload3 );
            expect(res.status).toEqual(403);
        });

        it('Should return error code 401: No token, valid payload.', async () => {

            const questionId = await (await Question.findOne(QuestionsTestingConstants.completePayload2))._id;
            const user = await User.findOne({email: 'testUser@email.com'});
            token = "";
            const res = await QuestionsTestingConstants.executeQuestionsCategoriesIdPutRequest(token, questionId, QuestionsTestingConstants.completePayload3 );
            expect(res.status).toEqual(401);
        });

        it('Should return error code 400: no token, valid payload.', async () => {

            const questionId = await (await Question.findOne(QuestionsTestingConstants.completePayload2))._id;
            const user = await User.findOne({email: 'testUser@email.com'});
            token = "xyz";
            const res = await QuestionsTestingConstants.executeQuestionsCategoriesIdPutRequest(token, questionId, QuestionsTestingConstants.completePayload3 );
            expect(res.status).toEqual(400);
        });

        it('Should return error code 400: valid token, invalid payload.', async () => {

            const questionId = await (await Question.findOne(QuestionsTestingConstants.completePayload2))._id;
            const user = await User.findOne({email: 'testManager@email.com'});
            token = user.generateAuthToken();
            const res = await QuestionsTestingConstants.executeQuestionsCategoriesIdPutRequest(token, questionId, QuestionsTestingConstants.payloadMissingType );
            expect(res.status).toEqual(400);
        });
    });

// All possible outcomes for DELETE: /questions/:category/:id

    describe('DELETE: /questions/:category/:id', () => {

        it('Should return code 200: Valid token with Manager Credentials, Question to delete exists.', async () => {

            const questionId = await (await Question.findOne(QuestionsTestingConstants.completePayload))._id;
            const user = await User.findOne({email: 'testManager@email.com'});
            token = user.generateAuthToken();
            const res = await QuestionsTestingConstants.executeQuestionsCategoriesIdDeleteRequest(token, questionId);
            expect(res.status).toEqual(200);
        });

        it('Should return code 403: Valid token with Non-Manager Credentials, Question to delete exists.', async () => {

            const questionId = await (await Question.findOne(QuestionsTestingConstants.completePayload))._id;
            const user = await User.findOne({email: 'testUser@email.com'});
            token = user.generateAuthToken();
            const res = await QuestionsTestingConstants.executeQuestionsCategoriesIdDeleteRequest(token, questionId);
            expect(res.status).toEqual(403);
        });

        it('Should return code 400: Invalid token, Question to delete exists.', async () => {

            const questionId = await (await Question.findOne(QuestionsTestingConstants.completePayload))._id;
            token = "xyz";
            const res = await QuestionsTestingConstants.executeQuestionsCategoriesIdDeleteRequest(token, questionId);
            expect(res.status).toEqual(400);
        });

        it('Should return code 401: No token, Question to delete exists.', async () => {

            const questionId = await (await Question.findOne(QuestionsTestingConstants.completePayload))._id;
            token = "";
            const res = await QuestionsTestingConstants.executeQuestionsCategoriesIdDeleteRequest(token, questionId);
            expect(res.status).toEqual(401);
        });
    });
});


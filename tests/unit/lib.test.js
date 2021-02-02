const {User} = require('../../schema/userSchema');
const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');
const validateQuestion = require('../../middleware/validateQuestion');
const validateUser = require('../../middleware/validateUser');
const validateLogin = require('../../middleware/validateLogin');
const QuestionsTestingConstants = require('../testingConstants/questionsTestingConstants');
const UsersTestingConstants = require('../testingConstants/usersTestingConstants');

describe('user.generateAuthToken', () => {

    it('Should return a valid json web token', () => {

        const payload = {_id: new mongoose.Types.ObjectId().toHexString(), isAdmin: true};
        const user = new User(payload);
        const token = user.generateAuthToken();
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        expect(decoded).toMatchObject(payload);
    });
});

describe('validateQuestion', () => {

    it('Should correctly validate type existance within question object', () => {

        const payload = QuestionsTestingConstants.payloadMissingType;
        const validate = validateQuestion(payload);
        expect(validate.error.details[0].message).toEqual("\"type\" is required");
    });

    it('Should correctly validate category existance within question object', () => {

        const payload = QuestionsTestingConstants.payloadMissingCategory;
        const validate = validateQuestion(payload);
        expect(validate.error.details[0].message).toEqual("\"category\" is required");
    });

    it('Should correctly validate correctAnswer existance within question object', () => {

        const payload = QuestionsTestingConstants.payloadMissingCorrectAnswer;
        const validate = validateQuestion(payload);
        expect(validate.error.details[0].message).toEqual("\"correctAnswer\" is required");
    });

    it('Should correctly validate question existance within question object', () => {

        const payload = QuestionsTestingConstants.payloadMissingQuestion;
        const validate = validateQuestion(payload);
        expect(validate.error.details[0].message).toEqual("\"question\" is required");
    });

    it('Should correctly validate if possibleAnswers is an array', () => {

        const payload = QuestionsTestingConstants.payloadPossibleAnswersNotArray;
        const validate = validateQuestion(payload);
        expect(validate.error.details[0].message).toEqual("\"possibleAnswers\" must be an array");
    });

    it('Should correctly validate possibleAnswers existance within question object', () => {

        const payload = QuestionsTestingConstants.payloadMissingPossibleAnswers;
        const validate = validateQuestion(payload);
        expect(validate.error.details[0].message).toEqual("\"possibleAnswers\" is required");
    });

    it('Should return payload object if all information exists', () => {

        const payload = QuestionsTestingConstants.completePayload;
        const validate = validateQuestion(payload);
        expect(validate.value).toEqual(payload);
    });
});

describe('validateUser', () => {

    it('Should correctly validate password existance within user object', () => {
        const payload = UsersTestingConstants.userPayloadMissingPassword;
        const validate = validateUser(payload);
        expect(validate.error.details[0].message).toEqual("\"password\" is required");
    });

    it('Should correctly validate name existance within user object', () => {

        const payload = UsersTestingConstants.userPayloadMissingName;
        const validate = validateUser(payload);
        expect(validate.error.details[0].message).toEqual("\"name\" is required");
    });

    it('Should correctly validate email existance within user object', () => {

        const payload = UsersTestingConstants.userPayloadMissingEmail;
        const validate = validateUser(payload);
        expect(validate.error.details[0].message).toEqual("\"email\" is required");
    });

    it('Should return payload object if all information exists', () => {

        const payload = UsersTestingConstants.completeUserPayload;
        const validate = validateUser(payload);
        expect(validate.value).toEqual(payload);
    });
});

describe('validateLogin', () => {

    it('Should correctly validate password existance existance within login process', () => {

        const payload = UsersTestingConstants.loginPayloadMissingPassword;
        const validate = validateLogin(payload);
        expect(validate.error.details[0].message).toEqual("\"password\" is required");
    });

    it('Should correctly validate password existance existance within login process', () => {

        const payload = UsersTestingConstants.loginPayloadMissingEmail;
        const validate = validateLogin(payload);
        expect(validate.error.details[0].message).toEqual("\"email\" is required");
    });

    it('Should return payload object if all information exists', () => {

        const payload = UsersTestingConstants.completeLoginPayload;
        const validate = validateLogin(payload);
        expect(validate.value).toEqual(payload);
    });
});



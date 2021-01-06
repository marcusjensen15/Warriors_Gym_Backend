const {User} = require('../../schema/userSchema');
const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');
const validateQuestion = require('../../middleware/validateQuestion');
const validateUser = require('../../middleware/validateUser');
const validateLogin = require('../../middleware/validateLogin');



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
    it('Should correctly validate type field within question object', () => {
        const payload = {question: "This is a test question", category: "test1", possibleAnswers: ["here are", "some possible", "answers"], correctAnswer: "answer"};
        const validate = validateQuestion(payload);

        expect(validate.error.details[0].message).toEqual("\"type\" is required");
    });

    it('Should correctly validate category within question object', () => {
        const payload = {question: "This is a test question", type: "type", possibleAnswers: ["here are", "some possible", "answers"], correctAnswer: "answer"};
        const validate = validateQuestion(payload);

        expect(validate.error.details[0].message).toEqual("\"category\" is required");
    });

    it('Should correctly validate correctAnswer within question object', () => {
        const payload = {question: "This is a test question", type: "type", category: "test1", possibleAnswers: ["here are", "some possible", "answers"]};
        const validate = validateQuestion(payload);

        expect(validate.error.details[0].message).toEqual("\"correctAnswer\" is required");
    });

    it('Should correctly validate question within question object', () => {
        const payload = {type: "type", category: "test1", possibleAnswers: ["here are", "some possible", "answers"], correctAnswer: "answer"};
        const validate = validateQuestion(payload);

        expect(validate.error.details[0].message).toEqual("\"question\" is required");
    });

    it('Should correctly validate possibleAnswers array', () => {
        const payload = {question: "this is a question", type: "type", category: "test1", possibleAnswers: "this is not an array", correctAnswer: "answer"};
        const validate = validateQuestion(payload);

        expect(validate.error.details[0].message).toEqual("\"possibleAnswers\" must be an array");
    });

    it('Should correctly validate possibleAnswers existance within question object', () => {
        const payload = {question: "this is a question", type: "type", category: "test1", correctAnswer: "answer"};
        const validate = validateQuestion(payload);

        expect(validate.error.details[0].message).toEqual("\"possibleAnswers\" is required");
    });

    it('Should return payload object if all information exists', () => {
        const payload = {question: "this is a question", type: "type", category: "test1", possibleAnswers: ["here are", "some possible", "answers"], correctAnswer: "answer"};
        const validate = validateQuestion(payload);

        expect(validate.value).toEqual(payload);
    });
    
});

describe('validateUser', () => {
    it('Should correctly validate password existance within user object', () => {
        const payload = {name: "Bob Smith", email:"test@email.com"};
        const validate = validateUser(payload);

        expect(validate.error.details[0].message).toEqual("\"password\" is required");
    });

    it('Should correctly validate name existance within user object', () => {
        const payload = {email:"test@email.com", password: "password"};
        const validate = validateUser(payload);

        expect(validate.error.details[0].message).toEqual("\"name\" is required");
    });

    it('Should correctly validate email existance within user object', () => {
        const payload = {name: "Bob Smith", password: "password"};
        const validate = validateUser(payload);

        expect(validate.error.details[0].message).toEqual("\"email\" is required");
    });

    it('Should return payload object if all information exists', () => {
        const payload = {name: "Bob Smith", email:"test@email.com", password: "password"};
        const validate = validateUser(payload);

        expect(validate.value).toEqual(payload);
    });

});

describe('validateLogin', () => {
    it('Should correctly validate password existance existance within login process', () => {
        const payload = {email:"test@email.com"};
        const validate = validateLogin(payload);

        expect(validate.error.details[0].message).toEqual("\"password\" is required");
    });

    it('Should correctly validate password existance existance within login process', () => {
        const payload = {password: "password"};
        const validate = validateLogin(payload);

        expect(validate.error.details[0].message).toEqual("\"email\" is required");
    });

    it('Should return payload object if all information exists', () => {
        const payload = {email:"test@email.com", password: "password"};
        const validate = validateLogin(payload);

        expect(validate.value).toEqual(payload);
    });

});

// Possible unit tests for Question Schema


// Possible unit tests for User Schema 



//(Unit test things that have no external dependencies).


const {User} = require('../../schema/userSchema');
const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');
const validateQuestion = require('../../middleware/validateQuestion');
const {Question} = require('../../schema/questionSchema');


describe('user.generateAuthToken', () => {
    it('Should return a valid json web token', () => {
        const payload = {_id: new mongoose.Types.ObjectId().toHexString(), isAdmin: true};
        const user = new User(payload);
        const token = user.generateAuthToken();
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));

        expect(decoded).toMatchObject(payload);
    });
});

// Write unit tests for Validate Question

describe('validateQuestion', () => {
    it('Should correctly validate user questions', () => {
        const payload = {question: "This is a test questionaaaaaaaaaaaaaaaa", category: "test1", possibleAnswers: ["here are", "some possible", "answers"], correctAnswer: "answer"};
        // const question = new Question(payload);
        const validate = validateQuestion(payload);

        expect(validate.error.details[0].message).toEqual("\"type\" is required");
    });
});



// Write unit tests for Validate User


// Write unit tests for Validate Login


// Possible unit tests for Question Schema


// Possible unit tests for User Schema 



//(Unit test things that have no external dependencies).


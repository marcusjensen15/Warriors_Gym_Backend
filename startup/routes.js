const express = require('express');

const questions = require('../routes/questions');
const users = require('../routes/users');
const auth = require('../routes/auth');
const error = require('../middleware/error');
const authMiddleware = require('../middleware/auth');


module.exports = function(app) {

//All questions routes:

app.use('/questions', authMiddleware, questions);

//All users routes:

app.use('/users', users);

//All auth routes:

app.use('/auth', auth);

//Catching server errors:

app.use(error);

};